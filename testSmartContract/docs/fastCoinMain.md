# Contrat type fastCoinMain (fastCoinMain.sol)

**fastCoinMain**

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
address private sideChainContract;
string private secret;
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

- [(string message)](#)
- [setContractAddress(address sideContract)](#setcontractaddress)
- [()](#)
- [lastDepositAmount()](#lastdepositamount)
- [lastDepositNonce()](#lastdepositnonce)
- [generateMessage()](#generatemessage)
- [transfer(bytes32 message, uint256 amount)](#transfer)
- [lastWithdrawNonce()](#lastwithdrawnonce)
- [lastWithdrawAmount()](#lastwithdrawamount)
- [updateWithdrawNonce()](#updatewithdrawnonce)

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

### generateMessage

Voir le message généré par le dépôt

```js
function generateMessage() public view
returns(bytes32)
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|

### transfer

retirer ses ether

```js
function transfer(bytes32 message, uint256 amount) external payable
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| message | bytes32 |  | 
| amount | uint256 |  | 

### lastWithdrawNonce

voir le numéro du dernier retrait

```js
function lastWithdrawNonce() public view
returns(uint256)
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
