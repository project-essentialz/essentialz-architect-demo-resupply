import React, {ChangeEvent, useContext, useEffect, useState} from "react";
import {BaseContainer} from "../base.container";
import {Well} from "@zendeskgarden/react-notifications";
import {Col, Row} from "@zendeskgarden/react-grid";
import styled from "styled-components";
import {Field, Label} from "@zendeskgarden/react-forms";
import {LG} from "@zendeskgarden/react-typography";
import {
    Dropdown,
    Field as DropdownField,
    Item,
    Label as DropdownLabel,
    Menu,
    Select
} from '@zendeskgarden/react-dropdowns';
import _ from 'lodash'
import {Charity, Donation} from "../../domain";
import {Button} from "@zendeskgarden/react-buttons";
import {FormField} from "../../components/form-field.c";
import {CounterItem} from "../../components/counter-item.c";
import {DatePicker} from "../../components/date-picker.c";
import {CharityContext, DonationContext} from "../../context";
import {AutocompleteField} from "../../components/auto-complete-field";
import {useHistory} from "react-router-dom";

const items = [
    {label: '08 am - 10 am', value: '08 am - 10 am'},
    {label: '10 am - 12 pm', value: '10 am - 12 pm'},
    {label: '12 pm - 02 pm', value: '12 pm - 02 pm'},
    {label: '02 pm - 04 pm', value: '02 pm - 04 pm'},
    {label: '04 pm - 06 pm', value: '04 pm - 06 pm'}
];

export const CreateDonationContainer = () => {
    const {charities} = useContext(CharityContext);
    const {actions, donation, setDonation} = useContext(DonationContext);
    const [selectedItem, setSelectedItem] = useState(items[0]);
    const history = useHistory();

    useEffect(() => {
        console.log(donation);
    }, [donation])


    const updateField = (field: string, value: any) => {
        const d = new Donation();
        Object.assign(d, donation);
        _.set(d, field, value);
        setDonation(d);
    }
    const updateFormField = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const {name, value} = e.target;
        updateField(name, value);
    }
    const updateEstimate = (field: string, count: number) => {
        updateField(`spec.${field}`, count);
    }

    const goBack = () => history.goBack();
    const resolveCharityName = (c: Charity) => c ? c.name : 'No charity specified';
    const updateCharityField = (c: Charity) => updateField('charity', c)
    const createDonation = () => actions.createDonation(donation).then(goBack);

    return (
        <BaseContainer
            showBackButton
            title={"Create donation"}
            subtitle={'Manual donation entry'}>
            <Row>
                <Col md={7}>
                    <Well>
                        <FormTitle>Donor information</FormTitle>
                        <FormField label={'Name'} name={'donor.name'} onChange={updateFormField}/>
                        <FormField label={'Address'} name={'donor.address'} onChange={updateFormField}/>

                        <Row>
                            <Col>
                                <FormField label={'City'} name={'donor.city'} onChange={updateFormField}/>
                            </Col>
                            <Col>
                                <FormField label={'State'} name={'donor.state'} onChange={updateFormField}/>
                            </Col>
                            <Col>
                                <FormField label={'Zip'} name={'donor.zip'} onChange={updateFormField}/>
                            </Col>
                        </Row>

                        <FormField label={'Email'} name={'donor.email'} onChange={updateFormField}/>
                        <FormField label={'Phone number'} name={'donor.phone'} mask={'+19999999999'}
                                   onChange={updateFormField}/>

                        <FormTitle>Schedule the donation</FormTitle>
                        <Row>
                            <Col>
                                <Label>Date</Label>
                                <DatePicker
                                    value={donation.date}
                                    name={'date'}
                                    onChange={updateField}
                                />
                            </Col>
                            <Col>
                                <Dropdown
                                    selectedItem={selectedItem}
                                    onSelect={setSelectedItem}
                                    downshiftProps={{itemToString: (item: any) => item && item.label}}
                                >
                                    <DropdownField>
                                        <DropdownLabel>Time slot</DropdownLabel>
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
                            </Col>
                        </Row>
                    </Well>
                </Col>

                <Col md={5}>
                    <Well>
                        <AutocompleteField
                            label={"Pick a charity"}
                            options={charities}
                            valueResolver={resolveCharityName}
                            onValueSelected={updateCharityField}
                        />
                        <FormTitle>Create the estimate</FormTitle>

                        <CounterItem title={"Large items"} field={'largeItems'} onChange={updateEstimate}/>
                        <CounterItem title={"Small items"} field={'smallItems'} onChange={updateEstimate}/>
                        <CounterItem title={"Boxes items"} field={'boxes'} onChange={updateEstimate}/>
                        <CounterItem title={"Bags items"} field={'bags'} onChange={updateEstimate}/>
                        <CounterItem title={"Appliances"} field={'appliances'} onChange={updateEstimate}/>
                        <CounterItem title={"Staircases"} field={'staircases'} onChange={updateEstimate}/>
                        <CounterItem title={"Disassembly"} field={'disassembly'} onChange={updateEstimate}/>
                        <CounterItem title={"Hazardous items"} field={'hazardous'} onChange={updateEstimate}/>

                        <hr/>
                        <FormTitle>Estimated cost ${Donation.getEstimate(donation.spec)}</FormTitle>

                        <StyledButtonWrapper>
                            <Button isStretched onClick={createDonation}>Create donation</Button>
                        </StyledButtonWrapper>

                    </Well>
                </Col>
            </Row>
        </BaseContainer>
    )
}

const StyledField = styled(Field)`
  margin-bottom: 15px;
`

const FormTitle = styled(LG)`
  margin-bottom: 10px;
  margin-top: 40px;

  &:first-of-type {
    margin-top: 0;
  }
`

const StyledButtonWrapper = styled(StyledField)`
  margin-top: 15px;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
`

