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
import {LG, XL} from "@zendeskgarden/react-typography";
import {AutocompleteField} from "../../components/auto-complete-field";

import Api from "../../services/api.service";
import {routes} from "../../services/api.routes";
import {DonationAssignmentWidget} from "../../components/donation-assignmment-widget.c";
import {DriverScheduleWidget} from "../../components/driver-schedule-widget.c";
import {DriverProfileWidget} from "../../components/driver-profile-widget.c";
import {DonationStatus} from "../../domain/Donation";
import {DonationDateWidget} from "../../components/donation-date-widget.c";

export const DonationContainer = () => {
    const [selectedTab, setSelectedTab] = useState('general');
    const {id} = useParams<EntityRouteParams>()
    const {donation, actions} = useContext(DonationContext)
    const partnerContext = useContext(PartnerContext)

    const {partners} = partnerContext;

    const [selectedPartner, setSelectedPartner] = useState<TPLOrganization>()
    const [selectedPartnerResolved, setSelectedPartnerResolved] = useState<TPLOrganization>()
    const [selectedDriver, setSelectedDriver] = useState<Driver>()
    const [selectedPartOfDay, setSelectedPartOfDay] = useState('')

    useEffect(() => {
        if (id) {
            actions.getDonation(id);
        }
    }, [id])

    useEffect(() => {
        if (selectedPartner) {
            partnerContext.actions.getPartner(selectedPartner.id!).then(partner => {
                setSelectedPartnerResolved(partner);
            })
        }
    }, [selectedPartner])

    const resolvePartnerName = (p: TPLOrganization) => p ? p.name : ''
    const resolveDriverName = (d: Driver) => d ? d.name : ''
    const availableDrivers = (p?: TPLOrganization) => p ? p.getAvailableDrivers(donation.date!.replaceAll("-", 'X')) : []
    const getDriverAvailability = (d: Driver) => {
    }

    const assignDriver = (slot: string) => {
        //Todo: Change this and move it to Provider
        const schedule = selectedDriver!.schedule;
        const date = donation.date!.replaceAll("-", 'X')
        const selectedDateSchedule = schedule[date] || {};

        Api.$(routes.schedules).update(schedule.id, {
            ...schedule,
            [date]: {
                ...selectedDateSchedule,
                [slot]: donation
            }
        }).then(result => {
            donation.timeSlot = slot;
            donation.tplOrganization = selectedPartner;
            donation.driver = selectedDriver;
            donation.donationStatus = DonationStatus.driver_assigned
            donation.eventType = `donation_${DonationStatus.driver_assigned}`
            actions.updateDonation(donation).then(() => {
                actions.getDonation(donation.id!);
            })
        })
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
                            <DonationDateWidget donation={donation} spacing={0}/>
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
                                <DonationAssignmentWidget donation={donation} title={"Summary"}/>
                            </Col>
                            <Col>
                                <DriverProfileWidget driver={donation.driver}/>
                            </Col>
                            <Col>
                                <DriverScheduleWidget
                                    readonly
                                    donation={donation}

                                    onSlotPicked={() => {
                                    }}/>
                            </Col>
                        </Row>
                    ) : (
                        <Row>
                            <Col xs={5}>
                                <Well>
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
                                        options={availableDrivers(selectedPartnerResolved)}
                                        valueResolver={resolveDriverName}
                                        onValueSelected={setSelectedDriver}
                                    />
                                    <Space size={10}/>
                                    {selectedDriver && (
                                        <DriverScheduleWidget
                                            title={"Pick a slot"}
                                            isStandalone={false}
                                            driver={selectedDriver}
                                            onSlotPicked={assignDriver}
                                            donation={donation}/>
                                    )}
                                    <Space size={10}/>
                                </Well>
                                <Space size={50}/>
                            </Col>
                            <Col xs={6}>
                                <XL>Keep in mind</XL>
                                <DonationDateWidget donation={donation}/>
                                <CharityWidget charity={donation.charity!}/>
                            </Col>
                        </Row>

                    )}

                </TabPanel>
            </Tabs>

        </BaseContainer>

    ) : (<></>)
};
