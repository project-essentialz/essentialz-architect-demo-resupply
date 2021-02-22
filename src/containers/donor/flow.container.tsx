import React, {ChangeEvent, useContext, useEffect, useState} from "react";
import {BaseContainer} from "./base.container";
import {DonationCategoryTileComponent} from "../../components";
import {Col, Row} from "@zendeskgarden/react-grid";

import {ReactComponent as SofaIcon} from "../../assets/icons/couch-light.svg";
import {ReactComponent as ChairIcon} from "../../assets/icons/chair-light.svg";
import {ReactComponent as BoxIcon} from "../../assets/icons/box-light.svg";
import {ReactComponent as BagIcon} from "../../assets/icons/sack-light.svg";
import {ReactComponent as FridgeIcon} from "../../assets/icons/refrigerator-light.svg";
import {ReactComponent as HazardIcon} from "../../assets/icons/radiation-light.svg";
import {ReactComponent as SearchIcon} from '../../assets/icons/search-light.svg';
import {ReactComponent as CalendarIcon} from '../../assets/icons/calendar-alt-light.svg';
import {ReactComponent as ArrowIcon} from '../../assets/icons/arrow-right-regular.svg';

import styled from "styled-components";
import {Span, XL} from "@zendeskgarden/react-typography";
import {Field, Input, MediaInput} from "@zendeskgarden/react-forms";
import {Datepicker} from '@zendeskgarden/react-datepickers';
import {Dropdown, Field as DropdownField, Item, Menu, Select} from '@zendeskgarden/react-dropdowns';
import {Button} from "@zendeskgarden/react-buttons";
import {useHistory, useParams} from "react-router-dom";
import {DonorContext} from "../../context/donor.context";
import {CharityContext} from "../../context";
import {Charity} from "../../services/domain";
import {getDonationCode} from "../../utility/donation-code";
import moment from "moment";

interface IItem {
    label: string;
    value: string;
}

const items = [
    {label: '8 AM - 10 AM', value: '8 AM - 10 AM'},
    {label: '10AM - 12 PM', value: '10AM - 12 PM'},
    {label: '12 PM - 2 PM', value: '12 PM - 2 PM'},
    {label: '2 PM - 4 PM' , value: '2 PM - 4 PM'},
    {label: '4 PM - 6 PM', value: '4 PM - 6 PM'},
];

