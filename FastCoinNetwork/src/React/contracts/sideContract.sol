pragma solidity 0.5.11;
pragma experimental ABIEncoderV2;

/// @author Hany Salah
/// @title Contrat type fastCoinSide
contract fastCoinSide {

/// @notice propriétaire du contrat
address public owner;

///@notice  adresse du contrat côté main chain
    address private mainChainContract;

/// @notice secret qui sera utilisé dans les messages à signer
    string private secret;    

/// @notice Variable qui recense chaque dépôt ou retrait d'ether
    struct carac {
        uint256 amount;
        uint256 nonce;
    }
    mapping(address => carac) private depositBalance;
    mapping(address => carac) private withdrawBalance;

constructor(string memory message) public {

    owner = msg.sender;
    secret = message;

    }

///@notice modifier qui vérifie que le msg.sender = owner
        modifier isOwner() {
            require(msg.sender == owner, "Vous n'avez pas les droits");
            _;
        }

         /// @notice configure l'adresse des contrats
        function setContractAddress(address mainContrat) external isOwner() {
            mainChainContract = mainContrat;
        }

        /// @notice récupérer ses dépôts
        function transfer(bytes32 message, uint256 amount) external payable {
            bytes32 userMsg = keccak256(abi.encodePacked(msg.sender, amount, depositBalance[msg.sender].nonce + 1, mainChainContract, secret));
            require(userMsg == message, "Votre message n'est pas correct.");
                depositBalance[msg.sender].amount = amount;
                depositBalance[msg.sender].nonce ++;
                msg.sender.transfer(amount);
        }

        /// @notice voir le numéro du dernier dépôt
        function lastDepositNonce() public view returns (uint256) {
            return depositBalance[msg.sender].nonce;
        }

        /// @notice voir le montant de son dernier dépôt
        function lastDepositAmount() public view returns (uint256) {
            return depositBalance[msg.sender].amount;
        }

        ///@notice ajouter 1 au nonce: permet de s'aligner avec le nonce de la main chain si besoin
        function updateDepositNonce() external {
            depositBalance[msg.sender].nonce ++;
        }

        /// @notice effectuer un retrait
        function() external payable {
            withdrawBalance[msg.sender].amount = msg.value;
            withdrawBalance[msg.sender].nonce ++;
        }

        /// @notice voir le montant de son dernier retrait
        function lastWithdrawAmount() public view returns (uint256) {
            return withdrawBalance[msg.sender].amount;
        }

        ///@notice voir le numéro du dernier retrait
        function lastWithdrawNonce() public view returns (uint256) {
            return withdrawBalance[msg.sender].nonce;
        }

        /// @notice Voir le message généré par le retrait
        function generateMessage() public view returns (bytes32) {
           return keccak256(abi.encodePacked(msg.sender, withdrawBalance[msg.sender].amount, withdrawBalance[msg.sender].nonce, this, secret));
        }
}