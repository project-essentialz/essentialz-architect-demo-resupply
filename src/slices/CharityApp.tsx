import React from 'react';
import {Body, Chrome, Content, Main, Nav, NavItem, NavItemIcon, NavItemText} from '@zendeskgarden/react-chrome';
import {DEFAULT_THEME, PALETTE, ThemeProvider} from '@zendeskgarden/react-theming';

import {BrowserRouter as Router, Link, Route, Switch} from "react-router-dom";

import {ReactComponent as ProductIcon} from '../assets/icons/pictogram.svg';

import {ReactComponent as HomeIcon} from '../assets/icons/parachute-box-light.svg';

import styled from "styled-components";
import {DonationProvider, UserProvider, ZoneProvider} from "../providers";
import {CharityHeader} from "../components";
import {CharityProvider} from "../providers/charity.provider";
import {PartnerProvider} from "../providers/partner.provider";
import {Charity} from '../containers/charity';
import {charityTheme} from "../themes/charity.theme";
import {Navigation} from "../containers/navigation";
import {CharityScopeProvider} from "../providers/charity-scope.provider";

const CharityApp = () => {

    return (
        <ThemeProvider focusVisibleRef={null} theme={charityTheme as any}>
            <UserProvider>
                <CharityProvider>
                    <PartnerProvider>
                        <CharityScopeProvider>
                            <ZoneProvider>
                                <Router>
                                    <Navigation.PrivateStack>
                                        <StyledChrome hue={PALETTE.blue["600"]} isFluid>
                                            <Body>
                                                <CharityHeader/>
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
                                    </Navigation.PrivateStack>
                                    <Navigation.PublicStack>
                                        <Switch>
                                            <Route exact path={'/access'}>
                                                <Charity.LoginContainer/>
                                            </Route>
                                        </Switch>
                                    </Navigation.PublicStack>
                                </Router>
                            </ZoneProvider>
                        </CharityScopeProvider>
                    </PartnerProvider>
                </CharityProvider>
            </UserProvider>
        </ThemeProvider>

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

