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
import {DEFAULT_THEME, PALETTE, ThemeProvider} from '@zendeskgarden/react-theming';

import {BrowserRouter as Router, Route, Switch} from "react-router-dom";

import {ReactComponent as ProductIcon} from '../assets/icons/pictogram.svg';
import {ReactComponent as PersonIcon} from '@zendeskgarden/svg-icons/src/16/user-solo-stroke.svg';

import styled from "styled-components";
import {Driver} from '../containers/driver';
import {DonationProvider, UserProvider} from "../providers";
import {CharityProvider} from "../providers/charity.provider";
import {Navigation} from '../containers/navigation';
import {captainTheme} from "../themes";
import {DriverScopeProvider} from "../providers/driver-scope.provider";

const DriverApp = () => {

    return (
        <ThemeProvider focusVisibleRef={null} theme={captainTheme as any}>
            <UserProvider>
                <DonationProvider>
                    <DriverScopeProvider>
                        <CharityProvider>
                            <Router>
                                <Navigation.PrivateStack>
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
                                                <StyledMain
                                                    style={{padding: DEFAULT_THEME.space.md, boxSizing: "border-box"}}>
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
                                                        <Route exact path={'/donations/:id/start-donation'}>
                                                            <Driver.StartDonationContainer/>
                                                        </Route>
                                                        <Route exact path={'/donations/:id/notify-arrival'}>
                                                            <Driver.NotifyArrivalDonationContainer/>
                                                        </Route>
                                                        <Route exact path={'/donations/:id/adjust-the-quote'}>
                                                            <Driver.AdjustTheQuoteDonationContainer/>
                                                        </Route>
                                                        <Route exact path={'/donations/:id/quote-calculator'}>
                                                            <Driver.QuoteCalculatorDonationContainer/>
                                                        </Route>
                                                        <Route exact path={'/donations/:id/awaiting-user-acceptance'}>
                                                            <Driver.AwaitDonorAcceptanceDonationContainer/>
                                                        </Route>
                                                        <Route exact path={'/donations/:id/quote-accepted'}>
                                                            <Driver.QuoteAcceptedDonationContainer/>
                                                        </Route>
                                                        <Route exact path={'/donations/:id/add-pictures'}>
                                                            <Driver.AddPicturesDonationContainer/>
                                                        </Route>
                                                        <Route exact path={'/donations/:id/picture-gallery'}>
                                                            <Driver.PictureGaleryDonationContainer/>
                                                        </Route>
                                                        <Route exact path={'/donations/:id/load-up-and-move-out'}>
                                                            <Driver.LoadUpAndMoveOutDonationContainer/>
                                                        </Route>
                                                        <Route exact path={'/donations/:id/primary-drop-off'}>
                                                            <Driver.PrimaryDropOffDonationContainer/>
                                                        </Route>
                                                        <Route exact path={'/donations/:id/completed-primary-drop-off'}>
                                                            <Driver.CompletedPrimaryDropOffDonationContainer/>
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
                                </Navigation.PrivateStack>
                                <Navigation.PublicStack>
                                    <Switch>
                                        <Route exact path={'/access'}>
                                            <Driver.LoginContainer/>
                                        </Route>
                                    </Switch>
                                </Navigation.PublicStack>
                            </Router>
                        </CharityProvider>
                    </DriverScopeProvider>
                </DonationProvider>
            </UserProvider>
        </ThemeProvider>
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
