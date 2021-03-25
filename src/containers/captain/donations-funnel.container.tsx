import {BaseContainer} from "../base.container";
import React, {useContext} from "react";
import {AutocompleteInput, TableComponent} from "../../components";
import {Col, Row} from "@zendeskgarden/react-grid";
import {Well} from "@zendeskgarden/react-notifications";
import {DonationContext} from "../../context";
import {Donation} from "../../services/domain";
import {field} from "../../utility/field";
import {useHistory} from "react-router-dom";
import {extraButton} from "../../utility/extraButton";

type Props = {}

export const DonationsFunnelContainer = (props: Props) => {
    const history = useHistory();
    const {donations, actions} = useContext(DonationContext);

    const openDonationDetailsView = (data: Donation) => {
        history.push(`/donations/${data!.id}`)
    }
    const onDonationIdClicked = (donationCode: string, data: Donation) => {
    }

    const openAddDonation = () => history.push('create-donation');

    const fields = [
        field('donationCode', 'Donation ID', true, onDonationIdClicked),
        field('charity.name', 'Charity name'),
        field('donor.name', 'Donor name'),
        field('donor.phone', 'phone'),
        field('donationStatus', 'Status', true)
    ]

    const extraButtons = [
        extraButton('Add donation', openAddDonation)
    ]

    return (
        <BaseContainer
            title={'Donations funnel'}
            subtitle={'List of all donations in the system'}
            extraButtons={extraButtons}
        >
            <>
                <Well>
                    <Row>
                        <Col>
                            <AutocompleteInput disabled options={[]} label={"Charity filter"}/>
                        </Col>
                        <Col>
                            <AutocompleteInput disabled options={[]} label={"Driver filter"}/>
                        </Col>
                        <Col>
                            <AutocompleteInput disabled options={[]} label={"Donor filter"}/>
                        </Col>
                    </Row>
                </Well>
                <div style={{height: 30}}/>
                <Well>
                    <TableComponent fields={fields} onRowClicked={openDonationDetailsView} data={donations}/>
                </Well>
            </>
        </BaseContainer>
    )
}
