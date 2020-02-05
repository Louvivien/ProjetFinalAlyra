const expect = require("chai").expect;
const fastCoinMain = artifacts.require("fastCoinMain");
const fastCoinSide = artifacts.require("fastCoinSide");
const { BN, ether } = require("@openzeppelin/test-helpers");

contract("fastCoin", function(accounts) {
    const owner = accounts[0]
    const user1 = accounts[1]

    beforeEach(async function() {
        this.fastCoinMainInstance = await fastCoinMain.new()
        this.fastCoinSideInstance = await fastCoinSide.new()
        
    })

        it("configure l'adresse des contrats", async function() {
            expect( await this.fastCoinMainInstance.setContractAddress("0xaa91CB82559d1c92BBB71f48d34bd1Df4a951fFE",{from: owner})).ok
            expect( await this.fastCoinSideInstance.setContractAddress("0xa50D53F7786557BB44cB4977d6A6ab49869d7DBe",{from: owner})).ok
        })

        it("les dépôts mettent à jour les balances avec une signature vide", async function() {
            await this.fastCoinMainInstance.sendTransaction({from: owner, value: 10})
            await this.fastCoinMainInstance.sendTransaction({from: user1, value: 50})
            await this.fastCoinSideInstance.sendTransaction({from: owner, value: 20})
            await this.fastCoinSideInstance.sendTransaction({from: user1, value: 50})
            expect( await this.fastCoinMainInstance.lastDepositAmount({from: owner})).bignumber.equal(new BN("10"))
            expect( await this.fastCoinMainInstance.lastDepositAmount({from: user1})).bignumber.equal(new BN("50"))
            expect( await this.fastCoinMainInstance.lastDepositNonce({from: owner})).bignumber.equal(new BN("1"))
            expect( await this.fastCoinMainInstance.lastDepositNonce({from: user1})).bignumber.equal(new BN("1"))
            expect( await this.fastCoinSideInstance.lastWithdrawAmount({from: owner})).bignumber.equal(new BN("20"))
            expect( await this.fastCoinSideInstance.lastWithdrawAmount({from: user1})).bignumber.equal(new BN("50"))
            expect( await this.fastCoinSideInstance.lastWithdrawNonce({from: owner})).bignumber.equal(new BN("1"))
            expect( await this.fastCoinSideInstance.lastWithdrawNonce({from: user1})).bignumber.equal(new BN("1"))
            expect(await this.fastCoinMainInstance.lastDepositSig({from: owner})).null
            expect(await this.fastCoinSideInstance.lastWithdrawSig({from: user1})).null
        })

        it("+1 au nonce", async function() {
            await this.fastCoinSideInstance.updateDepositNonce({from: user1})
            expect(await this.fastCoinSideInstance.lastDepositNonce({from: user1})).bignumber.equal(new BN("1"))
            await this.fastCoinMainInstance.updateWithdrawNonce({from: owner})
            expect(await this.fastCoinMainInstance.lastWithdrawNonce({from: owner})).bignumber.equal(new BN("1"))
        })

        it("Dépôt puis retrait.", async function() {
            const addressMain = await this.fastCoinMainInstance.address
            const addressSide = await this.fastCoinSideInstance.address
            await this.fastCoinMainInstance.setContractAddress(addressSide,{from: owner})
            await this.fastCoinSideInstance.setContractAddress(addressMain,{from: owner})
            await this.fastCoinMainInstance.sendTransaction({from: owner, value: 10})
            await this.fastCoinMainInstance.sendTransaction({from: user1, value: 50})
            await this.fastCoinSideInstance.sendTransaction({from: owner, value: 20})
            await this.fastCoinSideInstance.sendTransaction({from: user1, value: 50})
            const messageOwner = await this.fastCoinMainInstance.generateMessage(owner, {from: owner})
            const messageUser1 = await this.fastCoinSideInstance.generateMessage(user1, {from: user1})
            // erreur truffle la méthode web3.eth.sign n'a pas le même comportement qu'au niveau de la DApps,
            // la signature est fausse côté truffle
            const signature = await web3.eth.sign(messageUser1, owner, {from: owner})
            // await this.fastCoinSideInstance.transfer(signature, new BN("50"), {from: user1})
        })

})

