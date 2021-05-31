import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useWeb3React } from "@web3-react/core";
import { InjectedConnector } from "@web3-react/injected-connector";

import SVG from "./svg";

const Wrapper = styled.section`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 50px;
`;

const Title = styled(Link)`
  color: white;
  display: flex;
  font-size: 200%;
  &:hover {
    color: white;
    text-decoration: none;
  }
`;

const Account = styled.section`
  display: flex;
  height: fit-content;
`;

const injectedConnector = new InjectedConnector({
  supportedChainIds: [
    80001, //Polygon Mumbai testnet
  ],
});

function Header() {
  const { account, activate, deactivate } = useWeb3React();

  return (
    <Wrapper>
      <Title to="/agreement">
        <SVG icon="agreement" />
        Contractual NFT
      </Title>
      <Account>
        <SVG icon="wallet" />
        {account ? (
          account
        ) : (
          <button
            className="btn btn-primary"
            onClick={() => activate(injectedConnector)}
          >
            Connect Wallet
          </button>
        )}
      </Account>
    </Wrapper>
  );
}

export default Header;
