import React, {ChangeEvent, useContext, useEffect, useState} from "react";
import {BaseContainer} from "./base.container";
import {Col, Row} from "@zendeskgarden/react-grid";

import styled from "styled-components";
import {XL} from "@zendeskgarden/react-typography";
import {Field, Input, Label} from "@zendeskgarden/react-forms";
import {Dropdown, Field as DropdownField, Item, Menu, Select} from '@zendeskgarden/react-dropdowns';
import {Button} from "@zendeskgarden/react-buttons";
import {useHistory} from "react-router-dom";
import {DonorContext} from "../../context/donor.context";

interface IItem {
    label: string;
    value: string;
}

const floorOptions = [
    {label: 'Yes', value: 'yes'},
    {label: 'No', value: 'no'},
    {label: 'Yes, but there is an elevator', value: 'yes-elevator'},
    {label: 'Yes, but I will bring the items to the ground floor', value: 'yes-curbside'}
];

const disassembleOptions = [
    {label: 'Yes', value: 'yes'},
    {label: 'No', value: 'no'}
];

const heightOptions = [
    {label: '1', value: '1'},
    {label: '2', value: '2'},
    {label: '3', value: '3'},
    {label: '4', value: '4'},
    {label: '5', value: '5'}
];

export const DonationInformationContainer = () => {
    const {donationData, setDonationData} = useContext(DonorContext)

    const history = useHistory();
    const [floorOptionSelected, setFloorOptionSelected] = useState(floorOptions[1]);
    const [disassembleOptionSelected, setDisassembleOptionSelected] = useState(floorOptions[1]);
    const [height, setHeight] = useState(heightOptions[1]);

    useEffect(() => {
    }, [donationData])

    const updateDonation = (key: string, value: any) => {
        setDonationData({
            ...donationData,
            [key]: value
        })
    }

    const fieldChanged = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const {value, name} = e.target;
        updateDonation(name, value);
    }

    useEffect(() => {
        updateDonation("aboveTheGroundFloor", floorOptionSelected.value)
        if (floorOptionSelected.value !== 'yes'){
            setHeight({label: 'No staircases', value: '0'})
        }
    }, [floorOptionSelected])

    useEffect(() => {
        updateDonation("staircases", height.value)
    }, [height])

    useEffect(() => {
        if (disassembleOptionSelected.value === 'no'){
            setDonationData({
                ...donationData,
                'disassembly': 0
            })
        }
    }, [disassembleOptionSelected])


    return <BaseContainer title={"Let's lock in your spot"} subtitle={"Confirm your donation"}>
        <>
            <StyledRow>
                <Col lg={12}>
                    <StyledField>
                        <Question>Are any of your items above or below the ground floor?</Question>
                        <StyledLabel>For insurance and labor purposes, a small fee is added if items must be moved up or down staircases</StyledLabel>
                        <Dropdown
                            selectedItem={floorOptionSelected}
                            onSelect={setFloorOptionSelected}
                            downshiftProps={{itemToString: (item: IItem) => item && item.label}}
                        >
                            <DropdownField>
                                <Select>{floorOptionSelected.label}</Select>
                            </DropdownField>
                            <Menu>
                                {floorOptions.map(option => (
                                    <Item key={option.value} value={option}>
                                        {option.label}
                                    </Item>
                                ))}
                            </Menu>
                        </Dropdown>
                    </StyledField>
                </Col>
            </StyledRow>
            {floorOptionSelected.value === 'yes' && (<StyledRow>
                <Col lg={12}>
                    <StyledField>
                        <Question>How many staircases will we have to use?</Question>
                        <Dropdown
                            selectedItem={height}
                            onSelect={setHeight}
                            downshiftProps={{itemToString: (item: IItem) => item && item.label}}
                        >
                            <DropdownField>
                                <Select>{height.label}</Select>
                            </DropdownField>
                            <Menu>
                                {heightOptions.map(option => (
                                    <Item key={option.value} value={option}>
                                        {option.label}
                                    </Item>
                                ))}
                            </Menu>
                        </Dropdown>
                    </StyledField>
                </Col>
            </StyledRow>)}
            <StyledRow>
                <Col lg={12}>
                    <StyledField>
                        <Question>Will any of your items need to be disassembled BEFORE we remove them from your location?</Question>
                        <StyledLabel>Please select ‘yes’ or ‘no’ if we will need to disassemble items, either manually or with tools.</StyledLabel>
                        <Dropdown
                            selectedItem={disassembleOptionSelected}
                            onSelect={setDisassembleOptionSelected}
                            downshiftProps={{itemToString: (item: IItem) => item && item.label}}
                        >
                            <DropdownField>
                                <Select>{disassembleOptionSelected.label}</Select>
                            </DropdownField>
                            <Menu>
                                {disassembleOptions.map(option => (
                                    <Item key={option.value} value={option}>
                                        {option.label}
                                    </Item>
                                ))}
                            </Menu>
                        </Dropdown>
                    </StyledField>
                </Col>
            </StyledRow>
            {disassembleOptionSelected.value === 'yes' && (<StyledRow>
                <Col lg={7}>
                    <StyledField>
                        <Question>How many of your items will need to be disassembled?</Question>
                        <Input onChange={fieldChanged} name={'disassembly'} type={"number"} placeholder={"Enter the number of items"}/>
                    </StyledField>
                </Col>
            </StyledRow>)}
            <StyledRow>
                <Col lg={12}>
                    <StyledButton
                        onClick={() => {
                            history.push(`/-/confirm`)
                        }}
                        isStretched>Continue</StyledButton>
                </Col>
            </StyledRow>
        </>
    </BaseContainer>
}

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
const StyledLabel = styled(Label)`
  color: white;
  opacity: 0.9;
  font-weight: 400;
  display: block;
  margin-bottom: 10px;
`
