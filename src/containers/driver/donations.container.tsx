import {BaseContainer} from "./base.container";
import {Well} from "@zendeskgarden/react-notifications";
import styled from "styled-components";
import {MD, Span, XXL} from "@zendeskgarden/react-typography";
import React, {useContext, useEffect, useState} from "react";
import {Button} from "@zendeskgarden/react-buttons";
import {Col, Row} from "@zendeskgarden/react-grid";
import {PALETTE} from "@zendeskgarden/react-theming";
import {useHistory, useParams} from "react-router-dom";
import {DonationContext} from "../../context";
import {Donation} from "../../services/domain";
import {Skeleton} from "@zendeskgarden/react-loaders";
import moment from "moment";

export const DonationsContainer = () => {
    const params = useParams()
    const history = useHistory()
    const [currentView, setCurrentView] = useState('upcoming')
    const [isLoading, setLoading] = useState(false)

    const {donations, actions} = useContext(DonationContext)

    useEffect(() => {
        setLoading(true);
        switch (currentView) {
            case 'queue':
                actions.getAllDonations("driver_id=");
                return
            case 'upcoming':
                actions.getAllDonations("driver_id=4737eb58-542e-42fe-b46e-3cdd0db78d99");
                return
            default:
                actions.getAllDonations("driver_id=");
                return
        }
    }, [currentView])

    useEffect(() => {
        setLoading(false);
    }, [donations])

    useEffect(() => {
        console.log(params);
        console.log(history.location)

        actions.getAllDonations("driver_id=4737eb58-542e-42fe-b46e-3cdd0db78d99");
    }, [])

    const acceptDonation = (donation: Donation) => {
        actions.acceptDonation(donation).then(_ => {
            setCurrentView('upcoming')
            actions.getAllDonations()
        })
    }


    return (
        <BaseContainer title={"Donations"} subtitle={"All of your donations"}>
            <>
                <Row>
                    <ButtonsWrapper>
                        {/*<StyledSelectionButton onClick={() => {*/}
                        {/*    setCurrentView('today')*/}
                        {/*}} isPrimary={currentView === 'today'} isStretched>Today</StyledSelectionButton>*/}
                        <StyledSelectionButton onClick={() => {
                            setCurrentView('upcoming')
                        }} isPrimary={currentView === 'upcoming'} isStretched>My donations</StyledSelectionButton>
                        <StyledSelectionButtonWithNotification onClick={() => {
                            setCurrentView('queue')
                        }} isPrimary={currentView === 'queue'} isStretched>Queue</StyledSelectionButtonWithNotification>
                    </ButtonsWrapper>
                </Row>
                {isLoading ? (
                    <Row justifyContent="center">
                        <Col sm={5}>
                            <XXL>
                                <Skeleton/>
                            </XXL>
                            <MD>
                                <Skeleton/>
                                <Skeleton/>
                                <Skeleton/>
                            </MD>
                        </Col>
                    </Row>

                ) : (

                    <>
                        {donations.map(donation => (
                            <StyledWell key={donation.id}
                                        style={{backgroundColor: donation.donationStatus === 'completed' ? PALETTE.grey["200"] : 'white'}}>
                                <StyledWellTop
                                    onClick={() => history.push(`/donations/${donation.id}`)}
                                >
                                    <WellHeader>
                                        <p>{donation.donationCode}</p>
                                    </WellHeader>
                                    <CharityName>{donation.charityName}</CharityName>
                                    <Span isBold>Donation status:</Span>
                                    <Address
                                        style={{color: donation.donationStatus === 'completed' ? PALETTE.crimson.M600 : "black"}}
                                    >{donation.donationStatus}</Address>
                                    <Span isBold>Pickup location:</Span>
                                    <Address>{donation.address}</Address>
                                    <Date><Span isBold>Pickup date: </Span>{moment(donation.date).format("dddd MM/DD/yyyy")}</Date>
                                    <Time><Span isBold>Pickup time: </Span>{donation.timeSlot}</Time>
                                </StyledWellTop>
                                <BottomControls>
                                    {donation.driverId ? (
                                        <>
                                            <Button onClick={() => {
                                                history.push(`/donations/${donation.id}`)
                                            }}>View pickup details</Button>
                                        </>
                                    ) : (
                                        <>
                                            <Button onClick={() => {
                                                acceptDonation(donation)
                                            }}>Accept</Button>
                                            <Button isDanger>Decline</Button>
                                        </>
                                    )}
                                </BottomControls>
                            </StyledWell>
                        ))}
                    </>
                )}

            </>
        </BaseContainer>
    )
}
const StyledWellTop = styled.div``
const StyledWell = styled(Well)`
  padding: 20px;
  margin-bottom: 10px;
`

const CharityName = styled.p`
  margin-bottom: 10px;
  font-size: 18px;
  font-weight: 600;
  color: black;
`
const Address = styled.p`
  margin-bottom: 5px;
`
const Date = styled.p`
  margin-bottom: 5px;
`
const Time = styled.p`
  margin-bottom: 5px;
`

const WellHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 10px;
`
const WellContent = styled.div`
  padding: 20px;
`

const BottomControls = styled.div`
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  padding-top: 20px;
  margin-top: 10px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
`

const ButtonsWrapper = styled(Col)`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  margin-bottom: 20px;
`
const StyledSelectionButton = styled(Button)`
  margin: 0 10px;
  user-select: none !important;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);

  &:first-of-type {
    margin-left: 0
  }

  &:last-of-type {
    margin-right: 0
  }
`

const StyledSelectionButtonWithNotification = styled(StyledSelectionButton)`
  position: relative;
  overflow: visible;

  &:after {
    content: '';
    position: absolute;
    width: 20px;
    height: 20px;
    border-radius: 10px;
    background-color: ${PALETTE.red["500"]};
    color: white;
    font-size: 13px;
    display: flex;
    justify-content: center;
    align-items: center;
    right: -8px;
    top: -8px;
  }
`
