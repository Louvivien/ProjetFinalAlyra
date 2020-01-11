const fastCoinMain = artifacts.require("fastCoinMain");
const fastCoinSide = artifacts.require("fastCoinSide");


module.exports = function(deployer) {
  deployer.deploy(fastCoinMain, "message secret");
  deployer.deploy(fastCoinSide, "message secret");
};
