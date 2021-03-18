import React from 'react';
import {Body, Chrome, Content, Main, Nav, NavItem, NavItemIcon, NavItemText} from '@zendeskgarden/react-chrome';
import {DEFAULT_THEME, PALETTE, ThemeProvider} from '@zendeskgarden/react-theming';

import {BrowserRouter as Router, Link, Route, Switch} from "react-router-dom";

import {ReactComponent as ProductIcon} from '../assets/icons/pictogram.svg';

import {ReactComponent as HomeIcon} from '../assets/icons/parachute-box-light.svg';
import {ReactComponent as PartnersIcon} from '../assets/icons/truck-light.svg';
import {ReactComponent as CharitiesIcon} from '../assets/icons/warehouse-alt-light.svg';
import {ReactComponent as ZonesIcon} from '../assets/icons/map-light.svg';
import {ReactComponent as UsersIcon} from '../assets/icons/user-friends-light.svg';

import styled from "styled-components";
import {
    CharitiesContainer,
    CharityContainer,
    CreateCharityContainer,
    CreateTruckContainer,
    CreateUserContainer,
    CreateZoneContainer,
    DonationContainer,
    DonationsFunnelContainer,
    LoginContainer,
    TrucksContainer,
    UsersContainer,
    ZonesContainer,
    CreateDonationContainer
} from "../containers/captain";
import {DonationProvider, UserProvider, ZoneProvider} from "../providers";
import {CaptainHeader} from "../components";
import {CharityProvider} from "../providers/charity.provider";
import {PartnerProvider} from "../providers/partner.provider";
import {captainTheme} from "../themes";
import {Navigation} from '../containers/navigation';

const CaptainApp = () => {

    const MenuItem = (link: string, Icon: any, label: string) => (
        <StyledLink to={link}>
            <StyledNavItm>
                <NavItemIcon>
                    <Icon style={{color: '#ffffff'}}/>
                </NavItemIcon>
                <NavItemText>{label}</NavItemText>
            </StyledNavItm>
        </StyledLink>
    )

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
                                                        {MenuItem('/', HomeIcon, 'Home')}
                                                        {MenuItem('/partners', PartnersIcon, 'Partners')}
                                                        {MenuItem('/charities', CharitiesIcon, 'Charities')}
                                                        {MenuItem('/zones', ZonesIcon, 'Zones')}
                                                        {MenuItem('/users', UsersIcon, 'Users')}

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
                                                                <Route exact path={'/create-donation'}>
                                                                    <CreateDonationContainer/>
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
                                                                <Route exact path={'/users'}>
                                                                    <UsersContainer/>
                                                                </Route>
                                                                <Route exact path={'/create-user'}>
                                                                    <CreateUserContainer/>
                                                                </Route>
                                                                <Route exact path={'/edit-user/:id'}>
                                                                    <CreateUserContainer/>
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

