import {Col, Row} from "@zendeskgarden/react-grid";
import {Paragraph} from "@zendeskgarden/react-typography";
import {Anchor} from "@zendeskgarden/react-buttons";
import {Title, Well} from "@zendeskgarden/react-notifications";
import React, {useContext} from "react";
import {Donation, Donor, Driver, TPLOrganization} from "../domain";
import styled from "styled-components";
import {Body, Cell, Row as TRow, Table} from '@zendeskgarden/react-tables';
import {ZoneContext} from "../context";

type Props = {
    donation: Donation,
    title?: string,
    spacing?: number
}
export const DonationAssignmentWidget = (props: Props) => {
    const {donation, title = 'Donor info', spacing = 5} = props;

    const getZone = () => {
        const z = (donation.charity!.zones || []).find(zone => zone.zips.indexOf(donation.donor.zip!) >= 0);
        return z ? z.name : "Zone unavailable"
    }
    return (
        <Well style={{marginTop: spacing}}>
            <StiledTitle>{title}</StiledTitle>
            <Row>
                <Table>
                    <Body>
                        <TRowNoBorder isReadOnly>
                            <Cell>Service area</Cell>
                            <Cell>N/A</Cell>
                        </TRowNoBorder>
                        <TRowNoBorder isReadOnly>
                            <Cell>Zone:</Cell>
                            <Cell>{getZone()}</Cell>
                        </TRowNoBorder>
                        <TRowNoBorder isReadOnly>
                            <Cell>Status:</Cell>
                            <Cell>{donation.donationStatus.toUpperCase().replaceAll("_", " ")}</Cell>
                        </TRowNoBorder>
                        <TRowNoBorder isReadOnly>
                            <Cell>3PL:</Cell>
                            <Cell>{donation.tplOrganization?.name}</Cell>
                        </TRowNoBorder>
                        <TRowNoBorder isReadOnly>
                            <Cell>Driver:</Cell>
                            <Cell>{donation.driver?.name}</Cell>
                        </TRowNoBorder>
                    </Body>
                </Table>
            </Row>
        </Well>
    )
}

const StiledTitle = styled(Title)`
  margin-bottom: 20px;
`
const TRowNoBorder = styled(TRow)`
  border: none
`
