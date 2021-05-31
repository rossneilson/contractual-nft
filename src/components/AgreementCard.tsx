import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { BigNumberish, BigNumber } from "ethers";

import SVG from "./svg";

interface Props {
  readonly isComplete: boolean;
}

const Wrapper = styled(Link)<Props>`
  color: white;
  width: 45%;
  cursor: pointer;
  transition: all 0.3s;
  margin: 2% auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: ${(props) => (props.isComplete ? "green" : "#ffffff57")};
  padding: 2% 0%;
  &:hover {
    color: white;
    text-decoration: none;
    box-shadow: 0px 0px 20px 9px #0000003c;
    transform: translateY(-5px);
  }
  &:focus {
    color: white;
    text-decoration: none;
    box-shadow: 0px 0px 20px 9px #0000003c;
    transform: translateY(-5px);
  }
`;

const StateOfApprovals = styled.section`
  margin: auto;
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

export interface Agreement {
  ipfsHash: string;
  data: any;
  counterparties: [
    {
      cptyAddress: string;
      id: BigNumberish;
      approved: boolean;
      denied: boolean;
    }
  ];
}

export interface CardProps {
  agreement: Agreement;
}

export const AgreementCard = ({ agreement }: CardProps) => {
  const [agreementText, setAgreementText] = useState<string>("");
  const [cptyState, setCpty] = useState<React.ReactNode[]>([]);
  const [complete, setComplete] = useState<boolean>(false);
  const [id, setId] = useState<number>();

  async function getText() {
    const data = await agreement.data;
    setAgreementText(data);
  }

  useEffect(() => {
    getText();
    let cptys: Array<React.ReactNode> = [];
    let completedCount = 0;
    let lowestId = 99999;
    agreement.counterparties.forEach((cpty) => {
      console.log("cpty");
      if (cpty.id < lowestId) {
        lowestId = BigNumber.from(cpty.id).toNumber();
      }
      if (cpty.approved) {
        completedCount++;
      }
      cptys.push(
        <SVG
          icon={
            cpty.approved ? "checkBox" : cpty.denied ? "crossBox" : "neutralBox"
          }
        />
      );
    });
    setCpty(cptys);
    setComplete(completedCount === agreement.counterparties.length);
    setId(--lowestId);
  }, []);
  console.log({ id });

  return (
    <Wrapper to={`/agreement/${id}`} isComplete={complete}>
      <div>{agreementText}</div>
      <StateOfApprovals>{cptyState}</StateOfApprovals>
    </Wrapper>
  );
};

export default AgreementCard;
