import {DonationSpec} from "../domain/DonationSpec";
import {Row} from "@zendeskgarden/react-grid";
import {Row as TRow, Body, Cell, GroupRow, Table} from "@zendeskgarden/react-tables";
import {MD} from "@zendeskgarden/react-typography";
import {Title, Well} from "@zendeskgarden/react-notifications";
import React from "react";
import styled from "styled-components";
import {Tag} from "@zendeskgarden/react-tags";


type Props = {
    spec: DonationSpec
    title?: string
    spacing?: number
}

export const DonationSpecWidget = (props: Props) => {
    const {spec, title = "Service request info", spacing = 5} = props;

    return (
        <Well style={{marginTop: spacing}}>
            <StiledTitle>{title}</StiledTitle>
            <Row>
                <Table>
                    <Body>
                        <GroupRow>
                            <Cell>Donation items</Cell>
                            <Cell style={{textAlign: "right"}}>Quantity</Cell>
                        </GroupRow>
                        <TRow isReadOnly>
                            <Cell>Large items</Cell>
                            <Cell
                                style={{textAlign: "right"}}>{parseFloat((spec.largeItems || 0) + "")}</Cell>
                        </TRow>
                        <TRow isReadOnly>
                            <Cell>Small items</Cell>
                            <Cell
                                style={{textAlign: "right"}}>{parseFloat((spec.smallItems || 0) + "")}</Cell>
                        </TRow>
                        <TRow isReadOnly>
                            <Cell>Bags</Cell>
                            <Cell
                                style={{textAlign: "right"}}>{parseFloat((spec.bags || 0) + "")}</Cell>
                        </TRow>
                        <TRow isReadOnly>
                            <Cell>Boxes</Cell>
                            <Cell
                                style={{textAlign: "right"}}>{parseFloat((spec.boxes || 0) + "")}</Cell>
                        </TRow>
                        <TRow isReadOnly>
                            <Cell>Appliances</Cell>
                            <Cell
                                style={{textAlign: "right"}}>{parseFloat((spec.appliances || 0) + "")}</Cell>
                        </TRow>
                        <TRow isReadOnly>
                            <Cell>Hazardous</Cell>
                            <Cell
                                style={{textAlign: "right"}}>{parseFloat((spec.hazardous || 0) + "")}</Cell>
                        </TRow>
                    </Body>
                </Table>
            </Row>
            <TableCaption>Additional information</TableCaption>
            <Row>
                <Table>
                    <Body>
                        <TRow isReadOnly>
                            <Cell>Are items above or below the ground floor?</Cell>
                            <Cell style={{textAlign: "right"}}><TTag
                                value={spec.aboveTheGroundFloor === 'no' ? 'No' : 'Yes'}/></Cell>
                        </TRow>
                        <TRow isReadOnly>
                            <Cell>Is elevator present?</Cell>
                            <Cell style={{textAlign: "right"}}><TTag
                                value={spec.aboveTheGroundFloor === 'yes-elevator' ? 'Yes' : 'No'}/></Cell>
                        </TRow>
                        <TRow isReadOnly>
                            <Cell>Will client move items to ground floor?</Cell>
                            <Cell style={{textAlign: "right"}}><TTag
                                value={spec.aboveTheGroundFloor === 'yes-curbside' ? 'Yes' : 'No'}/></Cell>
                        </TRow>
                        <TRow isReadOnly>
                            <Cell>How many staircases we will need to take?</Cell>
                            <Cell
                                style={{textAlign: "right"}}>{parseFloat(spec.staircases + "")}</Cell>
                        </TRow>
                        <TRow isReadOnly>
                            <Cell>Disassembly required?</Cell>
                            <Cell style={{textAlign: "right"}}><TTag
                                value={spec.disassembly > 0 ? 'Yes' : 'No'}/></Cell>
                        </TRow>
                        <TRow isReadOnly>
                            <Cell>How many items need disassembly?</Cell>
                            <Cell
                                style={{textAlign: "right"}}>{parseFloat(spec.disassembly + "")}</Cell>
                        </TRow>
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
const TableCaption = styled(MD)`
  margin: 30px 0 10px 0;
`
const TTag = (props: { value: string }) => (
    <Tag hue={props.value === 'Yes' ? 'green' : 'red'}>
        <span>{props.value}</span>
    </Tag>
)
