# Contrat type fastCoinSide (fastCoinSide.sol)

View Source: [C:/Users/admin/Documents/Alyra/ProjetGit/hany-s/projet/testSmartContract/contracts/sideContract.sol](..\C:\Users\admin\Documents\Alyra\ProjetGit\hany-s\projet\testSmartContract\contracts\sideContract.sol)

**fastCoinSide**

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
address private mainChainContract;
mapping(address => struct fastCoinSide.carac) private depositBalance;
mapping(address => struct fastCoinSide.carac) private withdrawBalance;

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
- [setContractAddress(address mainContrat)](#setcontractaddress)
- [splitSignature(bytes sig)](#splitsignature)
- [transfer(bytes signing, uint256 amount)](#transfer)
- [lastDepositNonce()](#lastdepositnonce)
- [updateDepositNonce()](#updatedepositnonce)
- [()](#)
- [lastWithdrawAmount()](#lastwithdrawamount)
- [lastWithdrawNonce()](#lastwithdrawnonce)
- [generateMessage(address user)](#generatemessage)
- [lastWithdrawSig()](#lastwithdrawsig)
- [sign(bytes signing, address user)](#sign)

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
function setContractAddress(address mainContrat) external nonpayable isOwner 
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| mainContrat | address |  | 

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

### transfer

récupérer ses dépôts

```js
function transfer(bytes signing, uint256 amount) external payable
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| signing | bytes |  | 
| amount | uint256 |  | 

### lastDepositNonce

voir le numéro du dernier dépôt

```js
function lastDepositNonce() public view
returns(uint256)
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|

### updateDepositNonce

ajouter 1 au nonce: permet de s'aligner avec le nonce de la main chain si besoin

```js
function updateDepositNonce() external nonpayable
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|

### 

effectuer un retrait

```js
function () external payable
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|

### lastWithdrawAmount

voir le montant de son dernier retrait

```js
function lastWithdrawAmount() public view
returns(uint256)
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|

### lastWithdrawNonce

voir le numéro du dernier retrait

```js
function lastWithdrawNonce() public view
returns(uint256)
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

### lastWithdrawSig

voir la signature de son dernier retrait

```js
function lastWithdrawSig() public view
returns(bytes)
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|

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

## Contracts

* [fastCoinMain](fastCoinMain.md)
* [fastCoinSide](fastCoinSide.md)
* [Migrations](Migrations.md)
