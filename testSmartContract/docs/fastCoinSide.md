# Contrat type fastCoinSide (fastCoinSide.sol)

**fastCoinSide**

## Structs
### carac

```js
struct carac {
 uint256 amount,
 uint256 nonce
}
```

## Contract Members
**Constants & Variables**

```js
//public members
address public owner;

//private members
address private mainChainContract;
string private secret;
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

- [(string message)](#)
- [setContractAddress(address mainContrat)](#setcontractaddress)
- [transfer(bytes32 message, uint256 amount)](#transfer)
- [lastDepositNonce()](#lastdepositnonce)
- [lastDepositAmount()](#lastdepositamount)
- [updateDepositNonce()](#updatedepositnonce)
- [()](#)
- [lastWithdrawAmount()](#lastwithdrawamount)
- [lastWithdrawNonce()](#lastwithdrawnonce)
- [generateMessage()](#generatemessage)

### 

```js
function (string message) public nonpayable
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| message | string |  | 

### setContractAddress

configure l'adresse des contrats

```js
function setContractAddress(address mainContrat) external nonpayable isOwner 
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| mainContrat | address |  | 

### transfer

récupérer ses dépôts

```js
function transfer(bytes32 message, uint256 amount) external payable
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| message | bytes32 |  | 
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

### lastDepositAmount

voir le montant de son dernier dépôt

```js
function lastDepositAmount() public view
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

Voir le message généré par le retrait

```js
function generateMessage() public view
returns(bytes32)
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|

## Contracts

* [fastCoinMain](fastCoinMain.md)
* [fastCoinSide](fastCoinSide.md)
* [Migrations](Migrations.md)
