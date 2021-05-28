import React from "react";
import styled from "styled-components";
import { useWeb3React } from "@web3-react/core";

// import "./App.css";
import Header from "./components/Header";
import CreateAgreement from "./components/CreateAgreement";

const Wrap = styled.section`
  text-align: center;
  background-color: #2f3644;
  color: white;
  min-height: 100vh;
  padding: 1%;
`;

function App() {
  const { account } = useWeb3React();
  // const provider = new ethers.providers.Web3Provider(library)
  // const signer = provider.getSigner()

  return (
    <Wrap>
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/css/bootstrap.min.css"
        crossOrigin="anonymous"
      />
      <Header />
      {account ? <CreateAgreement /> : <div>Connect wallet pls</div>}
    </Wrap>
  );
}

export default App;
