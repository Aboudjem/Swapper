const { expect } = require("chai");

describe("Swapper", function () {

  let swapper;
  let signers;
  let tokenA;
  let tokenB;
  let tokenC;
  let TokenFactory;
  let swapperAddress;

  it("Should return the new Swapper once it's deployed", async function () {
    const Swapper = await ethers.getContractFactory("Swapper");
    TokenFactory = await ethers.getContractFactory("Token");
    swapper = await Swapper.deploy();
    await swapper.deployed();
    swapperAddress = swapper.address;
    signers = await ethers.getSigners();
    expect(ethers.utils.isAddress(swapper.address)).to.be.true;
  });

  it("Should return the address of TokenA", async function () {
    tokenA = new ethers.Contract(await swapper.tokenA(), TokenFactory.interface, signers[0]);
    expect(ethers.utils.isAddress(await swapper.tokenA())).to.be.true;
  });

  it("Should return the address of TokenB", async function () {
    tokenB = new ethers.Contract(await swapper.tokenB(), TokenFactory.interface, signers[0]);
    expect(ethers.utils.isAddress(await swapper.tokenB())).to.be.true;
  });

  it("Should return the address of TokenC", async function () {
    tokenC = new ethers.Contract(await swapper.tokenC(), TokenFactory.interface, signers[0]);
    expect(ethers.utils.isAddress(await swapper.tokenC())).to.be.true;
  });

  it("Should return deployer's balance for TokenA", async function () {
    const balanceUser0 = (await tokenA.balanceOf(signers[0].address)).toString();
    expect(balanceUser0 === '1000000000000000000000000');
  });

  it("Should return deployer's balance for TokenB", async function () {
    const balanceUser0 = (await tokenB.balanceOf(signers[0].address)).toString();
    expect(balanceUser0).to.equal('1000000000000000000000000');
  });

  it("Should return contract's balance for TokenC", async function () {
    const balanceUser0 = (await tokenC.balanceOf(swapper.address)).toString();
    expect(balanceUser0).to.equal('1000000000000000000000000');
  });

  it("Should approve contract to spend 100_000 Token A on behalf of user0", async function () {
    expect((await tokenA.allowance(signers[0].address, swapperAddress)).toString()).to.equal('0');
    await tokenA.approve(swapperAddress, '100000000000000000000000');
    expect((await tokenA.allowance(signers[0].address, swapperAddress)).toString()).to.equal('100000000000000000000000');
  });

  it("Should swap 100_000 Token A to 100_000 Token C", async function () {
    let tokenAbalance = (await tokenA.balanceOf(signers[0].address)).toString();
    expect(tokenAbalance).to.equal('1000000000000000000000000');
    let tokenCbalance = (await tokenC.balanceOf(signers[0].address)).toString();
    expect(tokenCbalance).to.equal('0');

    await swapper.swapAforC('100000000000000000000000');

    tokenAbalance = (await tokenA.balanceOf(signers[0].address)).toString();
    expect(tokenAbalance).to.equal('900000000000000000000000');

    tokenCbalance = (await tokenC.balanceOf(signers[0].address)).toString();
    expect(tokenCbalance).to.equal('100000000000000000000000');

    let contractTokenAbalance = (await tokenA.balanceOf(swapper.address)).toString();
    expect(contractTokenAbalance).to.equal('100000000000000000000000');

    let contractTokenCbalance = (await tokenC.balanceOf(swapper.address)).toString();
    expect(contractTokenCbalance).to.equal('900000000000000000000000');

  });

  it("Should approve contract to spend 100_000 Token B on behalf of user0", async function () {
    expect((await tokenB.allowance(signers[0].address, swapperAddress)).toString()).to.equal('0');
    await tokenB.approve(swapperAddress, '100000000000000000000000');
    expect((await tokenB.allowance(signers[0].address, swapperAddress)).toString()).to.equal('100000000000000000000000');
  });

  it("Should swap 100_000 Token B to 100_000 Token C", async function () {
    let tokenBbalance = (await tokenB.balanceOf(signers[0].address)).toString();
    expect(tokenBbalance).to.equal('1000000000000000000000000');
    let tokenCbalance = (await tokenC.balanceOf(signers[0].address)).toString();
    expect(tokenCbalance).to.equal('100000000000000000000000');

    await swapper.swapBforC('100000000000000000000000');

    tokenBbalance = (await tokenB.balanceOf(signers[0].address)).toString();
    expect(tokenBbalance).to.equal('900000000000000000000000');

    tokenCbalance = (await tokenC.balanceOf(signers[0].address)).toString();
    expect(tokenCbalance).to.equal('200000000000000000000000');

    let contractTokenBbalance = (await tokenB.balanceOf(swapper.address)).toString();
    expect(contractTokenBbalance).to.equal('100000000000000000000000');

    let contractTokenCbalance = (await tokenC.balanceOf(swapper.address)).toString();
    expect(contractTokenCbalance).to.equal('800000000000000000000000');

  });

  it("Should approve and unswap 50_000 Token C to 50_000 Token B", async function () {
    let tokenBbalance = (await tokenB.balanceOf(signers[0].address)).toString();
    expect(tokenBbalance).to.equal('900000000000000000000000');
    let tokenCbalance = (await tokenC.balanceOf(signers[0].address)).toString();
    expect(tokenCbalance).to.equal('200000000000000000000000');

    await tokenC.approve(swapperAddress, '50000000000000000000000');
    await swapper.unswapCforB('50000000000000000000000');

    tokenBbalance = (await tokenB.balanceOf(signers[0].address)).toString();
    expect(tokenBbalance).to.equal('950000000000000000000000');
    tokenCbalance = (await tokenC.balanceOf(signers[0].address)).toString();
    expect(tokenCbalance).to.equal('150000000000000000000000');
  });

  it("Should approve and unswap 50_000 Token C to 50_000 Token A", async function () {
    let tokenAbalance = (await tokenA.balanceOf(signers[0].address)).toString();
    expect(tokenAbalance).to.equal('900000000000000000000000');
    let tokenCbalance = (await tokenC.balanceOf(signers[0].address)).toString();
    expect(tokenCbalance).to.equal('150000000000000000000000');

    await tokenC.approve(swapperAddress, '50000000000000000000000');
    await swapper.unswapCforA('50000000000000000000000');

    tokenAbalance = (await tokenA.balanceOf(signers[0].address)).toString();
    expect(tokenAbalance).to.equal('950000000000000000000000');
    tokenCbalance = (await tokenC.balanceOf(signers[0].address)).toString();
    expect(tokenCbalance).to.equal('100000000000000000000000');
  });

  it("Should approve and swap 50_000 Token A to 50_000 Token C using default swap", async function () {
    let tokenAbalance = (await tokenA.balanceOf(signers[0].address)).toString();
    expect(tokenAbalance).to.equal('950000000000000000000000');
    let tokenCbalance = (await tokenC.balanceOf(signers[0].address)).toString();
    expect(tokenCbalance).to.equal('100000000000000000000000');

    await tokenA.approve(swapperAddress, '50000000000000000000000');
    await swapper.swap(tokenA.address, '50000000000000000000000');

    tokenAbalance = (await tokenA.balanceOf(signers[0].address)).toString();
    expect(tokenAbalance).to.equal('900000000000000000000000');
    tokenCbalance = (await tokenC.balanceOf(signers[0].address)).toString();
    expect(tokenCbalance).to.equal('150000000000000000000000');
  });

  it("Should approve and unswap 50_000 Token C to 50_000 Token A using default unswap", async function () {
    let tokenAbalance = (await tokenA.balanceOf(signers[0].address)).toString();
    expect(tokenAbalance).to.equal('900000000000000000000000');
    let tokenCbalance = (await tokenC.balanceOf(signers[0].address)).toString();
    expect(tokenCbalance).to.equal('150000000000000000000000');

    await tokenC.approve(swapperAddress, '50000000000000000000000');
    await swapper.unswap(tokenA.address, '50000000000000000000000');

    tokenAbalance = (await tokenA.balanceOf(signers[0].address)).toString();
    expect(tokenAbalance).to.equal('950000000000000000000000');
    tokenCbalance = (await tokenC.balanceOf(signers[0].address)).toString();
    expect(tokenCbalance).to.equal('100000000000000000000000');
  });

});
