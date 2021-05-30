// External
import { ethers, BigNumberish } from "ethers";
import { CID } from "ipfs-http-client";

import { ContractualNFT__factory } from "../types";

const contractAddress = "0x2726D6DbFf934A0d34291335FA26F30a553a0dDb";

interface AddResult {
  cid: CID;
  size: number;
  path: string;
  mode?: number;
}

export interface Agreement {
  ipfsHash: string;
  counterparties: {
    cptyAddress: string;
    id: BigNumberish;
    approved: boolean;
    denied: boolean;
  };
}

export async function createAgreementContract(
  counterparties: string[],
  library: any,
  ipfsHash: AddResult
) {
  console.log({ library });
  console.log(library.on);
  const signer = library.getSigner();
  const contractualNFTContract = ContractualNFT__factory.connect(
    contractAddress,
    signer
  );
  await contractualNFTContract.defineAgreement(
    counterparties,
    ipfsHash.cid.toBaseEncodedString()
  );
}

export async function getAgreements(address: string, library: any) {
  console.log("WEEE");
  const onChainData = await getOnChainAgreements(address, library);
  console.log({ onChainData });
  const agreements = await getIpfsForAgreements(onChainData);
  console.log({ agreements });
  return agreements;
}

export async function getOnChainAgreements(address: string, library: any) {
  const signer = library.getSigner();
  const contractualNFTContract = ContractualNFT__factory.connect(
    contractAddress,
    signer
  );
  const agreements: any = [];
  // console.log(await contractualNFTContract.getCounter());
  // console.log("reeee");
  const agreementIds = await contractualNFTContract.getAgreementsForAddress(
    address
  );
  console.log(agreementIds);
  await agreementIds.forEach(async (id, index) => {
    const result = contractualNFTContract.getAgreement(
      ethers.BigNumber.from(id)
    );
    agreements.push(result);
  });
  const data = await Promise.all(agreements);
  return data;
}

export async function getIpfsForAgreements(agreements: any[]) {
  console.log({ agreements });
  let tempAgreements: any = [];
  agreements.forEach(({ counterparties, ipfsHash }: any, index) => {
    console.log({ counterparties });
    console.log({ ipfsHash });
    const data = fetch(
      `https://ipfs.infura.io:5001/api/v0/object/data?arg=${ipfsHash}`,
      { method: "POST" }
    ).then((res) => res.text());
    tempAgreements.push({ counterparties, ipfsHash, data: data });
  });
  console.log({ tempAgreements });
  return tempAgreements;
}
