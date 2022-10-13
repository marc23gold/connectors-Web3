const { ethers } = require("ethers");

async function connect() {
  if (typeof window.ethereum !== undefined) {
    console.log("Metamask");
    ethereum.request({ method: "eth_requestAccounts" });
  }
}
async function execute() {}

module.exports = {
  connect,
  execute,
};
