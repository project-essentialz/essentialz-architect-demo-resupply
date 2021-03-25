import React, {ChangeEvent, useContext} from "react";
import {BaseContainer} from "./base.container";
import {Col, Row} from "@zendeskgarden/react-grid";

import styled from "styled-components";
import {XL} from "@zendeskgarden/react-typography";
import {Field, Textarea} from "@zendeskgarden/react-forms";
import {Button} from "@zendeskgarden/react-buttons";
import {useHistory} from "react-router-dom";
import {DonorContext} from "../../context/donor.context";
import {EstimateComponent} from "../../components";

export const ConfirmDonationContainer = () => {
    const {donationData, setDonationData, actions} = useContext(DonorContext)
    const history = useHistory();
    const updateDonation = (key: string, value: any) => {
        // setDonationData({
        //     ...donationData,
        //     [key]: value
        // })
    }

    const fieldChanged = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const {value, name} = e.target;
        updateDonation(name, value);
    }

    return <BaseContainer title={"Estimate"} subtitle={"This is what we have based on information you provided."}>
        <>
            <StyledRow style={{marginBottom: 40}}>
                <Col lg={12}>
                    <StyledTable>
                        <EstimateComponent spec={donationData.spec}/>
                    </StyledTable>
                </Col>
            </StyledRow>

            <StyledRow>
                <Col lg={12}>
                    <StyledField>
                        <Question>Do you have any special instructions?</Question>
                        <StyledTextArea onChange={fieldChanged} name="additionalInformation" placeholder={"Enter any special instructions"}/>
                    </StyledField>
                </Col>
            </StyledRow>
            <StyledRow>
                <Col lg={12}>
                    <StyledButton

                        onClick={() => {
                            actions.submitDonation(donationData)
                                .then(r => {
                                    history.push('/-/success')
                                })
                        }}
                        isStretched>Complete the donation</StyledButton>
                </Col>
            </StyledRow>
        </>
    </BaseContainer>
}

const StyledTable = styled.div`
  table {
    background-color: white;
  }
`
const StyledTextArea = styled(Textarea)`
`

const StyledField = styled(Field)`
  margin-bottom: 15px;
`
const Question = styled(XL)`
  margin-bottom: 10px;
  color: white
`
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
