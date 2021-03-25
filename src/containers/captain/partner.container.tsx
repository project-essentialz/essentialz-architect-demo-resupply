import {BaseContainer} from "../base.container";
import React, {useContext, useEffect, useState} from "react";
import {PartnerContext} from "../../context";
import {useHistory, useParams} from "react-router-dom";
import {EntityRouteParams} from "../../types";
import {Tab, TabList, TabPanel, Tabs} from "@zendeskgarden/react-tabs";
import {extraButton} from "../../utility/extraButton";
import {navigationRoutes} from "../../utility/navigationRoutes";
import {Col, Row} from "@zendeskgarden/react-grid";
import {Field, Label} from "@zendeskgarden/react-forms";
import {Paragraph} from "@zendeskgarden/react-typography";
import styled from "styled-components";
import {Well} from "@zendeskgarden/react-notifications";
import {Button} from "@zendeskgarden/react-buttons";
import {DriverCreationModal} from "../../components/driver-creation-modal.c";
import {TableComponent} from "../../components";
import {field} from "../../utility/field";
import Api from "../../services/api.service";
import {routes} from "../../services/api.routes";
import {Schedule} from "../../domain/Schedule";

export const PartnerContainer = () => {
    const [selectedTab, setSelectedTab] = useState('general')
    const [driverModalVisible, setDriverModalVisible] = useState<boolean>(false);

    const {partner, actions} = useContext(PartnerContext)
    const history = useHistory()
    const {id} = useParams<EntityRouteParams>()


    useEffect(() => {
        if (id) {
            actions.getPartner(id).then((result) => {
                console.log(result);
            }) ;
        }
    }, [id])

    // useEffect(() => {
    //     if (partner.id){
    //         partner.drivers.forEach((driver) => {
    //             Api.$<Schedule>(routes.schedules).create({}).then(result => {
    //                 driver.scheduleId = result.id
    //             })
    //         })
    //         setTimeout(() => {
    //             console.log(partner);
    //             actions.updatePartner(partner);
    //         }, 5000);
    //     }
    // }, [partner])

    const extraButtons = [
        extraButton("Edit 3PL", () => history.push(navigationRoutes.editTPL(partner))),
        extraButton("Add a driver", () => openAddDriverModal())
    ]

    const openZoneDetails = () => history.push(navigationRoutes.zoneDetails(partner.zone!))
    const openAddDriverModal = () => {
        setDriverModalVisible(true)
    }
    const closeAddDriverModal = () => {
        setDriverModalVisible(false)
    }

    const fields = [
        field('name', 'Name'),
        field('user.username', 'Username'),
        field('email', 'Email'),
        field('phone', 'Phone'),
        field('jobsCompleted', 'Jobs completed'),
        field('rating', 'Star rating'),
    ]

    return partner ? (
        <BaseContainer
            showBackButton
            title={`${partner.name}`}
            extraButtons={extraButtons}
            subtitle={`Showing profile information for ${partner.name}`}
        >
            <Tabs selectedItem={selectedTab} onChange={setSelectedTab}>
                <TabList>
                    <Tab item="general">General</Tab>
                    <Tab item="tab-2">Service Requests</Tab>
                    <Tab item="drivers">Driver management</Tab>
                </TabList>

                <TabPanel item="general">
                    <Row>
                        <Col xs={5}>
                            <Well>
                                {infoField(partner.name!, "Name")}
                                {infoField(partner.phone, "Phone")}
                                {infoField(partner.accountManagerName!, "Account manager")}
                                {infoField(partner.email, "Email")}
                                {partner.zone && (
                                    <StyledField>
                                        <StyledButtonWrapper>
                                            <div>
                                                <Label>Zone</Label>
                                                <Paragraph>{partner.zone.name}</Paragraph>
                                            </div>
                                            <Button size={"small"} onClick={openZoneDetails}>
                                                View assigned zone
                                            </Button>
                                        </StyledButtonWrapper>
                                    </StyledField>
                                )}
                            </Well>
                        </Col>
                    </Row>
                </TabPanel>
                <TabPanel item="tab-2">
                </TabPanel>
                <TabPanel item="drivers">
                    <TableComponent fields={fields} onRowClicked={() => {}} data={partner.drivers}/>
                </TabPanel>
            </Tabs>
            {driverModalVisible && (
                <DriverCreationModal
                    partner={partner}
                    onClose={closeAddDriverModal}
                />
            )}

        </BaseContainer>
    ) : (<></>)
}


const infoField = (value: string, display: string) => (
    <StyledField>
        <Label>{display}</Label>
        <Paragraph>{value}</Paragraph>
    </StyledField>
)

const StyledField = styled(Field)`
  margin-bottom: 15px;
`
const StyledButtonWrapper = styled(StyledField)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`

