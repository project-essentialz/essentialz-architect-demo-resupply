import {useHistory, useParams} from "react-router-dom";
import React, {ChangeEvent, useContext, useEffect, useState} from "react";
import {DonationContext} from "../../context";
import {BaseContainer} from "./base.container";
import {Field, Input, Label} from "@zendeskgarden/react-forms";
import styled from "styled-components";
import {Button} from "@zendeskgarden/react-buttons";
import {Col, Row} from "@zendeskgarden/react-grid";
import {Body, Close, Footer, FooterItem, Header, Modal} from "@zendeskgarden/react-modals";
import {EstimateComponent} from "../../components";
import {Donation} from "../../domain/Donation";

export const ValidateDonationContainer = () => {
    const params = useParams<{ id: string }>()
    const history = useHistory()
    const {actions} = useContext(DonationContext)
    const [donation, setDonation] = useState<Donation>()
    const [estimateVisible, setEstimateVisible] = useState(false);

    const donationId = params.id;

    useEffect(() => {
        actions.getDonation(donationId).then(setDonation);
    }, [])

    useEffect(() => {
        if (donation){
            if (donation.donationStatus === 'quote_sent'){
                actions.updateDonation(donation).then(_ => {
                    history.push(`/donations/${donation.id}`)
                })
            }
        }
    }, [donation])

    const updateField = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const {value, name} = e.target;

        setDonation({
            ...donation,
            [name]: value
        } as Donation)
    }


    const sendTheQuote = () => {
        if (donation) {
            setEstimateVisible(false)
            // setDonation({...donation, donationStatus: 'quote_sent', eventType: "donation_quote_sent"})
        }
    }

    if (donation) {
        return (
            <BaseContainer showBackButton title={'Estimate Validation'} subtitle={'Take photos and adjust the estimate'}>
                <>
                    <Row>
                        <Col>
                            <StyledField>
                                <Label>Large items</Label>
                                <Input name={'largeItems'} onChange={updateField} type={'number'} value={parseInt((donation.spec.largeItems) + '', 10)}/>
                            </StyledField>
                        </Col>
                        <Col>
                            <StyledField>
                                <Label>Small items</Label>
                                <Input name={'smallItems'} onChange={updateField} type={'number'} value={parseInt((donation.spec.smallItems) + '', 10)}/>
                            </StyledField>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <StyledField>
                                <Label>Boxes</Label>
                                <Input name={'boxes'} onChange={updateField} type={'number'} value={parseInt((donation.spec.boxes) + '', 10)}/>
                            </StyledField>
                        </Col>
                        <Col>
                            <StyledField>
                                <Label>Bags</Label>
                                <Input name={'bags'} onChange={updateField} type={'number'} value={parseInt((donation.spec.bags) + '', 10)}/>
                            </StyledField>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <StyledField>
                                <Label>Appliances</Label>
                                <Input name={'appliances'} onChange={updateField} type={'number'} value={parseInt((donation.spec.appliances) + '', 10)}/>
                            </StyledField>
                        </Col>
                        <Col>
                            <StyledField>
                                <Label>Hazardous</Label>
                                <Input name={'hazardous'} onChange={updateField} type={'number'} value={parseInt((donation.spec.hazardous) + '', 10)}/>
                            </StyledField>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <StyledField>
                                <Label>Disassembly</Label>
                                <Input name={'disassembly'} onChange={updateField} type={'number'} value={parseInt((donation.spec.disassembly) + '', 10)}/>
                            </StyledField>
                        </Col>
                        <Col>
                            <StyledField>
                                <Label>Staircases</Label>
                                <Input name={'staircases'} onChange={updateField} type={'number'} value={parseInt((donation.spec.staircases) + '', 10)}/>
                            </StyledField>
                        </Col>
                    </Row>

                    <Button isStretched isPrimary onClick={() => setEstimateVisible(true)}>Show the quote</Button>

                    {estimateVisible && (
                        <StyledModal onClose={() => setEstimateVisible(false)}>
                            <Header>Donation pickup quote</Header>
                            <Body>
                                <EstimateComponent donation={donation}/>
                            </Body>
                            <Footer>
                                <FooterItem>
                                    <Button onClick={() => setEstimateVisible(false)} isBasic>
                                        Cancel
                                    </Button>
                                </FooterItem>
                                <FooterItem>
                                    <Button isPrimary onClick={sendTheQuote}>
                                        Send to customer
                                    </Button>
                                </FooterItem>
                            </Footer>
                            <Close aria-label="Close modal"/>
                        </StyledModal>
                    )}
                </>
            </BaseContainer>
        )
    }
    return (<></>)
}

const StyledModal = styled(Modal)`
  left: 0;
  bottom: 0;
  max-width: calc(100%)
`

const StyledField = styled(Field)`
  margin-bottom: 15px;
`
