pragma solidity 0.5.11;
pragma experimental ABIEncoderV2;

/// @author Hany Salah
/// @title Contrat type fastCoinSide
contract fastCoinSide {

/// @notice propriétaire du contrat
address public owner;

///@notice  adresse du contrat côté main chain
    address private mainChainContract;  

/// @notice Variable qui recense chaque dépôt ou retrait d'ether
    struct carac {
        uint256 amount;
        uint256 nonce;
        bytes signature;
    }
    mapping(address => carac) private depositBalance;
    mapping(address => carac) private withdrawBalance;

constructor() public {

    owner = msg.sender;

    }

///@notice modifier qui vérifie que le msg.sender = owner
        modifier isOwner() {
            require(msg.sender == owner, "Vous n'avez pas les droits");
            _;
        }

         /// @notice configure l'adresse des contrats
        function setContractAddress(address mainContrat) isOwner() external {
            mainChainContract = mainContrat;
        }

        /// @notice décompose la signature pour pouvoir identifier le signataire
        function splitSignature(bytes memory sig) internal pure returns (uint8 v, bytes32 r, bytes32 s) {
        require(sig.length == 65);
        assembly {
            // premiers 32 octets, après le préfixe
            r := mload(add(sig, 32))
            // 32 octets suivants
            s := mload(add(sig, 64))
            // Octet final (premier du prochain lot de 32)
            v := byte(0, mload(add(sig, 96)))
        }

        return (v, r, s);
    }

        /// @notice récupérer ses dépôts
        function transfer(bytes calldata signing, uint256 amount) external payable {
            bytes32 userMsg = keccak256(abi.encodePacked(msg.sender, amount, depositBalance[msg.sender].nonce + 1, mainChainContract));
            (uint8 v, bytes32 r, bytes32 s) = splitSignature(signing);
            bytes memory prefix = "\x19Ethereum Signed Message:\n32";
            bytes32 prefixedHash = keccak256(abi.encodePacked(prefix, userMsg));
            require(ecrecover(prefixedHash, v, r, s) == owner, "La signature ne correspond pas");
            depositBalance[msg.sender].amount = amount;
            depositBalance[msg.sender].nonce ++;
            depositBalance[msg.sender].signature = signing;
            msg.sender.transfer(amount);
        }

        /// @notice voir le numéro du dernier dépôt
        function lastDepositNonce() public view returns (uint256) {
            return depositBalance[msg.sender].nonce;
        }

        ///@notice ajouter 1 au nonce: permet de s'aligner avec le nonce de la main chain si besoin
        function updateDepositNonce() external {
            depositBalance[msg.sender].nonce ++;
        }

        /// @notice effectuer un retrait
        function() external payable {
            withdrawBalance[msg.sender].amount = msg.value;
            withdrawBalance[msg.sender].nonce ++;
            withdrawBalance[msg.sender].signature = "";
        }

        /// @notice voir le montant de son dernier retrait
        function lastWithdrawAmount() public view returns (uint256) {
            return withdrawBalance[msg.sender].amount;
        }

        ///@notice voir le numéro du dernier retrait
        function lastWithdrawNonce() public view returns (uint256) {
            return withdrawBalance[msg.sender].nonce;
        }

        /// @notice Générer un message à signer pour un user
        function generateMessage(address user) public view returns (bytes32) {
           return keccak256(abi.encodePacked(user, withdrawBalance[user].amount, withdrawBalance[user].nonce, this));
        }

        /// @notice voir la signature de son dernier retrait
        function lastWithdrawSig() public view returns (bytes memory) {
            return withdrawBalance[msg.sender].signature;
        }

        /// @notice signer un message accessible seulement par le owner
        function sign(bytes calldata signing, address user) isOwner() external {
            require(withdrawBalance[user].signature.length == 0, "Une signature existe déjà.");
            withdrawBalance[user].signature = signing;
        }

}