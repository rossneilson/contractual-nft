// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "hardhat/console.sol";

contract ContractualNFT is ERC721 {
  uint counter;

  struct Counterparty {
    address cptyAddress;
    uint id;
    bool approved;
    bool denied;
  }

  struct Agreement {
    string ipfsHash;
    Counterparty[] counterparties;
  }

  mapping(uint256 => Agreement) agreementIdToAgreement;
  mapping(address => uint[]) addressToAgreements;

  event CreateNewAgreement(uint agreementId, address[] addresses, string ipfsHash);
  event CompleteAndMint(uint agreementId, address to, uint tokenId);

  constructor() ERC721("ContractualNFT", "CONT") {
    counter = 1;
  }

  function defineAgreement(address[] memory counterpartyAddresses, string memory ipfsHash) public returns (uint id) {
    uint agreementId = counter;
    counter++;
    Agreement storage newAgreement = agreementIdToAgreement[agreementId];
        newAgreement.ipfsHash = ipfsHash;
    for (uint i = 0; i < counterpartyAddresses.length; i++) {
      addressToAgreements[counterpartyAddresses[i]].push(agreementId);
      newAgreement.counterparties.push(Counterparty(counterpartyAddresses[i], counter, false, false));
      counter++;
    }
    emit CreateNewAgreement(agreementId, counterpartyAddresses, ipfsHash);
    return agreementId;
  }

  function approveAgreement(uint256 agreementId) public {
    Counterparty[] storage counterparties = agreementIdToAgreement[agreementId].counterparties;
    for (uint i = 0; i < agreementIdToAgreement[agreementId].counterparties.length; i++) {
      if(counterparties[i].cptyAddress == msg.sender) {
        counterparties[i].approved = true;
        counterparties[i].denied = false;
      }
    }
  }

  function disapproveAgreement(uint256 agreementId) public {
    Counterparty[] storage counterparties = agreementIdToAgreement[agreementId].counterparties;
    for (uint i = 0; i < agreementIdToAgreement[agreementId].counterparties.length; i++) {
      if(counterparties[i].cptyAddress == msg.sender) {
        counterparties[i].approved = false;
        counterparties[i].denied = true;
      }
    }
  }

  function checkIfComplete(Agreement memory agreement) public pure returns(bool isComplete) {
    uint numApproved;
    for (uint i = 0; i < agreement.counterparties.length; i++) {
      if(agreement.counterparties[i].approved == true) {
        numApproved++;
      }
    }
    if(numApproved == agreement.counterparties.length) {
      return true;
    } else {
      return false;
    }
  }

  function completeAgreement(uint256 agreementId) public {
    Agreement storage agreement = agreementIdToAgreement[agreementId];
    require(checkIfComplete(agreement), "Agreement not complete.");
    for (uint i = 0; i < agreement.counterparties.length; i++) {
      _safeMint(agreement.counterparties[i].cptyAddress, agreement.counterparties[i].id);
      emit CompleteAndMint(agreementId, agreement.counterparties[i].cptyAddress, agreement.counterparties[i].id);
    }
  }

  function getAgreement(uint256 agreementId) public view returns(Agreement memory agreement) {
    return agreementIdToAgreement[agreementId];
  }

  // function getAgreementsForAddress(address addr) public view returns(Agreement[] memory agreements) {
  //   return addressToAgreements[addr];
  // }

  function getCounter() public view returns(uint number) {
    return counter;
  }

}
