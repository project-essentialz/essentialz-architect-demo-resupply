import React from 'react';
import {Body, Chrome, Content, Main, Nav, NavItem, NavItemIcon, NavItemText} from '@zendeskgarden/react-chrome';
import {DEFAULT_THEME, PALETTE} from '@zendeskgarden/react-theming';

import {BrowserRouter as Router, Link, Route, Switch} from "react-router-dom";

import {ReactComponent as ProductIcon} from './assets/icons/pictogram.svg';

import {ReactComponent as HomeIcon} from './assets/icons/parachute-box-light.svg';

import styled from "styled-components";
import {DonationProvider, UserProvider, ZoneProvider} from "./providers";
import Api from "./services/api.service";
import {CaptainHeader} from "./components";
import {CharityProvider} from "./providers/charity.provider";
import {PartnerProvider} from "./providers/partner.provider";
import {Charity} from './containers/charity';

Api.configure('https://architect.rspl.dev')
const CharityApp = () => {

    return (
        <UserProvider>
            <CharityProvider>
                <PartnerProvider>
                    <DonationProvider>
                        <ZoneProvider>
                            <Router>
                                <StyledChrome hue={PALETTE.blue["600"]} isFluid>
                                    <Body>
                                        <CaptainHeader/>
                                        <Content>
                                            <StyledNav>
                                                <StyledLink to={"/"}>
                                                    <StyledNavItm>
                                                        <NavItemIcon>
                                                            <HomeIcon style={{color: '#ffffff'}}/>
                                                        </NavItemIcon>
                                                        <NavItemText>Home</NavItemText>

                                                    </StyledNavItm>
                                                </StyledLink>

                                                <NavItem hasBrandmark title="ReSupply">
                                                    <NavItemIcon>
                                                        <ProductIcon/>
                                                    </NavItemIcon>
                                                    <NavItemText>ReSupply</NavItemText>
                                                </NavItem>
                                            </StyledNav>
                                            <Main>
                                                <div style={{padding: DEFAULT_THEME.space.lg}}>
                                                    <Switch>
                                                        <Route exact path={'/'}>
                                                            <Charity.DonationsFunnelContainer/>
                                                        </Route>
                                                        <Route exact path={'/donations/:id'}>
                                                            <Charity.DonationContainer/>
                                                        </Route>
                                                    </Switch>
                                                </div>
                                            </Main>
                                        </Content>
                                    </Body>
                                </StyledChrome>

                            </Router>
                        </ZoneProvider>
                    </DonationProvider>
                </PartnerProvider>
            </CharityProvider>
        </UserProvider>

    );
}

export default CharityApp;

const StyledChrome = styled(Chrome)`
  height: 100vh;
`

const StyledLink = styled(Link)`
  width: 100%;
`

const StyledNavItm = styled(NavItem)`
  width: 100%
`
const StyledNav = styled(Nav)`
`

