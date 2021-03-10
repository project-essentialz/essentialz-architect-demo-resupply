import {BaseContainer} from "./base.container";
import React, {useContext, useEffect, useState} from "react";
import {AutocompleteInput, DonationStatusTreeComponent, TableComponent} from "../components";
import {Col, Row} from "@zendeskgarden/react-grid";
import {Well} from "@zendeskgarden/react-notifications";
import {DonationContext} from "../context";
import {Donation} from "../services/domain";
import {field} from "../utility/field";
import {DrawerModal} from "@zendeskgarden/react-modals";
import {Button} from "@zendeskgarden/react-buttons";
import {useHistory} from "react-router-dom";
import styled from "styled-components";

type Props = {}

export const DonationsFunnelContainer = (props: Props) => {
    const history = useHistory();
    const {donations, actions} = useContext(DonationContext);

    useEffect(() => {
        actions.getAllDonations();
    }, [])

    const openDonationDetailsView = (data: Donation) => {
        history.push(`/donations/${data!.id}`)
    }
    const onDonationIdClicked = (donationCode: string, data: Donation) => {
    }

    const fields = [
        field('donationCode', 'Donation ID', true, onDonationIdClicked),
        field('charityName', 'Charity name'),
        field('donorName', 'Donor name'),
        field('phone', 'phone'),
        field('donationStatus', 'Status', true)
    ]

    return (
        <BaseContainer title={'Donations funnel'} subtitle={'List of all donations in the system'}>
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

const StyledButtons = styled.div`
  margin-top: ${p => p.theme.space.sm};
  padding: ${p => p.theme.shadowWidths.md};

  & > button {
    margin-${p => (p.theme.rtl ? 'right' : 'left')}: ${p => p.theme.space.base * 3}px;

    &:first-child {
      margin-${p => (p.theme.rtl ? 'right' : 'left')}: 0;
    }
  }
`;
