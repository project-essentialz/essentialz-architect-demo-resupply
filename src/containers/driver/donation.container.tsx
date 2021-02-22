import React, {useContext, useEffect, useState} from "react";
import {BaseContainer} from "./base.container";
import {Title, Well} from "@zendeskgarden/react-notifications";
import styled from "styled-components";
import {Paragraph, SM, Span, XXL} from "@zendeskgarden/react-typography";
import {Button, ChevronButton, SplitButton} from '@zendeskgarden/react-buttons';
import {Dropdown, Item, Menu, Trigger} from '@zendeskgarden/react-dropdowns';
import {Col, Row} from "@zendeskgarden/react-grid";
import {CharityContext, DonationContext} from "../../context";
import {useHistory, useParams} from "react-router-dom";
import {Charity, Donation} from "../../services/domain";
import {EstimateComponent} from "../../components";
import {totalItems, totalPrice} from "../../components/estimate.component";
import {PALETTE} from "@zendeskgarden/react-theming";
import {donationActions, nextState} from "../../utility/donation-status";
import {Body, Close, Footer, FooterItem, Header, Modal} from "@zendeskgarden/react-modals";

export const DonationContainer = () => {
    const history = useHistory()
    const [rotated, setRotated] = useState<boolean>();
    const [donation, setDonation] = useState<Donation>()
    const [charity, setCharity] = useState<Charity>()
    const [modalVisible, setModalVisible] = useState(false);
    const {actions} = useContext(DonationContext)
    const cContext = useContext(CharityContext)


    const params = useParams<{ id: string }>()
    const {id} = params;

    useEffect(() => {
        actions.getDonation(id).then(setDonation);
    }, [])

    useEffect(() => {
        if (donation){
            cContext.actions.getCharity(donation.charityId).then(setCharity)
        }
    }, [donation])

    const progressPickup = () => {
        if (donation) {
            if (donation.donationStatus !== 'completed') {
                const nextDonationStatus = nextState(donation.donationStatus);
                actions.updateDonation({...donation, donationStatus: nextDonationStatus, eventType: 'donation_' + nextDonationStatus})
                    .then(setDonation);
            } else {
                setModalVisible(true)
            }
        }
    }

    const getDonationAction = () => {
        // @ts-ignore
        return donationActions[donation.donationStatus]
    }

    const progressDisabled = () => {
        if (donation) {
            return donation.donationStatus === 'quote_sent' ||
                donation.donationStatus === 'driver_arrived' ||
                donation.driverId !== '4737eb58-542e-42fe-b46e-3cdd0db78d99' ||
                (donation.donationStatus === 'payment_successful' && (!donation.photos || donation.photos.length === 0))
        } else {
            return false
        }
    }

    const extraButton = () => [
        {
            title: "Refresh",
            onClick: () => {
                actions.getDonation(id).then(setDonation);
            }
        }
    ]

    if (donation) {
        return (
            <>
                <BaseContainer showBackButton title={donation.donationCode} subtitle={"Donation details"}>
                    <Row>
                        <Col>
                            <StyledWell>
                                <StyledTitle>Contact information</StyledTitle>
                                <SM>Name: </SM>
                                <Paragraph>{donation.donorName}</Paragraph>
                                <SM>Phone number: </SM>
                                <Paragraph>{donation.phone}</Paragraph>
                            </StyledWell>

                            <StyledWell>
                                <StyledTitle>Donation information</StyledTitle>
                                <Paragraph>Number of items : <Span isBold>{totalItems(donation)}</Span></Paragraph>
                                <SM>Address: </SM>
                                <Paragraph>{donation.address}</Paragraph>
                                <SM>Special instructions: </SM>
                                <Paragraph>{donation.additionalInformation}</Paragraph>
                            </StyledWell>
                            <StyledWell>
                                <Row>
                                    <Col>Pickup estimate <small>Based on donor's input</small></Col>
                                    <Col style={{textAlign: "right"}}><XXL>${totalPrice(donation)}</XXL></Col>
                                </Row>
                            </StyledWell>

                            {(donation.donationStatus === 'driver_arrived') && (
                                <StyledWell>
                                    <Paragraph>Quote adjustment</Paragraph>
                                    <SM style={{marginBottom: 10}}>If the donor has more or less items or additional requests please adjust the estimate here</SM>
                                    <Button isStretched onClick={() => {
                                        history.push(`/donations/${donation.id}/validate`)
                                    }}>Adjust the quote</Button>
                                </StyledWell>
                            )}

                            {(donation.donationStatus === 'payment_successful') && (
                                <StyledWell>
                                    <Paragraph>Take photos</Paragraph>
                                    <SM style={{marginBottom: 10}}>Take photos of all donation items</SM>
                                    <SM style={{marginBottom: 10}}>{donation.photos ? donation.photos.length : 0} photos uploaded</SM>
                                    <Button isStretched onClick={() => {
                                        history.push(`/donations/${donation.id}/photos`)
                                    }}>Take photos</Button>
                                </StyledWell>
                            )}

                            {(donation.donationStatus === 'primary_drop') && (
                                <StyledWell>
                                    <Paragraph>Initiate primary drop off</Paragraph>
                                    <SM style={{marginBottom: 10}}>Adjust the content of a drop off in collaboration with a charity personnel at the loading dock</SM>
                                    <Button isStretched onClick={() => {
                                        history.push(`/donations/${donation.id}/primary-drop`)
                                    }}>Initiate primary drop off</Button>
                                </StyledWell>
                            )}


                            <EstimateComponent donation={donation}/>

                            <BottomControls>
                                <StyledSplitButton>
                                    <Button isStretched disabled={progressDisabled()} onClick={progressPickup}>{getDonationAction()}</Button>
                                    <Dropdown
                                        onStateChange={options =>
                                            Object.prototype.hasOwnProperty.call(options, 'isOpen') && setRotated(options.isOpen)
                                        }
                                    >
                                        <StyledTrigger>
                                            <ChevronButton aria-label="other actions" isRotated={rotated}/>
                                        </StyledTrigger>
                                        <Menu placement="bottom-end">
                                            <Item value="prune">View on map</Item>
                                            <Item value="water">Save to my calendar</Item>
                                        </Menu>
                                    </Dropdown>
                                </StyledSplitButton>
                            </BottomControls>
                        </Col>
                    </Row>
                </BaseContainer>
                {modalVisible && (
                    <StyledModal onClose={() => setModalVisible(false)}>
                        <Header>Final instruction</Header>
                        <Body>
                            Congratulations! Your donation for {donation.donorName} has been completed! Payment is being transferred now.
                            {charity ? ` If there are any items left please drop them off at: ${charity.secondaryDropLocation}.` : 'Please contact ReSupply for further instructions.'}
                        </Body>
                        <Footer>
                            <FooterItem>
                                <Button isPrimary onClick={() => {
                                    setModalVisible(false)
                                    history.replace("/")
                                }}>
                                    Confirm
                                </Button>
                            </FooterItem>
                        </Footer>
                        <Close aria-label="Close modal" />
                    </StyledModal>
                )}
            </>
        )
    } else {
        return (<></>)
    }

}

const StyledTitle = styled(Title)`
  margin-bottom: 10px
`
const StyledWell = styled(Well)`
  padding: 20px;
  margin-bottom: 20px;

  p {
    margin-bottom: 10px;
  }
`
const BottomControls = styled.div`
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  padding-top: 20px;
  margin-top: 10px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  margin-bottom: 40px;
`
const StyledSplitButton = styled(SplitButton)`
  width: 100%;
  border: 1px solid ${PALETTE.blue["600"]};
  border-radius: 8px;
`
const StyledTrigger = styled(Trigger)`
  border-left: 1px solid ${PALETTE.blue["600"]};
`
const StyledModal = styled(Modal)`
  left: 0;
  bottom: 0;
  max-width: calc(100%)
`
