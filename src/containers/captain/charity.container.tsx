import {BaseContainer} from "../base.container";
import {Field, Input, Label} from "@zendeskgarden/react-forms";
import React, {ChangeEvent, useContext, useEffect, useState} from "react";
import styled from "styled-components";
import {LG, Paragraph} from "@zendeskgarden/react-typography";
import {useHistory, useParams} from "react-router-dom";
import {CharityContext, DonationContext} from "../../context";

import {field} from "../../utility/field";
import {Tab, TabList, TabPanel, Tabs} from "@zendeskgarden/react-tabs";
import {Col, Row} from "@zendeskgarden/react-grid";
import {Well} from "@zendeskgarden/react-notifications";
import {Space, TableComponent} from "../../components";
import {Body, Close, Footer, FooterItem, Header, Modal} from "@zendeskgarden/react-modals";
import {Button} from "@zendeskgarden/react-buttons";
import {Charity, CharityAdmin, Donation} from "../../domain";
import {navigationRoutes} from "../../utility/navigationRoutes";

const fields = [
    field('donationCode', 'Donation ID'),
    field('donorName', 'Donor name'),
    field('phone', 'phone'),
    field('donationStatus', 'Status')
]

const usersFields = [
    field('details.name', 'Name'),
    field('username', 'Username'),
    field('role', 'Role'),
]

