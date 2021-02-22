import React from 'react';

import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import {Donor} from './containers/donor';
import styled from "styled-components";
import {mediaQuery} from "@zendeskgarden/react-theming";
import {DonorProvider} from "./providers/donor.provider";
import {CharityProvider} from "./providers/charity.provider";
import {DonationProvider} from "./providers";
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from "@stripe/stripe-js";
import Api from "./services/api.service";

const stripePromise = loadStripe('pk_test_51IH6isAli9cINsW6LTH12vKhdp4hn9zuKFZwYetfCXKNADmBNkbNGF9hq9kMzucuOeg7ZtZG131gPYiHGkERmhnb00EAasc6Mi');
Api.configure('https://architect.rspl.dev')
const DonorApp = () => {

    return (
        <Router>
            <DonorProvider>
                <CharityProvider>
                    <DonationProvider>
                        <Elements stripe={stripePromise}>
                        <Main>
                            <Content>
                                <Switch>
                                    <Route exact path={'/start/:charityId'}>
                                        <Donor.FlowContainer/>
                                    </Route>
                                    <Route exact path={'/:charityId/additional-information'}>
                                        <Donor.DonationInformationContainer/>
                                    </Route>
                                    <Route exact path={'/:charityId/confirm'}>
                                        <Donor.ConfirmDonationContainer/>
                                    </Route>
                                    <Route exact path={'/:charityId/success'}>
                                        <Donor.DonationSuccessContainer/>
                                    </Route>
                                    <Route exact path={'/d/:donationCode'}>
                                        <Donor.PaymentContainer/>
                                    </Route>
                                    <Route exact path={'/c/:donationId/:outcome'}>
                                        <Donor.PaymentOutcomeContainer/>
                                    </Route>
                                </Switch>
                            </Content>
                        </Main>
                        </Elements>
                    </DonationProvider>
                </CharityProvider>
            </DonorProvider>
        </Router>

    );
}

export default DonorApp;


const Main = styled.main`
  height: -webkit-fill-available;
  height: calc(100vh);
  overflow: scroll;
  display: flex;
  flex-direction: row;

  * {
    box-sizing: border-box;
  }

  background-color: #2c3b64;
`

const Content = styled.div`
  padding: 20px;
  flex: 1;
  max-width: 400px;
  margin: auto;

  ${p => mediaQuery('up', 'lg', p.theme)} {
    max-width: 600px;
    align-items: center;
    display: flex;
    justify-content: center;


  }

`
