// External
import { ethers, BigNumberish, BigNumber } from "ethers";
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
  const agreementIds = await contractualNFTContract.getAgreementsForAddress(
    address
  );
  console.log({ agreementIds });
  agreementIds.forEach((id: BigNumber) => {
    console.log(id.toNumber());
  });
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
  let tempAgreements: any = [];
  agreements.forEach(({ counterparties, ipfsHash }: any, index) => {
    const data = fetch(
      `https://ipfs.infura.io:5001/api/v0/object/data?arg=${ipfsHash}`,
      { method: "POST" }
    ).then((res) => res.text());
    tempAgreements.push({ counterparties, ipfsHash, data: data });
  });
  return tempAgreements;
}

export async function getSingleAgreement(library: any, id: string) {
  const signer = library.getSigner();
  const contractualNFTContract = ContractualNFT__factory.connect(
    contractAddress,
    signer
  );
  const result = await contractualNFTContract.getAgreement(
    ethers.BigNumber.from(id)
  );
  console.log({ result });
  return getIpfsForAgreements([result]);
}

export async function approveAgreement(library: any, id: number) {
  const signer = library.getSigner();
  const contractualNFTContract = ContractualNFT__factory.connect(
    contractAddress,
    signer
  );
  await contractualNFTContract.approveAgreement(id);
}

export async function disapproveAgreement(library: any, id: number) {
  const signer = library.getSigner();
  const contractualNFTContract = ContractualNFT__factory.connect(
    contractAddress,
    signer
  );
  await contractualNFTContract.disapproveAgreement(id);
}
