import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { RouteComponentProps } from "react-router";
import styled, { createGlobalStyle } from "styled-components";
import { useWeb3React } from "@web3-react/core";

import Header from "./components/Header";
import CreateAgreement from "./components/CreateAgreement";
import UserAgreements from "./components/UserAgreements";
import EditAgreement from "./components/EditAgreement";

const Wrap = styled.section`
  text-align: center;
  background-color: #2f3644;
  color: white;
  min-height: 100vh;
  padding: 1%;
`;

export const GlobalStyle = createGlobalStyle`
  html {
    scroll-behavior: smooth;
  }
  a {
    text-decoration: none !important;
    color: inherit;
  }
  a:hover {
    color: inherit;
    text-decoration: none !important;
  }
`;

interface MatchParams {
  id: string;
}

interface Props extends RouteComponentProps<MatchParams> {}

function App() {
  const { account } = useWeb3React();

  return (
    <Wrap>
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/css/bootstrap.min.css"
        crossOrigin="anonymous"
      />
      <BrowserRouter>
        <Switch>
          <Route
            exact
            path="/agreement"
            render={() => (
              <div>
                <Header />
                {account ? <CreateAgreement /> : <div>Connect wallet pls</div>}
                {account ? <UserAgreements /> : null}
              </div>
            )}
          />
          <Route
            exact
            path="/agreement/:id"
            render={(props: Props) => (
              <div>
                <Header />
                {account ? (
                  <EditAgreement id={props.match.params.id} />
                ) : (
                  <div>Connect wallet pls</div>
                )}
              </div>
            )}
          />
          <Redirect to="/agreement" />
        </Switch>
      </BrowserRouter>
    </Wrap>
  );
}

export default App;
