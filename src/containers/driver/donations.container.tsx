import {BaseContainer} from "./base.container";
import {Well} from "@zendeskgarden/react-notifications";
import styled from "styled-components";
import {MD, Span, XXL} from "@zendeskgarden/react-typography";
import React, {useContext, useEffect, useState} from "react";
import {Button} from "@zendeskgarden/react-buttons";
import {Col, Row} from "@zendeskgarden/react-grid";
import {PALETTE} from "@zendeskgarden/react-theming";
import {useHistory, useParams} from "react-router-dom";
import {Skeleton} from "@zendeskgarden/react-loaders";
import moment from "moment";
import {DriverScopeContext} from "../../context/driver-scope.context";

export const DonationsContainer = () => {
    const params = useParams()
    const history = useHistory()
    const [isLoading, setLoading] = useState(true)

    const {donations, actions} = useContext(DriverScopeContext)


    useEffect(() => {
        if (donations && donations?.length > 0) {
            console.log(donations);
            setLoading(false);
        }
    }, [donations])

    const renderPlaceholder = () => (
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
    )

    const getSlotText = (slot: string) => {
        switch (slot){
            case 'slot1': return '8am - 10am'
            case 'slot2': return '10am - 12pm'
            case 'slot3': return '12pm - 2pm'
            case 'slot4': return '2pm - 4pm'
            default: return 'Unassigned'
        }
    }

    return (
        <BaseContainer title={"Donations"} subtitle={"All of your donations"}>
            <>
                {donations ? (
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
                                    <CharityName>{donation.charity?.name}</CharityName>
                                    <Span isBold>Donation status:</Span>
                                    <Address
                                        style={{color: donation.donationStatus === 'completed' ? PALETTE.crimson.M600 : "black"}}
                                    >{donation.donationStatus.replaceAll("_", " ").toUpperCase()}</Address>
                                    <Span isBold>Pickup location:</Span>
                                    <Address>{donation.donor.address}</Address>
                                    <Date><Span isBold>Pickup
                                        date: </Span>{moment(donation.date).format("dddd MM/DD/yyyy")}</Date>
                                    <Time><Span isBold>Pickup time: </Span>{getSlotText(donation.timeSlot!)}</Time>
                                </StyledWellTop>
                                <BottomControls>
                                    {donation.driver ? (
                                        <>
                                            <Button onClick={() => {
                                                history.push(`/donations/${donation.id}`)
                                            }}>View pickup details</Button>
                                        </>
                                    ) : (
                                        <>
                                            <Button onClick={() => {
                                                // acceptDonation(donation)
                                            }}>Accept</Button>
                                            <Button isDanger>Decline</Button>
                                        </>
                                    )}
                                </BottomControls>
                            </StyledWell>
                        ))}
                    </>
                ) : renderPlaceholder}

            </>
        </BaseContainer>
    )
}

const StyledWellTop = styled.div`
`

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
