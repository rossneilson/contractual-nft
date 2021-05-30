import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { BigNumberish } from "ethers";

import SVG from "./svg";

interface Props {
  readonly isComplete: boolean;
}

const Wrapper = styled.section<Props>`
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
    box-shadow: 0px 0px 20px 9px #0000003c;
    transform: translateY(-5px);
  }
  &:focus {
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

  async function getText() {
    const data = await agreement.data;
    setAgreementText(data);
  }

  useEffect(() => {
    getText();
    let cptys: Array<React.ReactNode> = [];
    let completedCount = 0;
    agreement.counterparties.forEach((cpty) => {
      console.log("cpty");
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
  }, []);

  return (
    <Wrapper isComplete={complete}>
      <div>{agreementText}</div>
      <StateOfApprovals>{cptyState}</StateOfApprovals>
    </Wrapper>
  );
};

export default AgreementCard;
