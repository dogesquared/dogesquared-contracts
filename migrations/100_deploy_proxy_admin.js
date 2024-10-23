const ProxyAdmin = artifacts.require("ProxyAdmin");



module.exports = async function (deployer) {
  await deployer.deploy(ProxyAdmin);
};
