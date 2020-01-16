const expect = require("chai").expect;
const fastCoinMain = artifacts.require("fastCoinMain");
const fastCoinSide = artifacts.require("fastCoinSide");
const { BN, ether } = require("@openzeppelin/test-helpers");

contract("fastCoin", function(accounts) {
    const owner = accounts[0]
    const user1 = accounts[1]
    const user2 = accounts[2]


    beforeEach(async function() {
        this.fastCoinMainInstance = await fastCoinMain.new("message secret")
        this.fastCoinSideInstance = await fastCoinSide.new("message secret")
        
    })

        it("configure l'adresse des contrats", async function() {
            expect( await this.fastCoinMainInstance.setContractAddress("0xaa91CB82559d1c92BBB71f48d34bd1Df4a951fFE",{from: owner})).ok
            expect( await this.fastCoinSideInstance.setContractAddress("0xa50D53F7786557BB44cB4977d6A6ab49869d7DBe",{from: owner})).ok
        })

        it("les dépôts mettent à jour les balances", async function() {
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
        })

        it("Les dépôts permettent les retraits et mettent à jour les balances", async function() {
            const addressMain = await this.fastCoinMainInstance.address
            const addressSide = await this.fastCoinSideInstance.address
            await this.fastCoinMainInstance.setContractAddress(addressSide,{from: owner})
            await this.fastCoinSideInstance.setContractAddress(addressMain,{from: owner})
            await this.fastCoinMainInstance.sendTransaction({from: owner, value: 10})
            await this.fastCoinMainInstance.sendTransaction({from: user1, value: 50})
            await this.fastCoinSideInstance.sendTransaction({from: owner, value: 20})
            await this.fastCoinSideInstance.sendTransaction({from: user1, value: 50})
            const messageOwner = await this.fastCoinMainInstance.generateMessage({from: owner})
            const messageuser1 = await this.fastCoinSideInstance.generateMessage({from: user1})
            expect(await this.fastCoinSideInstance.transfer(messageOwner, 10, {from: owner})).ok
            expect(await this.fastCoinMainInstance.transfer(messageuser1, 50, {from: user1})).ok
            expect(await this.fastCoinMainInstance.lastWithdrawNonce({from: user1})).bignumber.equal(new BN("1"))
            expect(await this.fastCoinMainInstance.lastWithdrawAmount({from: user1})).bignumber.equal(new BN("50"))
            expect(await this.fastCoinSideInstance.lastWithdrawNonce({from: owner})).bignumber.equal(new BN("1"))
            expect(await this.fastCoinSideInstance.lastWithdrawAmount({from: owner})).bignumber.equal(new BN("20"))
        })

        it("+1 au nonce", async function() {
            await this.fastCoinSideInstance.updateDepositNonce({from: user1})
            expect(await this.fastCoinSideInstance.lastDepositNonce({from: user1})).bignumber.equal(new BN("1"))
            await this.fastCoinMainInstance.updateWithdrawNonce({from: owner})
            expect(await this.fastCoinMainInstance.lastWithdrawNonce({from: owner})).bignumber.equal(new BN("1"))
        })
})

