// External
import ethers from "ethers";

import ContractualNFTJson from "../abi/ContractualNFT.json";

const contractAddress = "0xaB344aAAD279CF5155E51EdBD7abb5ac30212891";

export async function CreateAgreementContract(counterparties: String[]) {
  console.log(counterparties);
  console.log(ContractualNFTJson.abi);

  const provider = new ethers.providers.JsonRpcProvider();
  const contract = new ethers.Contract(
    contractAddress,
    ContractualNFTJson.abi,
    provider
  );
}
