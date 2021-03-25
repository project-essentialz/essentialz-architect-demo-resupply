import {Charity} from "../domain";
import {Col, Row} from "@zendeskgarden/react-grid";
import {Body, Cell, Row as TRow, Table} from "@zendeskgarden/react-tables";
import {Paragraph} from "@zendeskgarden/react-typography";
import {Anchor} from "@zendeskgarden/react-buttons";
import {Title, Well} from "@zendeskgarden/react-notifications";
import React from "react";
import styled from "styled-components";

type Props = {
    charity: Charity
    title?: string,
    spacing?: number
}
export const CharityWidget = (props: Props) => {
    const {charity, title = 'Charity info', spacing = 5} = props;

    return (
        <Well style={{marginTop: spacing}}>
            <StiledTitle>{title}</StiledTitle>
            <Row>
                <Table>
                    <Body>
                        <TRowNoBorder isReadOnly>
                            <Cell colSpan={2}><Paragraph>{charity.name}</Paragraph></Cell>
                        </TRowNoBorder>
                        <TRowNoBorder isReadOnly>
                            <Cell>Point of contact</Cell>
                            <Cell>{charity.pocName}</Cell>
                        </TRowNoBorder>
                        <TRowNoBorder isReadOnly>
                            <Cell>Phone number</Cell>
                            <Cell><Anchor
                                href={`tel:${charity.phone}`}>{charity.phone}</Anchor></Cell>
                        </TRowNoBorder>
                        <TRowNoBorder isReadOnly>
                            <Cell>Email</Cell>
                            <Cell><Anchor
                                href={`mailto:${charity.email}`}>{charity.email}</Anchor></Cell>
                        </TRowNoBorder>
                        <TRowNoBorder isReadOnly>
                            <Cell>Address</Cell>
                            <Cell>
                                <Row><Col>{charity.address} {charity.city}</Col></Row>
                                <Row><Col>{charity.state} {charity.zip}</Col></Row>
                            </Cell>
                        </TRowNoBorder>
                        <TRowNoBorder isReadOnly>
                            <Cell>Closing time</Cell>
                            <Cell>{charity.closingBy}</Cell>
                        </TRowNoBorder>
                        <TRowNoBorder isReadOnly>
                            <Cell>Notes</Cell>
                            <Cell>{charity.notes || 'No notes available for this charity'}</Cell>
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
