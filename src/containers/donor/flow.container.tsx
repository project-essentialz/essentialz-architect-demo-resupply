import React, {useContext, useEffect, useState} from "react";
import {BaseContainer} from "./base.container";
import {DonationCategoryTileComponent, Space} from "../../components";
import {Col, Row} from "@zendeskgarden/react-grid";

import {ReactComponent as SofaIcon} from "../../assets/icons/couch-light.svg";
import {ReactComponent as ChairIcon} from "../../assets/icons/chair-light.svg";
import {ReactComponent as BoxIcon} from "../../assets/icons/box-light.svg";
import {ReactComponent as BagIcon} from "../../assets/icons/sack-light.svg";
import {ReactComponent as StairsIcon} from "../../assets/icons/walking-light.svg";
import {ReactComponent as ToolsIcon} from "../../assets/icons/tools-light.svg";
import {ReactComponent as CalendarIcon} from '../../assets/icons/calendar-alt-light.svg';

import styled from "styled-components";
import {MD, Paragraph, SM, Span, XL} from "@zendeskgarden/react-typography";
import {Field, MediaInput} from "@zendeskgarden/react-forms";
import {Dropdown, Field as DropdownField, Item, Menu, Select} from '@zendeskgarden/react-dropdowns';
import {Button} from "@zendeskgarden/react-buttons";
import {useHistory, useParams} from "react-router-dom";
import {DonorContext} from "../../context/donor.context";
import {CharityContext} from "../../context";
import moment from "moment";
import {PALETTE} from "@zendeskgarden/react-theming";
import {Well} from "@zendeskgarden/react-notifications";
import {getDonationCode} from "../../utility/donation-code";
import _ from "lodash";
import {Donation} from "../../domain";
import {DatePicker} from "../../components/date-picker.c";

interface IItem {
    label: string;
    value: string;
}

const items = [
    {label: 'No preference', value: ''},
    {label: 'AM', value: 'am'},
    {label: 'PM', value: 'pm'},
];

export const FlowContainer = () => {
    const params = useParams<{ charityId: string }>()

    const {donationData, setDonationData} = useContext(DonorContext)
    const {charity, actions} = useContext(CharityContext)

    const history = useHistory();
    const [selectedItem, setSelectedItem] = useState(items[0]);

    const {charityId} = params;

    useEffect(() => {
        updateDonation('timeSlot', selectedItem.label)
        actions.getCharity(charityId);
    }, [])

    useEffect(() => {
        if (charity) {
            donationData.charity = charity;
            donationData.donationCode = getDonationCode(charity.state, charity.code)
            setDonationData(donationData);
        }
    }, [charity])

    useEffect(() => {
        updateDonation('partOfDay', selectedItem.value)
    }, [selectedItem])

    const updateDonation = (key: string, value: any) => {
        const d = new Donation();
        Object.assign(d, donationData);
        _.set(d, key, value)
        setDonationData(d);
    }

    useEffect(() => {
        console.log(donationData.date);
    }, [donationData])

    return <BaseContainer title={"Tell us about your donation"} subtitle={"If you have any questions visit our FAQ section."}>
        <ContentWrapper>
            <StyledRow>
                <Col xs={12}>
                    <Question>
                        {charity && (<Span isBold> {charity.name}</Span>)}
                    </Question>
                </Col>
                <Col xs={6} sm={4}>
                    <DonationCategoryTileComponent
                        field={"spec.largeItems"}
                        name={"Large items"}
                        description={'2-person lift'}
                        onValueChanged={updateDonation}
                        icon={() => (<SofaIcon/>)}
                    />
                </Col>
                <Col xs={6} sm={4}>
                    <DonationCategoryTileComponent
                        field={"spec.smallItems"}
                        name={"Small items"}
                        description={'1-person lift'}
                        onValueChanged={updateDonation}
                        icon={() => (<ChairIcon/>)}
                    />
                </Col>
                <Col xs={6} sm={4}>
                    <DonationCategoryTileComponent
                        field={"spec.bags"}
                        name={"Bags of clothes"}
                        description={'1-person lift'}
                        onValueChanged={updateDonation}
                        icon={() => (<BagIcon/>)}
                    />
                </Col>
                <Col xs={6} sm={4}>
                    <DonationCategoryTileComponent
                        field={"spec.boxes"}
                        name={"Boxes"}
                        description={'1-person lift'}
                        onValueChanged={updateDonation}
                        icon={() => (<BoxIcon/>)}
                    />
                </Col>
                <Col xs={6} sm={4}>
                    <DonationCategoryTileComponent
                        field={"spec.staircases"}
                        name={"Stair cases"}
                        description={'If no elevator'}
                        onValueChanged={updateDonation}
                        icon={() => (<StairsIcon/>)}
                    />
                </Col>
                <Col xs={6} sm={4}>
                    <DonationCategoryTileComponent
                        field={"spec.disassembly"}
                        name={"Disassembly"}
                        description={'Requiring tooling'}
                        onValueChanged={updateDonation}
                        icon={() => (<ToolsIcon/>)}
                    />
                </Col>
            </StyledRow>

            <Line/>
            <StyledRow>
                <Col>
                    <XL>Schedule your Priority Pick-up</XL>
                    <Paragraph>Choose the day and time slot of your pick-up!</Paragraph>
                </Col>
            </StyledRow>

            <StyledRow>
                <Col xs={12}>
                    <Row>
                        <Col sm={8} offsetSm={2}>
                            <Row>
                                <Col>
                                    <StyledField>
                                        <MD>Pick a date</MD>
                                        <DatePicker
                                            value={donationData.date}
                                            name="date"
                                            minValue={moment(new Date()).add(2, 'd').toDate()}
                                            onChange={updateDonation}
                                        />
                                    </StyledField>
                                </Col>
                                <Col>
                                    <StyledField>
                                        <MD>Arrival window</MD>
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
                            </Row>
                        </Col>
                    </Row>
                </Col>

                <Col sm={6} offsetSm={3}>
                    <Row style={{textAlign: 'center'}}>
                        <Col>
                            <SM style={{color: PALETTE.grey["500"]}}>
                                Your exact 4 hour time window will be sent to you via email or text once a driver is
                                assigned
                            </SM>
                        </Col>
                    </Row>
                </Col>
            </StyledRow>

            <Line/>

            <StyledRow>
                <Col sm={6} offsetSm={3}>
                    <Well>
                        <XL>Total: <Span>${Donation.getEstimate(donationData.spec)}</Span></XL>
                    </Well>
                </Col>
            </StyledRow>

            <Line/>

            <Space size={30}/>

            <StyledRow>
                <Col>
                    <StyledButton
                        onClick={() => {
                            history.push(`/${charityId}/additional-information`)
                        }}
                        isStretched>
                        Continue
                    </StyledButton>
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
