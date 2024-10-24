const Proxy = artifacts.require("TransparentUpgradeableProxy");
const ProxyAdmin = artifacts.require("ProxyAdmin");
const PresaleV1 = artifacts.require("PresaleV1");



module.exports = async function (deployer, network, accounts) {
  const logic = await PresaleV1.deployed();;
  const admin = await ProxyAdmin.deployed();;
  const data = "0x"; // TODO ethers ecode
  const args = [logic.address, admin.address, data];
  //await deployer.deploy(Proxy, ...args);
};