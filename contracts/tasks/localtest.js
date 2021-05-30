const fs = require("fs");

task("testTask", "Sends ETH and tokens to an address")
  .addParam("account", "The account's address")
  .setAction(async (taskArgs) => {
    const address = taskArgs.address;

    if ((await ethers.provider.getCode(address)) === "0x") {
      console.error("You need to deploy your contract first");
      return;
    }

    const token = await ethers.getContractAt("Token", address);
    const [sender] = await ethers.getSigners();

    const tx = await token.defineAgreement(
      ["0x2a8ED447A04E8476746d12BC84B79dDCf34Aa892"],
      "hash"
    );
    await tx.wait();

    console.log(`Testing ${address}`);
  });
