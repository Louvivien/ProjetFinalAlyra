pragma solidity 0.5.11;
pragma experimental ABIEncoderV2;

/// @author Hany Salah
/// @title Contrat type fastCoinMain
contract fastCoinMain {

    /// @notice propriétaire du contrat
    address public owner;

    ///@notice  adresse du contrat côté side chain
    address private sideChainContract;

    /// @notice Variable qui recense chaque dépôt ou retrait d'ether
    struct carac {
        uint256 amount;
        uint256 nonce;
        bytes signature;
    }
    mapping(address => carac) private depositBalance;
    mapping(address => carac) private withdrawBalance;

    ///@notice modifier qui vérifie que le msg.sender = owner
        modifier isOwner() {
            require(msg.sender == owner, "Vous n'avez pas les droits");
            _;
        }

    constructor() public {
        owner = msg.sender;
    }

         /// @notice configure l'adresse des contrats
        function setContractAddress(address sideContract) isOwner() external {
            sideChainContract = sideContract;
        }

        /// @notice déposer de l'ether
        function() external payable {
            depositBalance[msg.sender].amount = msg.value;
            depositBalance[msg.sender].nonce ++;
            depositBalance[msg.sender].signature = "";
        }

        /// @notice voir le montant de son dernier dépôt
        function lastDepositAmount() public view returns (uint256) {
            return depositBalance[msg.sender].amount;
        }

        /// @notice voir le numéro du dernier dépôt
        function lastDepositNonce() public view returns (uint256) {
            return depositBalance[msg.sender].nonce;
        }

        /// @notice voir la signature de son dernier dépôt
        function lastDepositSig() public view returns (bytes memory) {
            return depositBalance[msg.sender].signature;
        }

        /// @notice Générer un message à signer pour un user
        function generateMessage(address user) public view returns (bytes32) {
           return keccak256(abi.encodePacked(user, depositBalance[user].amount, depositBalance[user].nonce, this));
        }

        /// @notice signer un message accessible seulement par le owner
        function sign(bytes calldata signing, address user) isOwner() external {
            require(depositBalance[user].signature.length == 0, "Une signature existe déjà.");
            depositBalance[user].signature = signing;
        }

        /// @notice retirer ses ether
        function transfer(bytes calldata signing, uint256 amount) external payable {
            bytes32 userMsg = keccak256(abi.encodePacked(msg.sender, amount, withdrawBalance[msg.sender].nonce + 1, sideChainContract));
            (uint8 v, bytes32 r, bytes32 s) = splitSignature(signing);
            require(ecrecover(userMsg, v, r, s) == owner, "La signature ne correspond pas");
                withdrawBalance[msg.sender].amount = amount;
                withdrawBalance[msg.sender].nonce ++;
                withdrawBalance[msg.sender].signature = signing;
                msg.sender.transfer(amount);
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

        ///@notice voir le numéro du dernier retrait
        function lastWithdrawNonce() public view returns (uint256) {
            return withdrawBalance[msg.sender].nonce;
        }

        ///@notice ajouter 1 au nonce: permet de s'aligner avec le nonce de la side chain si besoin
        function updateWithdrawNonce() external {
            withdrawBalance[msg.sender].nonce ++;
        }
}