import {BaseContainer} from "../base.container";
import {Field, Input, Label} from "@zendeskgarden/react-forms";
import React, {ChangeEvent, useContext, useEffect, useState} from "react";
import styled from "styled-components";
import {LG, Paragraph} from "@zendeskgarden/react-typography";
import {useHistory, useParams} from "react-router-dom";
import {CharityContext, DonationContext} from "../../context";
import {Donation, User} from "../../services/domain";
import {field} from "../../utility/field";
import {Tab, TabList, TabPanel, Tabs} from "@zendeskgarden/react-tabs";
import {Col, Row} from "@zendeskgarden/react-grid";
import {Well} from "@zendeskgarden/react-notifications";
import {TableComponent} from "../../components";
import {Body, Close, Footer, FooterItem, Header, Modal} from "@zendeskgarden/react-modals";
import {Button} from "@zendeskgarden/react-buttons";

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
    const [users, setUsers] = useState<User[]>([])
    const [user, setUser] = useState<User>({} as User)

    const history = useHistory()
    const params = useParams<{ id: string }>();

    const {actions} = useContext(CharityContext)
    const donationsActions = useContext(DonationContext).actions;
    const {donations} = useContext(DonationContext)

    const {id} = params;

    const {charity, setCharity} = useContext(CharityContext)

    useEffect(() => {
        actions.getCharity(id).then(setCharity)
        donationsActions.getAllDonations(`charity_id=${id}`)
    }, [])

    useEffect(() => {
        if (charity.id) {
            actions.getUsers().then(setUsers);
        }
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

    const updateField = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const {value, name} = e.target;
        if (name === 'name') {
            setUser({
                ...user,
                details: {
                    ...user.details,
                    name: value
                }
            })
        } else {
            setUser({
                ...user,
                [name]: value
            })
        }
    }
    const submitUser = () => {
        actions.addUser(user).then(_ => {
            actions.getUsers().then(setUsers)
        })
    }

    const openDonationDetails = (donation: Donation) => {
        history.push(`/donations/${donation.id}`)
    }
    if (charity.id) {
        return (
            <BaseContainer showBackButton title={charity.charityName} subtitle={"Charity details"}
                           extraButtons={extraButtons}>

                <Tabs selectedItem={selectedTab} onChange={setSelectedTab}>
                    <TabList>
                        <Tab item="tab-1">General</Tab>
                        <Tab item="tab-2">User management</Tab>
                    </TabList>
                    <TabPanel item="tab-1">
                        <>
                            <Row>
                                <Col xs={12} xl={4}>
                                    <Well>
                                        <FormTitle>Basic information</FormTitle>
                                        {infoField(charity.charityName, "Charity name")}
                                        {infoField(charity.id, "Charity ID")}
                                        {infoField(charity.address, "Address")}
                                        <Row>
                                            <Col>
                                                {infoField(charity.city, "City")}
                                            </Col>
                                            <Col>
                                                {infoField(charity.state, "State")}
                                            </Col>
                                            <Col>
                                                {infoField(charity.zip, "Zip")}
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

                                        {infoField(charity.closingTime, "Closing by")}
                                        {infoField(charity.salesforceId, "Salesforce ID")}
                                        {infoField(charity.notes, "Notes")}
                                    </Well>
                                </Col>

                                <Col xs={12} xl={7}>
                                    <Well>
                                        <FormTitle>Donations</FormTitle>
                                        <TableComponent fields={fields} onRowClicked={openDonationDetails}
                                                        data={donations}/>
                                    </Well>
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
                                                actions.removeCharity(charity.id)
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
                            <Col md={4}>
                                <Well>
                                    <FormTitle>User information</FormTitle>
                                    <StyledField>
                                        <Label>Name</Label>
                                        <Input value={user.details ? user.details.name : ''} name={"name"}
                                               onChange={updateField}/>
                                    </StyledField>
                                    <StyledField>
                                        <Label>Email</Label>
                                        <Input value={user.username} name={"username"} onChange={updateField}/>
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
                                    }} data={users}/>
                                </Well>
                            </Col>
                        </Row>
                    </TabPanel>
                </Tabs>

            </BaseContainer>
        )
    } else {
        return (<></>)
    }

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

