import React, {useContext, useEffect, useState} from "react";
import {BaseContainer} from "./base.container";
import {Title, Well} from "@zendeskgarden/react-notifications";
import styled from "styled-components";
import {Paragraph, SM, Span, XXL} from "@zendeskgarden/react-typography";
import {Button} from '@zendeskgarden/react-buttons';
import {Col, Row} from "@zendeskgarden/react-grid";
import {CharityContext, DonationContext} from "../../context";
import {useHistory, useParams} from "react-router-dom";

import {EstimateComponent} from "../../components";
import {totalItems, totalPrice} from "../../components/estimate.component";
import {Modal} from "@zendeskgarden/react-modals";
import {Donation} from "../../domain";
import {DonationStatus} from "../../domain/Donation";

export const DonationContainer = () => {
    const history = useHistory();
    const [donation, setDonation] = useState<Donation>()
    const {actions} = useContext(DonationContext)
    const cContext = useContext(CharityContext)
    const {charity} = cContext;

    const params = useParams<{ id: string }>()
    const {id} = params;

    useEffect(() => {
        actions.getDonation(id).then(setDonation);
    }, [])

    useEffect(() => {
        if (donation) {
            cContext.actions.getCharity(donation.charity?.id!)
        }
    }, [donation])


    const openNextStep = () => {
        if (donation){
            let step = '';
            switch (donation.donationStatus){
                case DonationStatus.driver_assigned: step = 'start-donation'; break;
                case DonationStatus.driver_en_route: step = 'notify-arrival'; break;
                case DonationStatus.driver_arrived: step = 'adjust-the-quote'; break;
                case DonationStatus.quote_sent: step = 'awaiting-user-acceptance'; break;
                case DonationStatus.payment_successful: step = 'quote-accepted'; break;
                case DonationStatus.photos_taken: step = 'load-up-and-move-out'; break;
                case DonationStatus.primary_drop: step = 'primary-drop-off'; break;
                case DonationStatus.completed: step = 'completed-primary-drop-off'; break;
                default: step = 'start-donation'
            }

            history.push(`/donations/${id}/${step}`)
        }
    }

    if (donation) {
        return (
            <>
                <BaseContainer showBackButton title={donation.donationCode!} subtitle={"Donation details"}>
                    <Row>
                        <Col>
                            <StyledWell>
                                <StyledTitle>Contact information</StyledTitle>
                                <SM>Name: </SM>
                                <Paragraph>{donation.donor.name}</Paragraph>
                                <SM>Phone number: </SM>
                                <Paragraph>{donation.donor.phone}</Paragraph>
                            </StyledWell>

                            <StyledWell>
                                <StyledTitle>Donation information</StyledTitle>
                                <Paragraph>Number of items : <Span isBold>{totalItems(donation.spec)}</Span></Paragraph>
                                <SM>Address: </SM>
                                <Paragraph>{donation.donor.address}</Paragraph>
                                <SM>Special instructions: </SM>
                                <Paragraph>{donation.spec.additionalInformation}</Paragraph>
                            </StyledWell>
                            <StyledWell>
                                <Row>
                                    <Col>Pickup estimate <small>Based on donor's input</small></Col>
                                    <Col style={{textAlign: "right"}}><XXL>${totalPrice(donation.spec)}</XXL></Col>
                                </Row>
                            </StyledWell>

                            <EstimateComponent spec={donation.spec}/>

                            <BottomControls>
                                <Button
                                    onClick={openNextStep}
                                    isStretched>Continue</Button>
                            </BottomControls>
                        </Col>
                    </Row>
                </BaseContainer>
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
const StyledModal = styled(Modal)`
  left: 0;
  bottom: 0;
  max-width: calc(100%)
`
