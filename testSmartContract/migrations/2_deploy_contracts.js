const fastCoinMain = artifacts.require("fastCoinMain");
const fastCoinSide = artifacts.require("fastCoinSide");


module.exports = function(deployer) {
  deployer.deploy(fastCoinMain);
  deployer.deploy(fastCoinSide);
};
