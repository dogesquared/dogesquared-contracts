const PresaleV1 = artifacts.require("PresaleV1");



module.exports = async function (deployer, network, accounts) {
  await deployer.deploy(PresaleV1);
};