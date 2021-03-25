import {Col, Row} from "@zendeskgarden/react-grid";
import {Paragraph} from "@zendeskgarden/react-typography";
import {Anchor} from "@zendeskgarden/react-buttons";
import {Title, Well} from "@zendeskgarden/react-notifications";
import React from "react";
import {Donor} from "../domain";
import styled from "styled-components";
import {Body, Cell, Row as TRow, Table} from '@zendeskgarden/react-tables';

type Props = {
    donor: Donor
    title?: string,
    spacing?: number
}
export const DonorWidget = (props: Props) => {
    const {donor, title = 'Donor info', spacing = 5} = props;

    return (
        <Well style={{marginTop: spacing}}>
            <StiledTitle>{title}</StiledTitle>
            <Row>
                <Table>
                    <Body>
                        <TRowNoBorder isReadOnly>
                            <Cell><Paragraph>{donor.name}</Paragraph></Cell>
                        </TRowNoBorder>
                        <TRowNoBorder isReadOnly>
                            <Cell>Phone number</Cell>
                            <Cell><Anchor
                                href={`tel:${donor.phone}`}>{donor.phone}</Anchor></Cell>
                        </TRowNoBorder>
                        <TRowNoBorder isReadOnly>
                            <Cell>Email</Cell>
                            <Cell><Anchor
                                href={`mailto:${donor.email}`}>{donor.email}</Anchor></Cell>
                        </TRowNoBorder>
                        <TRowNoBorder isReadOnly>
                            <Cell>Address</Cell>
                            <Cell>
                                <Row><Col>{donor.address} {donor.city}</Col></Row>
                                <Row><Col>{donor.state} {donor.zip}</Col></Row>
                            </Cell>
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
