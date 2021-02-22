import {BaseContainer} from "./base.container";
import {Well} from "@zendeskgarden/react-notifications";
import {Field, Label} from "@zendeskgarden/react-forms";
import {Col, Row} from "@zendeskgarden/react-grid";
import React, {useContext, useEffect, useState} from "react";
import styled from "styled-components";
import {LG} from "@zendeskgarden/react-typography";
import {TableComponent} from "../components";
import {useHistory, useParams} from "react-router-dom";
import {CharityContext, DonationContext} from "../context";
import {Charity, Donation} from "../services/domain";
import {Body, Close, Footer, FooterItem, Header, Modal} from "@zendeskgarden/react-modals";
import {Button} from "@zendeskgarden/react-buttons";
import {field} from "../utility/field";

const fields = [
    field('donationCode', 'Donation ID'),
    field('donorName', 'Donor name'),
    field('phone', 'phone'),
    field('donationStatus', 'Status')
]

export const CharityContainer = () => {
    const [visible, setVisible] = useState(false);

    const history = useHistory()
    const params = useParams<{ id: string }>();

    const {actions} = useContext(CharityContext)
    const donationsActions = useContext(DonationContext).actions;
    const {donations} = useContext(DonationContext)

    const {id} = params;

    const [charity, setCharity] = useState<Charity>({} as Charity)

    useEffect(() => {
        actions.getCharity(id).then(setCharity)
        donationsActions.getAllDonations(`charity_id=${id}`)
    }, [])

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

    const openDonationDetails = (donation: Donation) => {
        history.push(`/donations/${donation.id}`)
    }
    if (charity.id) {
        return (
            <BaseContainer showBackButton title={charity.charityName} subtitle={"Charity details"} extraButtons={extraButtons}>
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
                                    <LG>Mon - {charity.daysOfOperation.mon ? 'OPEN' : 'CLOSED'}</LG>
                                    <LG>Tue - {charity.daysOfOperation.tue ? 'OPEN' : 'CLOSED'}</LG>
                                    <LG>Wed - {charity.daysOfOperation.wed ? 'OPEN' : 'CLOSED'}</LG>
                                    <LG>Thu - {charity.daysOfOperation.thu ? 'OPEN' : 'CLOSED'}</LG>
                                    <LG>Fri - {charity.daysOfOperation.fri ? 'OPEN' : 'CLOSED'}</LG>
                                    <LG>Sat - {charity.daysOfOperation.sat ? 'OPEN' : 'CLOSED'}</LG>
                                    <LG>Sun - {charity.daysOfOperation.sun ? 'OPEN' : 'CLOSED'}</LG>
                                </StyledField>

                                {infoField(charity.closingTime, "Closing by")}
                                {infoField(charity.salesforceId, "Salesforce ID")}
                                {infoField(charity.notes, "Notes")}
                            </Well>
                        </Col>

                        <Col xs={12} xl={7}>
                            <Well>
                                <FormTitle>Donations</FormTitle>
                                <TableComponent fields={fields} onRowClicked={openDonationDetails} data={donations}/>
                            </Well>
                        </Col>
                    </Row>

                    {visible && (
                        <Modal onClose={() => setVisible(false)}>
                            <Header isDanger>Are you sure you want to delete this charity? </Header>
                            <Body>
                                This action is not reversible. Please make sure you want to remove this charity record from your database.
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
            </BaseContainer>
        )
    } else {
        return (<></>)
    }

}

const infoField = (value: string, display: string) => (
    <StyledField>
        <Label>{display}</Label>
        <LG>{value}</LG>
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
