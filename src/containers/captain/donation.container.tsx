import React, {useContext, useEffect, useState} from 'react';
import {BaseContainer} from "../base.container";
import {Col, Row} from "@zendeskgarden/react-grid";
import {DonationContext, PartnerContext} from "../../context";
import {useParams} from "react-router-dom";
import {CharityWidget, DonationSpecWidget, DonorWidget, Space} from "../../components";

import {Tab, TabList, TabPanel, Tabs} from '@zendeskgarden/react-tabs';
import {Driver, TPLOrganization} from "../../domain";
import {DonationAddressWidget} from "../../components/donation-address-widget.c";
import {EstimateWidget} from "../../components/estimate-widget.c";
import {ServiceRequestTreeWidget} from "../../components/service-request-tree-widget.c";
import {EntityRouteParams} from "../../types";
import {Well} from '@zendeskgarden/react-notifications';
import {Button} from "@zendeskgarden/react-buttons";
import {LG} from "@zendeskgarden/react-typography";
import {AutocompleteField} from "../../components/auto-complete-field";

export const DonationContainer = () => {
    const [selectedTab, setSelectedTab] = useState('general');
    const {id} = useParams<EntityRouteParams>()
    const {donation, actions} = useContext(DonationContext)
    const {partners} = useContext(PartnerContext)

    const [selectedPartner, setSelectedPartner] = useState<TPLOrganization>()
    const [selectedDriver, setSelectedDriver] = useState<Driver>()

    useEffect(() => {
        if (id) {
            actions.getDonation(id);
        }
    }, [id])

    useEffect(() => {
        console.log(selectedPartner);
    }, [selectedPartner])

    const resolvePartnerName = (p: TPLOrganization) => p ? p.name : ''
    const resolveDriverName = (d: Driver) => d ? d.name : ''
    const availableDrivers = (p?: TPLOrganization) => p ? p.drivers : []

    const assignDriver = () =>{

    }

    return (donation && donation.primaryDropOff) ? (
        <BaseContainer
            showBackButton
            title={`Request: ${donation.donationCode}`}
            subtitle={'Donation details'}>
            <Tabs selectedItem={selectedTab} onChange={setSelectedTab}>
                <TabList>
                    <Tab item="general">General</Tab>
                    <Tab item="driver">Driver</Tab>
                    <Tab item="history">History</Tab>
                </TabList>
                <TabPanel item="general">
                    <Row>
                        <Col xs={4}>
                            <DonorWidget donor={donation.donor} spacing={0}/>
                            <CharityWidget charity={donation.primaryDropOff} spacing={10}/>
                        </Col>
                        <Col xs={4}>
                            <DonationAddressWidget donation={donation} spacing={0}/>
                            <DonationSpecWidget spec={donation.spec} spacing={10}/>
                        </Col>
                        <Col xs={4}>
                            <EstimateWidget spec={donation.spec} spacing={0}/>
                            <ServiceRequestTreeWidget donation={donation} spacing={10}/>
                        </Col>
                    </Row>
                </TabPanel>
                <TabPanel item="driver">
                    {donation.driver ? (
                        <Row>
                            <Col>
                                <Well>
                                </Well>
                            </Col>
                            <Col>
                                <Well></Well>
                            </Col>
                            <Col>
                                <Well></Well>
                            </Col>
                        </Row>
                    ) : (
                        <Row>
                            <Col xs={6}>
                                <LG>No driver has been assigned</LG>
                                <Space size={10}/>
                                <AutocompleteField
                                    label={"3PL"}
                                    options={partners}
                                    valueResolver={resolvePartnerName}
                                    onValueSelected={setSelectedPartner}
                                />
                                <Space size={10}/>
                                <AutocompleteField
                                    label={"Driver"}
                                    options={availableDrivers(selectedPartner)}
                                    valueResolver={resolveDriverName}
                                    onValueSelected={setSelectedDriver}
                                />
                                <Space size={10}/>
                                <Button
                                    disabled={!selectedDriver}
                                    onClick={assignDriver}
                                >
                                    Assign a driver
                                </Button>
                            </Col>
                        </Row>
                    )}
                </TabPanel>
            </Tabs>

        </BaseContainer>

    ) : (<></>)
};
