import React, {ChangeEvent, useContext, useEffect, useState} from "react";
import {BaseContainer} from "./base.container";
import {Col, Row} from "@zendeskgarden/react-grid";

import styled from "styled-components";
import {MD, XL} from "@zendeskgarden/react-typography";
import {Field, Input, Label, MediaInput, Message, Textarea} from "@zendeskgarden/react-forms";
import {Button} from "@zendeskgarden/react-buttons";
import {useHistory} from "react-router-dom";
import {DonorContext} from "../../context/donor.context";
import {PALETTE} from "@zendeskgarden/react-theming";
import ReactInputMask from "react-input-mask";
import {Donation} from "../../domain";
import _ from "lodash";
import * as yup from 'yup';

const schema = yup.object().shape({
    name: yup.string().required(),
    address: yup.string().required(),
    city: yup.string().required(),
    state: yup.string().required(),
    zip: yup.string().required(),
    phone: yup.string().matches(/^(\+1)\d{10}/g).required(),
    email: yup.string().email().required(),
})

export const DonationInformationContainer = () => {
    const {donationData, setDonationData, actions} = useContext(DonorContext)
    const [disabled, setDisabled] = useState(true)
    const history = useHistory();

    useEffect(() => {
        schema.validate(donationData.donor).then((result) => {
            setDisabled(false)
        }).catch(() => {
            setDisabled(true)
        })
    }, [donationData])

    const updateDonation = (key: string, value: any) => {
        const d = new Donation();
        Object.assign(d, donationData);
        _.set(d, key, value);
        setDonationData(d);
    }

    const fieldChanged = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const {value, name} = e.target;
        updateDonation(name, value);
    }

    const progress = () => {
        schema.validate(donationData.donor).then((result) => {
            actions.submitDonation(donationData).then(() => {
                history.push(`/-/success`)
            })
        })
    }

    return <BaseContainer title={"Let's lock in your spot"} subtitle={"Confirm your donation"}>
        <ContentWrapper>
            <StyledRow>
                <Col xs={12}>
                    <Question>Tell us about you</Question>
                </Col>

                <Col>
                    <StyledField>
                        <MD>What is your name?</MD>
                        <Input onChange={fieldChanged} name={"donor.name"} placeholder={"Your first and last name"}/>
                    </StyledField>
                </Col>
            </StyledRow>
            <StyledRow>
                <Col>
                    <StyledField>
                        <MD>What is your phone number?</MD>
                        <ReactInputMask mask={'+19999999999'} onChange={fieldChanged} name={"donor.phone"}
                                        placeholder={"Your phone number"}>
                            <Input/>
                        </ReactInputMask>
                    </StyledField>
                </Col>
            </StyledRow>
            <StyledRow>
                <Col>
                    <StyledField>
                        <MD>What is your address?</MD>
                        <MediaInput
                            onChange={fieldChanged}
                            name={"donor.address"}/>
                    </StyledField>
                </Col>
                <Col xs={12}>
                    <Row>
                        <Col>
                            <StyledField>
                                <MD>City</MD>
                                <Input onChange={fieldChanged} name={"donor.city"}/>
                            </StyledField>
                        </Col>
                        <Col>
                            <StyledField>
                                <MD>State</MD>
                                <Input onChange={fieldChanged} name={"donor.state"}/>
                            </StyledField>
                        </Col>
                        <Col>
                            <StyledField>
                                <MD>Zip</MD>
                                <Input onChange={fieldChanged} name={"donor.zip"}/>
                            </StyledField>
                        </Col>
                    </Row>
                </Col>
            </StyledRow>
            <StyledRow>
                <Col>
                    <StyledField>
                        <MD>What is your email?</MD>
                        <Input onChange={fieldChanged} type={"email"} name={"donor.email"} placeholder={"Your email"}/>
                    </StyledField>
                </Col>
            </StyledRow>

            <StyledRow>
                <Col>
                    <StyledField>
                        <MD>Do you have any special instructions?</MD>
                        <StyledTextArea onChange={fieldChanged} name="spec.additionalInformation"
                                        placeholder={"Enter any special instructions"}/>
                    </StyledField>
                </Col>
            </StyledRow>

            <StyledRow>
                <Col lg={12}>
                    <StyledButton
                        disabled={disabled}
                        onClick={progress}
                        isStretched>Finalize and Schedule your Donation Pick-up</StyledButton>
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
const StyledField = styled(Field)`
  margin-bottom: 15px;
  text-align: left;
`
const Question = styled(XL)`
  margin-bottom: 10px;
  text-align: center;
`
const StyledRow = styled(Row)`
  margin-bottom: 20px;
  margin-top: 20px;
  text-align: center;
`

const StyledButton = styled(Button)`
  transition: all 100ms ease-in-out;
  background-color: rgba(255, 255, 255, 0.4);

  &:hover {
    opacity: 0.8;
  }
`

const StyledLabel = styled(Label)`
  opacity: 0.9;
  font-weight: 400;
  display: block;
  margin-bottom: 10px;
`

const StyledTextArea = styled(Textarea)`
`
