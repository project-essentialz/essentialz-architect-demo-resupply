import React, {useContext} from "react";
import {BaseContainer} from "./base.container";
import {Col, Row} from "@zendeskgarden/react-grid";

import styled from "styled-components";
import {Button} from "@zendeskgarden/react-buttons";
import {DonorContext} from "../../context/donor.context";

export const DonationSuccessContainer = () => {
    const {donationData, actions} = useContext(DonorContext)


    return <BaseContainer title={"Success"} subtitle={`Thank you for using ReSupply. Your donation ID is ${donationData.donationCode}`}>
        <>
            <StyledRow>
                <Col lg={12}>
                    <StyledButton
                        onClick={() => {
                            window.location.href = "https://resupplyme.com";
                        }}
                        isStretched>Continue to ReSupply</StyledButton>
                </Col>
            </StyledRow>
        </>
    </BaseContainer>
}

const StyledRow = styled(Row)`
  margin-bottom: 20px;
`

const StyledButton = styled(Button)`
  border-color: white;
  color: white;
  transition: all 100ms ease-in-out;

  &:hover {
    opacity: 0.8;
    border-color: white;
    color: white;
  }
`
