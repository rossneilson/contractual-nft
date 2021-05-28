import React, { useState, ChangeEvent } from "react";
import styled from "styled-components";
import { useWeb3React } from "@web3-react/core";

import SVG from "./svg";

import { CreateAgreementContract } from "../web3";

const Wrapper = styled.section`
  width: 75%;
  margin: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const AddressInputGroup = styled.section`
  width: 50%;
  margin: 5px auto;
  display: flex;
`;
const Index = styled.section`
  width: 5%;
  margin: auto;
`;

const AddCptyButton = styled.section`
  cursor: pointer;
  width: 50px;
  margin: 2% auto;
`;

const TextArea = styled.textarea`
  width: 50%;
  margin: auto;
`;

const Submit = styled.button`
  display: flex;
  justify-content: center;
  margin: 2% auto;
  border: white solid 2px;
  color: white !important;
  border-radius: 2px;
  width: 200px;
`;

export const CreateAgreement = () => {
  const { account } = useWeb3React();
  const [cptys, setCptys] = useState<string[]>([""]);
  const [agreementText, setAgreementText] = useState<string>("");
  const addressInputs: Array<React.ReactNode> = [];

  const validate = () => {
    if (cptys.filter((el) => el != "").length > 1 && agreementText !== "") {
      return true;
    } else {
      return false;
    }
  };

  console.log({ account, cptys });
  if (account && !(cptys.length > 1)) {
    setCptys([account, ""]);
  }

  if (cptys) {
    cptys.map((cpty, index) => {
      addressInputs.push(
        <AddressInputGroup>
          <Index>{index}</Index>
          <input
            type="text"
            className="form-control"
            id="CounterpartyAddress"
            placeholder="Address of counterparty in agreement (0x...)"
            value={cpty}
            disabled={index === 0 ? true : false}
            onChange={(event: ChangeEvent<HTMLInputElement>) => {
              const tempCpty = [...cptys];
              tempCpty[index] = event.target.value;
              setCptys([...tempCpty]);
            }}
          />
        </AddressInputGroup>
      );
    });
  }

  return (
    <Wrapper>
      <label>Counterparty Addresses</label>
      {addressInputs}
      <AddCptyButton
        onClick={() => {
          setCptys([...cptys, ""]);
        }}
      >
        <SVG icon="add" />
      </AddCptyButton>
      <label>Agreement contents</label>
      <TextArea
        className="form-control"
        id="Agreement contents"
        placeholder="Terms of agreement"
        value={agreementText}
        onChange={(event: ChangeEvent<HTMLTextAreaElement>) => {
          setAgreementText(event.target.value);
        }}
      />
      <Submit
        disabled={!validate()}
        className={`btn btn-${validate() ? "primary" : "warning"}`}
        onClick={() => CreateAgreementContract(cptys)}
      >
        Create Agreement
        <SVG icon="createAgreement" />
      </Submit>
    </Wrapper>
  );
};

export default CreateAgreement;
