import React, {useContext} from "react";
import {BaseContainer} from "./base.container";
import {Col, Row} from "@zendeskgarden/react-grid";

import styled from "styled-components";
import {Button} from "@zendeskgarden/react-buttons";
import {DonorContext} from "../../context/donor.context";
import {LG, MD, Paragraph, Span} from "@zendeskgarden/react-typography";
import {EstimateComponent, Space} from "../../components";
import {PALETTE} from "@zendeskgarden/react-theming";

export const DonationSuccessContainer = () => {
    const {donationData, actions} = useContext(DonorContext)


    return <BaseContainer title={"Your donation is submitted!"} subtitle={`Thank you for using ReSupply`}>
        <ContentWrapper>
            <StyledRow>
                <Col lg={12}>
                    <Paragraph>
                        Your Donation for {donationData.charity?.name} is scheduled for {donationData.date}. Your
                        donation I.D. is {donationData.donationCode}.
                        Check your phone and email for your confirmation and lookout for the next steps!
                    </Paragraph>

                    <Space size={30}/>
                    <Line/>
                    <Space size={30}/>
                    <div style={{textAlign: 'left'}}>
                        <LG style={{color: PALETTE.grey["500"]}}>Donation Summary</LG>
                        <Space size={30}/>
                        <LG><Span isBold>{donationData.charity?.name}</Span></LG>
                        <MD><Span isBold>Name:</Span> {donationData.donor.name}</MD>
                        <MD><Span isBold>Phone:</Span> {donationData.donor.phone}</MD>
                        <MD><Span isBold>Address:</Span> {donationData.donor.address} {donationData.donor.city} {donationData.donor.state} {donationData.donor.zip} </MD>
                        <MD><Span isBold>Date:</Span> {donationData.date || 'DATE MISSING'} at {donationData.partOfDay} </MD>
                    </div>

                    <StyledRow style={{marginBottom: 40, textAlign: 'left'}}>
                        <Col lg={12}>
                            <EstimateComponent spec={donationData.spec}/>
                        </Col>
                    </StyledRow>
                    <StyledButton
                        onClick={() => {
                            window.location.href = "https://resupplyme.com";
                        }}
                        isStretched>Continue to ReSupply</StyledButton>
                </Col>
            </StyledRow>
        </ContentWrapper>
    </BaseContainer>
}

const ContentWrapper = styled.div`
  color: #2c3b64;
`
const Line = styled.div`
  width: 100%;
  height: 1px;
  background-color: ${PALETTE.grey["200"]};
`

const StyledRow = styled(Row)`
  margin-bottom: 20px;
  margin-top: 20px;
  text-align: center;
`

const StyledButton = styled(Button)`
  transition: all 100ms ease-in-out;

  &:hover {
    opacity: 0.8;
  }
`
