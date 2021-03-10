import React from 'react';
import {
    Body,
    Chrome,
    Content,
    Header,
    HeaderItem,
    HeaderItemIcon,
    HeaderItemText,
    Main
} from '@zendeskgarden/react-chrome';
import {DEFAULT_THEME, PALETTE} from '@zendeskgarden/react-theming';

import {BrowserRouter as Router, Route, Switch} from "react-router-dom";

import {ReactComponent as ProductIcon} from './assets/icons/pictogram.svg';
import {ReactComponent as PersonIcon} from '@zendeskgarden/svg-icons/src/16/user-solo-stroke.svg';

import styled from "styled-components";
import {Driver} from '../containers/driver';
import {DonationProvider, UserProvider} from "../providers";
import {CharityProvider} from "../providers/charity.provider";

const DriverApp = () => {

    return (
        <Router>
            <UserProvider>
                <DonationProvider>
                    <CharityProvider>
                        <StyledChrome isFluid>
                            <StyledChromeBody>
                                <Header isStandalone>
                                    <HeaderItem hasLogo>
                                        <HeaderItemIcon>
                                            <ProductIcon style={{color: PALETTE.red[400]}}/>
                                        </HeaderItemIcon>
                                        <HeaderItemText>ReSupply Captain Portal</HeaderItemText>
                                    </HeaderItem>
                                    <HeaderItem isRound>
                                        <HeaderItemIcon>
                                            <PersonIcon/>
                                        </HeaderItemIcon>
                                        <HeaderItemText isClipped>User</HeaderItemText>
                                    </HeaderItem>
                                </Header>
                                <Content>
                                    <StyledMain style={{padding: DEFAULT_THEME.space.md, boxSizing: "border-box"}}>
                                        <Switch>
                                            <Route exact path={'/'}>
                                                <Driver.DonationsContainer/>
                                            </Route>
                                            <Route exact path={'/queue'}>
                                                <Driver.DonationsContainer/>
                                            </Route>
                                            <Route exact path={'/donations/:id'}>
                                                <Driver.DonationContainer/>
                                            </Route>
                                            <Route exact path={'/donations/:id/validate'}>
                                                <Driver.ValidateDonationContainer/>
                                            </Route>
                                            <Route exact path={'/donations/:id/photos'}>
                                                <Driver.DonationPhotosContainer/>
                                            </Route>
                                            <Route exact path={'/donations/:id/primary-drop'}>
                                                <Driver.DropOffContainer/>
                                            </Route>
                                        </Switch>
                                    </StyledMain>
                                </Content>
                            </StyledChromeBody>
                        </StyledChrome>
                    </CharityProvider>
                </DonationProvider>
            </UserProvider>
        </Router>

    );
}

export default DriverApp;

const StyledChrome = styled(Chrome)`
  height: calc(100vh);
  height: -webkit-fill-available;
  overflow: hidden !important;
`
const StyledChromeBody = styled(Body)`
`
const StyledMain = styled(Main)`
  height: calc(100vh - 150px);
  height: -webkit-fill-available;
  //overflow: scroll;
`
