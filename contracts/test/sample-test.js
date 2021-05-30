const { expect } = require("chai");

describe("ContractualNFT", function () {
  let ContractualNFT, contractualNFT, owner, addr1, addr2;
  beforeEach(async function () {
    addresses = [""];
    ContractualNFT = await ethers.getContractFactory("ContractualNFT");
    contractualNFT = await ContractualNFT.deploy();
    await contractualNFT.deployed();
    [owner, addr1, addr2] = await ethers.getSigners();
    contractualNFT.defineAgreement([addr1.address], "firstDeploy");
  });

  it("Should define and store new agreement", async function () {
    await expect(contractualNFT.defineAgreement([addr1.address], "pass"))
      .to.emit(contractualNFT, "CreateNewAgreement")
      .withArgs(3, [addr1.address], "pass");

    const agreement = await contractualNFT.getAgreement(3);
    expect(agreement.ipfsHash).to.equal("pass");
  });

  it("Should approve party vote", async function () {
    await contractualNFT.connect(addr1).approveAgreement(1);

    const agreement = await contractualNFT.getAgreement(1);
    let isApproved;
    let isDenied;
    agreement.counterparties.forEach((cpty) => {
      if (cpty.cptyAddress == addr1.address) {
        isApproved = cpty.approved;
        isDenied = cpty.denied;
      }
    });
    expect(isApproved).to.equal(true);
    expect(isDenied).to.equal(false);
  });

  it("Should deny party vote", async function () {
    await contractualNFT.connect(addr1).disapproveAgreement(1);

    const agreement = await contractualNFT.getAgreement(1);
    let isApproved;
    let isDenied;
    agreement.counterparties.forEach((cpty) => {
      if (cpty.cptyAddress == addr1.address) {
        isApproved = cpty.approved;
        isDenied = cpty.denied;
      }
    });
    expect(isApproved).to.equal(false);
    expect(isDenied).to.equal(true);
  });

  it("Should complete if all approved", async function () {
    await contractualNFT.connect(addr1).approveAgreement(1);
    await expect(contractualNFT.completeAgreement(1))
      .to.emit(contractualNFT, "CompleteAndMint")
      .withArgs(1, addr1.address, 2);
  });

  it("Should fail if not all approved", async function () {
    await contractualNFT.connect(addr1).disapproveAgreement(1);
    await expect(contractualNFT.completeAgreement(1)).to.be.revertedWith(
      "Agreement not complete."
    );
  });

  it("Should get agreements for address", async function () {
    const agreements = await contractualNFT.getAgreementsForAddress(
      addr1.address
    );
    expect(agreements.length).to.equal(1);
    expect(agreements[0]).to.equal(ethers.BigNumber.from("1"));
  });
});
