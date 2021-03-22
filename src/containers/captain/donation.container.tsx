import React, {useContext, useEffect, useState} from 'react';
import {BaseContainer} from "../base.container";
import {Col, Row} from "@zendeskgarden/react-grid";
import {Title, Well} from '@zendeskgarden/react-notifications';
import {Anchor} from "@zendeskgarden/react-buttons";
import styled from "styled-components";
import {Body, Cell, GroupRow, Row as TRow, Table} from '@zendeskgarden/react-tables';

import {Tag} from '@zendeskgarden/react-tags';
import {MD, Paragraph} from "@zendeskgarden/react-typography";
import {CharityContext, DonationContext} from "../../context";
import {useParams} from "react-router-dom";
import {DonationStatusTreeComponent, EstimateComponent} from "../../components";

import { Tabs, TabList, Tab, TabPanel } from '@zendeskgarden/react-tabs';
import {PALETTE} from "@zendeskgarden/react-theming";
import {Donation} from "../../domain/Donation";
import {Charity} from "../../domain/Charity";

type Props = {};
export const DonationContainer = (props: Props) => {
    const params = useParams<{ id: string }>()

    const [selectedTab, setSelectedTab] = useState('tab-1');
    const [donation, setDonation] = useState<Donation>()
    const [charity, setCharity] = useState<Charity>()

    const donationContext = useContext(DonationContext)
    const charityContext = useContext(CharityContext)

    const {id} = params;

    useEffect(() => {
        donationContext.actions.getDonation(id).then(setDonation);
    }, [])

    useEffect(() => {
        if (donation) {
            charityContext.actions.getCharity(donation.charity?.id!).then(setCharity);
        }
    }, [donation])

    if (donation && charity) {
        return (
            <BaseContainer
                showBackButton
                title={`Request: ${donation.donationCode}`}
                subtitle={'Donation details'}>
                <Tabs selectedItem={selectedTab} onChange={setSelectedTab}>
                    <TabList>
                        <Tab item="tab-1">General</Tab>
                        <Tab item="tab-2">History</Tab>
                    </TabList>
                    <TabPanel item="tab-1">
                        <Row>
                            <Col xs={4}>
                                <Well>
                                    <StiledTitle>Donor info</StiledTitle>
                                    <Row>
                                        <Table>
                                            <Body>
                                                <TRowNoBorder isReadOnly>
                                                    <Cell><Paragraph>{donation.donor.name}</Paragraph></Cell>
                                                </TRowNoBorder>
                                                <TRowNoBorder isReadOnly>
                                                    <Cell>Phone number</Cell>
                                                    <Cell><Anchor
                                                        href={`tel:${donation.donor.phone}`}>{donation.donor.phone}</Anchor></Cell>
                                                </TRowNoBorder>
                                                <TRowNoBorder isReadOnly>
                                                    <Cell>Email</Cell>
                                                    <Cell><Anchor
                                                        href={`mailto:${donation.donor.email}`}>{donation.donor.email}</Anchor></Cell>
                                                </TRowNoBorder>
                                                <TRowNoBorder isReadOnly>
                                                    <Cell>Address</Cell>
                                                    <Cell>
                                                        <Row><Col>{donation.donor.address} {donation.donor.city}</Col></Row>
                                                        <Row><Col>{donation.donor.state} {donation.donor.zip}</Col></Row>
                                                    </Cell>
                                                </TRowNoBorder>
                                            </Body>
                                        </Table>
                                    </Row>
                                </Well>
                                <Well style={{marginTop: 10}}>
                                    <StiledTitle>Charity info</StiledTitle>
                                    <Row>
                                        <Table>
                                            <Body>
                                                <TRowNoBorder isReadOnly>
                                                    <Cell colSpan={2}><Paragraph>{charity.name}</Paragraph></Cell>
                                                </TRowNoBorder>
                                                <TRowNoBorder isReadOnly>
                                                    <Cell>Point of contact</Cell>
                                                    <Cell>{charity.pocName}</Cell>
                                                </TRowNoBorder>
                                                <TRowNoBorder isReadOnly>
                                                    <Cell>Phone number</Cell>
                                                    <Cell><Anchor
                                                        href={`tel:${charity.phone}`}>{charity.phone}</Anchor></Cell>
                                                </TRowNoBorder>
                                                <TRowNoBorder isReadOnly>
                                                    <Cell>Email</Cell>
                                                    <Cell><Anchor
                                                        href={`mailto:${charity.email}`}>{charity.email}</Anchor></Cell>
                                                </TRowNoBorder>
                                                <TRowNoBorder isReadOnly>
                                                    <Cell>Address</Cell>
                                                    <Cell>
                                                        <Row><Col>{charity.address} {charity.city}</Col></Row>
                                                        <Row><Col>{charity.state} {charity.zip}</Col></Row>
                                                    </Cell>
                                                </TRowNoBorder>
                                                <TRowNoBorder isReadOnly>
                                                    <Cell>Closing time</Cell>
                                                    <Cell>{charity.closingBy}</Cell>
                                                </TRowNoBorder>
                                                <TRowNoBorder isReadOnly>
                                                    <Cell>Notes</Cell>
                                                    <Cell>{charity.notes || 'No notes available for this charity'}</Cell>
                                                </TRowNoBorder>
                                            </Body>
                                        </Table>
                                    </Row>
                                </Well>
                            </Col>
                            <Col xs={4}>
                                <Well>
                                    <StiledTitle>Service request info</StiledTitle>
                                    <Row>
                                        <Table>
                                            <Body>
                                                <GroupRow>
                                                    <Cell>Donation items</Cell>
                                                    <Cell style={{textAlign: "right"}}>Quantity</Cell>
                                                </GroupRow>
                                                <TRow isReadOnly>
                                                    <Cell>Large items</Cell>
                                                    <Cell
                                                        style={{textAlign: "right"}}>{parseFloat((donation.spec.largeItems || 0) + "")}</Cell>
                                                </TRow>
                                                <TRow isReadOnly>
                                                    <Cell>Small items</Cell>
                                                    <Cell
                                                        style={{textAlign: "right"}}>{parseFloat((donation.spec.smallItems || 0) + "")}</Cell>
                                                </TRow>
                                                <TRow isReadOnly>
                                                    <Cell>Bags</Cell>
                                                    <Cell
                                                        style={{textAlign: "right"}}>{parseFloat((donation.spec.bags || 0) + "")}</Cell>
                                                </TRow>
                                                <TRow isReadOnly>
                                                    <Cell>Boxes</Cell>
                                                    <Cell
                                                        style={{textAlign: "right"}}>{parseFloat((donation.spec.boxes || 0) + "")}</Cell>
                                                </TRow>
                                                <TRow isReadOnly>
                                                    <Cell>Appliances</Cell>
                                                    <Cell
                                                        style={{textAlign: "right"}}>{parseFloat((donation.spec.appliances || 0) + "")}</Cell>
                                                </TRow>
                                                <TRow isReadOnly>
                                                    <Cell>Hazardous</Cell>
                                                    <Cell
                                                        style={{textAlign: "right"}}>{parseFloat((donation.spec.hazardous || 0) + "")}</Cell>
                                                </TRow>
                                            </Body>
                                        </Table>
                                    </Row>
                                    <TableCaption>Additional information</TableCaption>
                                    <Row>
                                        <Table>
                                            <Body>
                                                <TRow isReadOnly>
                                                    <Cell>Are items above or below the ground floor?</Cell>
                                                    <Cell style={{textAlign: "right"}}><TTag
                                                        value={donation.spec.aboveTheGroundFloor === 'no' ? 'No' : 'Yes'}/></Cell>
                                                </TRow>
                                                <TRow isReadOnly>
                                                    <Cell>Is elevator present?</Cell>
                                                    <Cell style={{textAlign: "right"}}><TTag
                                                        value={donation.spec.aboveTheGroundFloor === 'yes-elevator' ? 'Yes' : 'No'}/></Cell>
                                                </TRow>
                                                <TRow isReadOnly>
                                                    <Cell>Will client move items to ground floor?</Cell>
                                                    <Cell style={{textAlign: "right"}}><TTag
                                                        value={donation.spec.aboveTheGroundFloor === 'yes-curbside' ? 'Yes' : 'No'}/></Cell>
                                                </TRow>
                                                <TRow isReadOnly>
                                                    <Cell>How many staircases we will need to take?</Cell>
                                                    <Cell
                                                        style={{textAlign: "right"}}>{parseFloat(donation.spec.staircases + "")}</Cell>
                                                </TRow>
                                                <TRow isReadOnly>
                                                    <Cell>Disassembly required?</Cell>
                                                    <Cell style={{textAlign: "right"}}><TTag
                                                        value={donation.spec.disassembly > 0 ? 'Yes' : 'No'}/></Cell>
                                                </TRow>
                                                <TRow isReadOnly>
                                                    <Cell>How many items need disassembly?</Cell>
                                                    <Cell
                                                        style={{textAlign: "right"}}>{parseFloat(donation.spec.disassembly + "")}</Cell>
                                                </TRow>
                                            </Body>
                                        </Table>
                                    </Row>

                                    <TableCaption color={PALETTE.black}>Address</TableCaption>
                                    <Paragraph>{donation.donor.address} {donation.donor.city} <br/> {donation.donor.state} {donation.donor.zip}
                                    </Paragraph>
                                    <TableCaption>Special instructions</TableCaption>
                                    <Paragraph>
                                        {donation.spec.additionalInformation || 'No special instructions provided by the donor'}
                                    </Paragraph>
                                    <TableCaption>Initial estimate</TableCaption>
                                    <Row>
                                        <EstimateComponent donation={donation}/>
                                    </Row>
                                </Well>
                            </Col>
                            <Col xs={4}>
                                {donation.driver && (<Well style={{marginBottom: 10}}>
                                    <StiledTitle>Driver information</StiledTitle>
                                    <Row>
                                        <Table>
                                            <Body>
                                                <TRowNoBorder isReadOnly>
                                                    <Cell><Paragraph>{donation.driver.details?.name || 'Name is unavailable'}</Paragraph></Cell>
                                                </TRowNoBorder>
                                                <TRowNoBorder isReadOnly>
                                                    <Cell>Organization</Cell>
                                                    <Cell>{donation.driver.organization?.name}</Cell>
                                                </TRowNoBorder>
                                                <TRowNoBorder isReadOnly>
                                                    <Cell>Phone number</Cell>
                                                    <Cell><Anchor
                                                        href={`tel:${donation.driver.details?.phone}`}>{donation.driver.details?.phone}</Anchor></Cell>
                                                </TRowNoBorder>
                                            </Body>
                                        </Table>
                                    </Row>
                                </Well>)}
                                <Well>
                                    <StiledTitle>Service request status</StiledTitle>
                                    <DonationStatusTreeComponent donation={donation}/>
                                </Well>
                            </Col>
                        </Row>
                    </TabPanel>
                    <TabPanel item="tab-2">
                    </TabPanel>
                </Tabs>

            </BaseContainer>

        );
    } else {
        return <></>
    }
};

const StiledTitle = styled(Title)`
  margin-bottom: 20px;
`
const TRowNoBorder = styled(TRow)`
  border: none
`
const TableCaption = styled(MD)`
  margin: 30px 0 10px 0;
`
const TTag = (props: { value: string }) => (
    <Tag hue={props.value === 'Yes' ? 'green' : 'red'}>
        <span>{props.value}</span>
    </Tag>
)
