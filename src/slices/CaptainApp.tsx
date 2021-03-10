import React from 'react';
import {Body, Chrome, Content, Main, Nav, NavItem, NavItemIcon, NavItemText} from '@zendeskgarden/react-chrome';
import {DEFAULT_THEME, PALETTE, ThemeProvider} from '@zendeskgarden/react-theming';

import {BrowserRouter as Router, Link, Route, Switch} from "react-router-dom";

import {ReactComponent as ProductIcon} from '../assets/icons/pictogram.svg';

import {ReactComponent as HomeIcon} from '../assets/icons/parachute-box-light.svg';
import {ReactComponent as PartnersIcon} from '../assets/icons/truck-light.svg';
import {ReactComponent as CharitiesIcon} from '../assets/icons/warehouse-alt-light.svg';
import {ReactComponent as ZonesIcon} from '../assets/icons/map-light.svg';

import styled from "styled-components";
import {
    CharitiesContainer,
    CharityContainer,
    CreateCharityContainer,
    CreateTruckContainer,
    CreateZoneContainer,
    DonationContainer,
    DonationsFunnelContainer,
    LoginContainer,
    Navigation,
    TrucksContainer,
    ZonesContainer
} from "../containers";
import {DonationProvider, UserProvider, ZoneProvider} from "../providers";
import {CaptainHeader} from "../components";
import {EmptyContainer} from "../containers/empty.container";
import {CharityProvider} from "../providers/charity.provider";
import {PartnerProvider} from "../providers/partner.provider";
import {captainTheme} from "../themes";

const CaptainApp = () => {

    return (
        <ThemeProvider focusVisibleRef={null} theme={captainTheme as any}>
            <UserProvider>
                <CharityProvider>
                    <PartnerProvider>
                        <DonationProvider>
                            <ZoneProvider>
                                <Router>
                                    <Navigation.PrivateStack>
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
                                                        <StyledLink to={"/partners"}>
                                                            <StyledNavItm>
                                                                <NavItemIcon>
                                                                    <PartnersIcon style={{color: '#ffffff'}}/>
                                                                </NavItemIcon>
                                                                <NavItemText>Partners</NavItemText>
                                                            </StyledNavItm>
                                                        </StyledLink>

                                                        <StyledLink to={"/charities"}>
                                                            <StyledNavItm>
                                                                <NavItemIcon>
                                                                    <CharitiesIcon style={{color: '#ffffff'}}/>
                                                                </NavItemIcon>
                                                                <NavItemText>Charities</NavItemText>
                                                            </StyledNavItm>
                                                        </StyledLink>

                                                        <StyledLink to={"/zones"}>
                                                            <StyledNavItm>
                                                                <NavItemIcon>
                                                                    <ZonesIcon style={{color: '#ffffff'}}/>
                                                                </NavItemIcon>
                                                                <NavItemText>Zones</NavItemText>
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
                                                                    <DonationsFunnelContainer/>
                                                                </Route>
                                                                <Route exact path={'/donations/:id'}>
                                                                    <DonationContainer/>
                                                                </Route>
                                                                <Route exact path={'/partners'}>
                                                                    <TrucksContainer/>
                                                                </Route>
                                                                <Route exact path={'/charities'}>
                                                                    <CharitiesContainer/>
                                                                </Route>
                                                                <Route exact path={'/charities/:id'}>
                                                                    <CharityContainer/>
                                                                </Route>
                                                                <Route exact path={'/create-charity'}>
                                                                    <CreateCharityContainer/>
                                                                </Route>
                                                                <Route exact path={'/edit-charity/:id'}>
                                                                    <CreateCharityContainer/>
                                                                </Route>
                                                                <Route exact path={'/create-partner'}>
                                                                    <CreateTruckContainer/>
                                                                </Route>
                                                                <Route exact path={'/zones'}>
                                                                    <ZonesContainer/>
                                                                </Route>
                                                                <Route exact path={'/create-zone'}>
                                                                    <CreateZoneContainer/>
                                                                </Route>
                                                                <Route exact path={'/paul'}>
                                                                    <EmptyContainer/>
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
                                                <LoginContainer/>
                                            </Route>
                                        </Switch>
                                    </Navigation.PublicStack>

                                </Router>
                            </ZoneProvider>
                        </DonationProvider>
                    </PartnerProvider>
                </CharityProvider>
            </UserProvider>
        </ThemeProvider>

    );
}

export default CaptainApp;

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

