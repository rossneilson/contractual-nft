import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useWeb3React } from "@web3-react/core";

import SVG from "./svg";

import {
  approveAgreement,
  disapproveAgreement,
  getSingleAgreement,
} from "../web3";

const Wrapper = styled.section`
  width: 100%;
  margin: auto;
  display: flex;
  flex-direction: row;
`;

const Section = styled.section`
  width: 50%;
  height: 100vh;
  padding: 3%;
  display: flex;
  flex-direction: column;
`;

const CptySection = styled(Section)`
  border-right: white 2px solid;
`;

const IndividualCpty = styled.section`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  margin: 2% auto;
`;

const IconWrapper = styled.section`
  cursor: pointer;
`;

const UploadArea = styled.section`
  width: 70%;
  height: 300px;
  background-color: #ffffffaf;
  color: black;
  margin: 100px auto;
  padding-top: 130px;
`;
const SelectionSection = styled.section`
  margin-left: 50px;
  width: 32px;
`;

export interface Props {
  id: string;
}

export const EditAgreement = ({ id }: Props) => {
  const DenyButton = (
    <IconWrapper
      onClick={async () => {
        await disapproveAgreement(library, parseInt(id));
        window.location.reload();
      }}
    >
      <SVG icon={"bigCrossBox"} />
    </IconWrapper>
  );

  const ApproveButton = (
    <IconWrapper
      onClick={async () => {
        await approveAgreement(library, parseInt(id));
        // TODO Use events to refresh data without reloading page
        window.location.reload();
      }}
    >
      <SVG icon={"bigCheckBox"} />
    </IconWrapper>
  );

  const { account, library } = useWeb3React();
  const [data, setData] = useState<any>();
  const [cptyArray, setCptyArray] = useState<any>();
  const [agreementText, setAgreementText] = useState<string>("");

  async function fetchAgreement() {
    const result = await getSingleAgreement(library, id);
    setData(result[0]);
    const text = await result[0].data;
    setAgreementText(text);
  }

  useEffect(() => {
    fetchAgreement();
  }, []);

  useEffect(() => {
    if (data) {
      let tempArray: any[] = [];
      data.counterparties.map((cpty: any) => {
        tempArray.push(
          <IndividualCpty>
            <p style={{ width: "500px" }}>{cpty.cptyAddress}</p>
            <SVG
              icon={
                cpty.approved
                  ? "bigCheckBox"
                  : cpty.denied
                  ? "bigCrossBox"
                  : "bigNeutralBox"
              }
            />
            <SelectionSection>
              {cpty.cptyAddress === account ? (
                cpty.approved && !cpty.denied ? (
                  <div>{DenyButton}</div>
                ) : !cpty.approved && cpty.denied ? (
                  <div>{ApproveButton}</div>
                ) : (
                  <div>
                    {ApproveButton}
                    {DenyButton}
                  </div>
                )
              ) : null}
            </SelectionSection>
          </IndividualCpty>
        );
      });
      setCptyArray([...tempArray]);
    }
  }, [data]);

  return (
    <div>
      <h2>Agreement #{id}</h2>
      <Wrapper>
        <CptySection>
          <h2>Counterparty Status</h2>
          {cptyArray}
        </CptySection>
        <Section>
          <h2>Agreement Terms</h2>
          <p>{agreementText}</p>
          <UploadArea>Upload area</UploadArea>
        </Section>
      </Wrapper>
    </div>
  );
};

export default EditAgreement;
