import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useWeb3React } from "@web3-react/core";
import { BigNumberish } from "ethers";
import { getAgreements } from "../web3";

import AgreementCard from "./AgreementCard";
import SVG from "./svg";

export interface Agreement {
  ipfsHash: string;
  data: string;
  counterparties: [
    {
      cptyAddress: string;
      id: BigNumberish;
      approved: boolean;
      denied: boolean;
    }
  ];
}

const Wrapper = styled.section`
  width: 75%;
  margin: 3% auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const CardDisplay = styled.section`
  width: 100%;
  margin: auto;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-around;
`;

const RefreshWrapper = styled.section`
  cursor: pointer;
  width: 50px;
  margin: auto;
`;

export const UserAgreements = () => {
  const { account, library } = useWeb3React();
  const [data, setData] = useState<any>();
  const [array, setArray] = useState<any[]>([]);

  async function fetchAgreements() {
    if (account) {
      setData(await getAgreements(account, library));
    }
  }

  useEffect(() => {
    fetchAgreements();
  }, []);

  useEffect(() => {
    if (data && data[0]) {
      let tempArray: any[] = [];
      data.map((agreementObject: Agreement) => {
        tempArray.push(<AgreementCard agreement={agreementObject} />);
      });
      setArray([...tempArray]);
    }
  }, [data]);

  return (
    <Wrapper>
      <h2>Existing Agreements</h2>
      <RefreshWrapper onClick={async () => await fetchAgreements()}>
        <SVG icon={"refresh"} />
      </RefreshWrapper>
      <CardDisplay>{array}</CardDisplay>
    </Wrapper>
  );
};

export default UserAgreements;
