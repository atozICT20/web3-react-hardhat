const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Token", function () {
  let contract;
  let owner;

  before(async () => {
    const Token = await ethers.getContractFactory("Token");
    const token = await Token.deploy();
    contract = await token.deployed();
    owner = await contract.owner.call();
  });
  it("Should pass if contract is deployed", async function () {
    expect(await contract.name.call()).to.equal("Test Kovan Token");
  });
  it("Should return initial token wei balance of 1000000", async function () {
    expect(await contract.balanceOf(owner)).to.equal(1000000);
  });
});
