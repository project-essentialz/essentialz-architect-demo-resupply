import {Col, Row} from "@zendeskgarden/react-grid";
import {Paragraph} from "@zendeskgarden/react-typography";
import {Anchor} from "@zendeskgarden/react-buttons";
import {Title, Well} from "@zendeskgarden/react-notifications";
import React from "react";
import {Donor, Driver} from "../domain";
import styled from "styled-components";
import {Body, Cell, Row as TRow, Table} from '@zendeskgarden/react-tables';

type Props = {
    driver: Driver
    title?: string,
    spacing?: number
}
export const DriverProfileWidget = (props: Props) => {
    const {driver, title = 'Driver info', spacing = 5} = props;

    return (
        <Well style={{marginTop: spacing}}>
            <StiledTitle>{title}</StiledTitle>
            <Row>
                <Table>
                    <Body>
                        <TRowNoBorder isReadOnly>
                            <Cell><Paragraph>{driver.name}</Paragraph></Cell>
                        </TRowNoBorder>
                        <TRowNoBorder isReadOnly>
                            <Cell>Phone number</Cell>
                            <Cell><Anchor
                                href={`tel:${driver.phone}`}>{driver.phone}</Anchor></Cell>
                        </TRowNoBorder>
                        <TRowNoBorder isReadOnly>
                            <Cell>Email</Cell>
                            <Cell><Anchor
                                href={`mailto:${driver.email}`}>{driver.email}</Anchor></Cell>
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