export const FlowContainer = () => {
    const params = useParams<{ charityId: string }>()
    const {donationData, setDonationData} = useContext(DonorContext)
    const {actions} = useContext(CharityContext)

    const history = useHistory();
    const [date, setDate] = useState(new Date());
    const [selectedItem, setSelectedItem] = useState(items[0]);

    const [charity, setCharity] = useState<Charity>()

    const {charityId} = params;

    useEffect(() => {
        updateDonation('date', date)
        updateDonation('formattedDate', moment(date).format('dddd MM/DD/yyyy'))
        updateDonation('timeSlot', selectedItem.label)
        actions.getCharity(charityId).then(setCharity);
    }, [])

    useEffect(() => {
        if (charity) {
            setDonationData({
                ...donationData,
                charityName: charity.charityName,
                charityId: charity.id,
                donationCode: getDonationCode(charity.state, charity.charityNumber)
            })
        }
    }, [charity])

    useEffect(() => {
        updateDonation('timeSlot', selectedItem.label)
    }, [selectedItem])

    useEffect(() => {
        updateDonation('date', date)
        updateDonation('formattedDate', moment(date).format('dddd MM/DD/yyyy'))
    }, [date])

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

    return <BaseContainer title={"ReSupply"} subtitle={"Giving made simple"}>
        <>
            <StyledRow>
                <Col xs={12}>
                    <Question>What would you like to donate to
                        {charity && (<Span isBold> {charity.charityName}</Span>)}
                    </Question>
                </Col>
                <Col xs={6}>
                    <DonationCategoryTileComponent
                        field={"largeItems"}
                        name={"Large items"}
                        onValueChanged={updateDonation}
                        icon={() => (<SofaIcon/>)}
                    />
                </Col>
                <Col xs={6}>
                    <DonationCategoryTileComponent
                        field={"smallItems"}
                        name={"Small items"}
                        onValueChanged={updateDonation}
                        icon={() => (<ChairIcon/>)}
                    />
                </Col>
                <Col xs={6}>
                    <DonationCategoryTileComponent
                        field={"bags"}
                        name={"Bags of clothes"}
                        onValueChanged={updateDonation}
                        icon={() => (<BagIcon/>)}
                    />
                </Col>
                <Col xs={6}>
                    <DonationCategoryTileComponent
                        field={"boxes"}
                        name={"Boxes"}
                        onValueChanged={updateDonation}
                        icon={() => (<BoxIcon/>)}
                    />
                </Col>
                <Col xs={6}>
                    <DonationCategoryTileComponent
                        field={"appliances"}
                        name={"Appliances"}
                        onValueChanged={updateDonation}
                        icon={() => (<FridgeIcon/>)}
                    />
                </Col>
                <Col xs={6}>
                    <DonationCategoryTileComponent
                        field={"hazardous"}
                        name={"Hazardous"}
                        onValueChanged={updateDonation}
                        icon={() => (<HazardIcon/>)}
                    />
                </Col>
            </StyledRow>
            <StyledRow>
                <Col>
                    <StyledField>
                        <Question>What is your address?</Question>
                        <MediaInput
                            onChange={fieldChanged}
                            start={<SearchIcon/>} name={"address"}/>
                    </StyledField>
                </Col>
            </StyledRow>
            <StyledRow>
                <Col>
                    <StyledField>
                        <Question>City</Question>
                        <Input onChange={fieldChanged} name={"city"}/>
                    </StyledField>
                </Col>
                <Col>
                    <StyledField>
                        <Question>State</Question>
                        <Input onChange={fieldChanged} name={"state"}/>
                    </StyledField>
                </Col>
                <Col>
                    <StyledField>
                        <Question>Zip</Question>
                        <Input onChange={fieldChanged} name={"zip"}/>
                    </StyledField>
                </Col>
            </StyledRow>
            <StyledRow>
                <Col>
                    <StyledField>
                        <Question>Pick a date</Question>
                        <Datepicker value={date} onChange={setDate}>
                            <MediaInput start={<CalendarIcon/>} name={"date"}/>
                        </Datepicker>
                    </StyledField>
                </Col>
                <Col>
                    <StyledField>
                        <Question>Arrival window</Question>
                        <Dropdown
                            selectedItem={selectedItem}
                            onSelect={setSelectedItem}
                            downshiftProps={{itemToString: (item: IItem) => item && item.label}}
                        >
                            <DropdownField>
                                <Select>{selectedItem.label}</Select>
                            </DropdownField>
                            <Menu>
                                {items.map(option => (
                                    <Item key={option.value} value={option}>
                                        {option.label}
                                    </Item>
                                ))}
                            </Menu>
                        </Dropdown>
                    </StyledField>
                </Col>
            </StyledRow>
            <StyledRow>
                <Col>
                    <StyledField>
                        <Question>What is your name?</Question>
                        <Input onChange={fieldChanged} name={"donorName"} placeholder={"Your first and last name"}/>
                    </StyledField>
                </Col>
            </StyledRow>
            <StyledRow>
                <Col>
                    <StyledField>
                        <Question>What is your phone number?</Question>
                        <Input onChange={fieldChanged} name={"phone"} placeholder={"Your phone number"}/>
                    </StyledField>
                </Col>
            </StyledRow>
            <StyledRow>
                <Col>
                    <StyledField>
                        <Question>What is your email?</Question>
                        <Input onChange={fieldChanged} type={"email"} name={"email"} placeholder={"Your email"}/>
                    </StyledField>
                </Col>
            </StyledRow>
            <StyledRow>
                <Col>
                    <StyledButton
                        onClick={() => {
                            history.push(`/${charityId}/additional-information`)
                        }}
                        isStretched>
                        Continue
                        <StyledArrowIcon/>
                    </StyledButton>
                </Col>
            </StyledRow>
        </>
    </BaseContainer>
}

const StyledArrowIcon = styled(ArrowIcon)`
  width: 30px;
  margin-left: 30px;
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
  font-size: 30px;
  height: 55px;
  border-width: 5px;
  background-color: rgba(255, 255, 255, 0.4);

  &:hover {
    opacity: 0.8;
    border-color: white;
    color: white;
  }
`