export const CharityContainer = () => {
    const [visible, setVisible] = useState(false);
    const [selectedTab, setSelectedTab] = useState('tab-1');

    const [charityAdmin, setCharityAdmin] = useState<CharityAdmin>( new CharityAdmin())

    const history = useHistory()
    const params = useParams<{ id: string }>();

    const {donations} = useContext(DonationContext)
    const donationsActions = useContext(DonationContext).actions;
    const {charity, setCharity, actions} = useContext(CharityContext)

    const {id} = params;

    useEffect(() => {
        actions.getCharity(id)
        donationsActions.getAllDonations(`charity_id=${id}`)
    }, [id])

    useEffect(() => {
        console.log(charity);
    }, [charity])
    const extraButtons = [
        {
            title: "Edit charity",
            onClick: () => {
                history.push(`/edit-charity/${charity.id}`)
            }
        },
        {
            title: "Delete charity",
            onClick: () => {
                setVisible(true);
            }
        }
    ]

    const submitUser = () => {
        // actions.addUser(user).then(_ => {
        //     actions.getUsers().then(setUsers)
        // })
    }

    const updateField = () => {

    }

    const openDonationDetails = (donation: Donation) => history.push(navigationRoutes.donationDetails(donation))
    const openSecondaryDropOffDetails = () => history.push(navigationRoutes.charityDetails(charity.secondaryDropOff!))

    const renderCharityInfo = (charity: Charity, title: string) => (
        <Well>
            <FormTitle>{title}</FormTitle>
            {infoField(charity.code, "Charity ID / Code")}
            {infoField(charity.name!, "Charity name")}
            {infoField(charity.address!, "Address")}
            <Row>
                <Col>
                    {infoField(charity.city!, "City")}
                </Col>
                <Col>
                    {infoField(charity.state!, "State")}
                </Col>
                <Col>
                    {infoField(charity.zip!, "Zip")}
                </Col>
            </Row>
            <StyledField>
                <Label>Working days</Label>
                <Paragraph>Mon
                    - {charity.daysOfOperation.mon ? 'OPEN' : 'CLOSED'}</Paragraph>
                <Paragraph>Tue
                    - {charity.daysOfOperation.tue ? 'OPEN' : 'CLOSED'}</Paragraph>
                <Paragraph>Wed
                    - {charity.daysOfOperation.wed ? 'OPEN' : 'CLOSED'}</Paragraph>
                <Paragraph>Thu
                    - {charity.daysOfOperation.thu ? 'OPEN' : 'CLOSED'}</Paragraph>
                <Paragraph>Fri
                    - {charity.daysOfOperation.fri ? 'OPEN' : 'CLOSED'}</Paragraph>
                <Paragraph>Sat
                    - {charity.daysOfOperation.sat ? 'OPEN' : 'CLOSED'}</Paragraph>
                <Paragraph>Sun
                    - {charity.daysOfOperation.sun ? 'OPEN' : 'CLOSED'}</Paragraph>
            </StyledField>

            {infoField(charity.closingBy!, "Closing by")}
            {infoField(charity.salesforceId!, "Salesforce ID")}
            {infoField(charity.notes, "Notes")}
            {charity.secondaryDropOff && (
                <StyledField>
                    <Label>Secondary drop-off</Label>
                    <Paragraph>{charity.secondaryDropOff.name}</Paragraph>
                    <StyledButtonWrapper>
                        <Button onClick={openSecondaryDropOffDetails}>
                            View assigned charity
                        </Button>
                    </StyledButtonWrapper>
                </StyledField>
            )}
        </Well>
    )

    // Render
    return charity ? (
        <BaseContainer showBackButton title={charity.name!} subtitle={"Charity details"}
                       extraButtons={extraButtons}>

            <Tabs selectedItem={selectedTab} onChange={setSelectedTab}>
                <TabList>
                    <Tab item="tab-1">General</Tab>
                    <Tab item="tab-2">Donations</Tab>
                    <Tab item="tab-3">User management</Tab>
                </TabList>
                <TabPanel item="tab-1">
                    <>
                        <Row>
                            <Col xs={5}>
                                {renderCharityInfo(charity, "Basic information")}
                            </Col>
                        </Row>

                        {visible && (
                            <Modal onClose={() => setVisible(false)}>
                                <Header isDanger>Are you sure you want to delete this charity? </Header>
                                <Body>
                                    This action is not reversible. Please make sure you want to remove this charity
                                    record from your database.
                                </Body>
                                <Footer>
                                    <FooterItem>
                                        <Button onClick={() => setVisible(false)} isBasic>
                                            Cancel
                                        </Button>
                                    </FooterItem>
                                    <FooterItem>
                                        <Button isPrimary isDanger onClick={() => {
                                            actions.removeCharity(charity.id!)
                                                .then(r => {
                                                    setVisible(false)
                                                    history.goBack()
                                                })
                                        }}>Remove charity
                                        </Button>
                                    </FooterItem>
                                </Footer>
                                <Close aria-label="Close modal"/>
                            </Modal>
                        )}
                    </>
                </TabPanel>
                <TabPanel item="tab-2">
                    <Row>
                        <Col>
                            <Well>
                                <FormTitle>Donations</FormTitle>
                                <TableComponent fields={fields} onRowClicked={openDonationDetails}
                                                data={donations}/>
                            </Well>
                        </Col>
                    </Row>
                </TabPanel>
                <TabPanel item="tab-3">
                    <Row>
                        <Col md={4}>
                            <Well>
                                <FormTitle>User information</FormTitle>
                                <StyledField>
                                    <Label>Name</Label>
                                    <Input value={charityAdmin?.name} name={"name"}
                                           onChange={updateField}/>
                                </StyledField>
                                <StyledField>
                                    <Label>Email</Label>
                                    <Input value={charityAdmin.user.username} name={"username"} onChange={updateField}/>
                                </StyledField>
                                <StyledField>
                                    <Label>Password</Label>
                                    <Input type='password' name={"password"} onChange={updateField}/>
                                </StyledField>

                                <StyledButtonWrapper>
                                    <Button onClick={submitUser}>Add new user</Button>
                                </StyledButtonWrapper>
                            </Well>
                        </Col>
                        <Col>
                            <Well>
                                <TableComponent fields={usersFields} onRowClicked={() => {
                                }} data={charity.charityAdmins}/>
                            </Well>
                        </Col>
                    </Row>
                </TabPanel>
            </Tabs>

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

const FormTitle = styled(LG)`
  margin-bottom: 10px;
  margin-top: 40px;

  &:first-of-type {
    margin-top: 0;
  }
`

const StyledButtonWrapper = styled(StyledField)`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
`

