# Contrat type fastCoinMain (fastCoinMain.sol)

View Source: [C:/Users/admin/Documents/Alyra/ProjetGit/hany-s/projet/testSmartContract/contracts/mainContract.sol](..\C:\Users\admin\Documents\Alyra\ProjetGit\hany-s\projet\testSmartContract\contracts\mainContract.sol)

**fastCoinMain**

## Structs
### carac

```js
struct carac {
 uint256 amount,
 uint256 nonce,
 bytes signature
}
```

## Contract Members
**Constants & Variables**

```js
//public members
address public owner;

//private members
address private sideChainContract;
mapping(address => struct fastCoinMain.carac) private depositBalance;
mapping(address => struct fastCoinMain.carac) private withdrawBalance;

```

## Modifiers

- [isOwner](#isowner)

### isOwner

modifier qui vérifie que le msg.sender = owner

```js
modifier isOwner() internal
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|

## Functions

- [()](#)
- [setContractAddress(address sideContract)](#setcontractaddress)
- [()](#)
- [lastDepositAmount()](#lastdepositamount)
- [lastDepositNonce()](#lastdepositnonce)
- [lastDepositSig()](#lastdepositsig)
- [generateMessage(address user)](#generatemessage)
- [sign(bytes signing, address user)](#sign)
- [transfer(bytes signing, uint256 amount)](#transfer)
- [splitSignature(bytes sig)](#splitsignature)
- [lastWithdrawNonce()](#lastwithdrawnonce)
- [updateWithdrawNonce()](#updatewithdrawnonce)

### 

```js
function () public nonpayable
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|

### setContractAddress

configure l'adresse des contrats

```js
function setContractAddress(address sideContract) external nonpayable isOwner 
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| sideContract | address |  | 

### 

déposer de l'ether

```js
function () external payable
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|

### lastDepositAmount

voir le montant de son dernier dépôt

```js
function lastDepositAmount() public view
returns(uint256)
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|

### lastDepositNonce

voir le numéro du dernier dépôt

```js
function lastDepositNonce() public view
returns(uint256)
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|

### lastDepositSig

voir la signature de son dernier dépôt

```js
function lastDepositSig() public view
returns(bytes)
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|

### generateMessage

Générer un message à signer pour un user

```js
function generateMessage(address user) public view
returns(bytes32)
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| user | address |  | 

### sign

signer un message accessible seulement par le owner

```js
function sign(bytes signing, address user) external nonpayable isOwner 
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| signing | bytes |  | 
| user | address |  | 

### transfer

retirer ses ether

```js
function transfer(bytes signing, uint256 amount) external payable
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| signing | bytes |  | 
| amount | uint256 |  | 

### splitSignature

décompose la signature pour pouvoir identifier le signataire

```js
function splitSignature(bytes sig) internal pure
returns(v uint8, r bytes32, s bytes32)
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| sig | bytes |  | 

### lastWithdrawNonce

voir le numéro du dernier retrait

```js
function lastWithdrawNonce() public view
returns(uint256)
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|

### updateWithdrawNonce

ajouter 1 au nonce: permet de s'aligner avec le nonce de la side chain si besoin

```js
function updateWithdrawNonce() external nonpayable
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|

## Contracts

* [fastCoinMain](fastCoinMain.md)
* [fastCoinSide](fastCoinSide.md)
* [Migrations](Migrations.md)
