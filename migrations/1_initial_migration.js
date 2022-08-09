const FinalFantasy7 = artifacts.require("FinalFantasy7");

module.exports = async (deployer, network, [defaultAccount]) => {
  await deployer.deploy(FinalFantasy7);
  let ff7 = await FinalFantasy7.deployed();
};
