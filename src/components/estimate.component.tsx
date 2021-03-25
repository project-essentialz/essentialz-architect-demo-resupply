import {Body, Cell, GroupRow, Table, Row} from "@zendeskgarden/react-tables";
import {pricing} from "../utility/pricing";
import {PALETTE} from "@zendeskgarden/react-theming";
import React, {useEffect} from "react";
import {Donation} from "../domain/Donation";
import {DonationSpec} from "../domain/DonationSpec";

type Props = {
    spec: DonationSpec
}
export const EstimateComponent = (props: Props) => {
    const {spec} = props;

    return (
        <Table>
            <Body>
                <GroupRow>
                    <Cell>Items</Cell>
                    <Cell style={{textAlign: "right"}}>Quantity</Cell>
                    <Cell style={{textAlign: "right"}}>Price</Cell>
                </GroupRow>
                {pricingRow("Base price", pricing.base, 1)}
                {pricingRow("Large items", pricing.largeItems, spec.largeItems)}
                {pricingRow("Small items", pricing.smallItems, spec.smallItems)}
                {pricingRow("Boxes", pricing.boxes, spec.boxes)}
                {pricingRow("Bags", pricing.bags, spec.bags)}
                {pricingRow("Appliances", pricing.appliances, spec.appliances)}
                {pricingRow("Hazardous", pricing.hazardous, spec.hazardous)}
                {pricingRow("Staircases", pricing.staircases, spec.staircases)}
                {pricingRow("Disassembly", pricing.disassembly, spec.disassembly)}
                <Row style={{background: PALETTE.grey["100"]}}>
                    <Cell width={300}>Total</Cell>
                    <Cell style={{textAlign: "right"}} colSpan={2}>${totalPrice(spec)}</Cell>
                </Row>
            </Body>
        </Table>
    )
}


const pricingRow = (label: string, price: number, quantity: number) => {
    return (quantity !== undefined && quantity > 0) ? (
        <Row isReadOnly>
            <Cell>{label}</Cell>
            <Cell style={{textAlign: "right"}}>{parseFloat((quantity || 0) + "")}</Cell>
            <Cell style={{textAlign: "right"}}>${Math.round((quantity || 0) * price * 100)/100}</Cell>
        </Row>
    ) : null
}

export const totalPrice = (spec: DonationSpec) => {
    return Donation.getEstimate(spec)
}

export const totalItems = (spec: DonationSpec) => {
    const count =
        1 * (spec.largeItems || 0)
        + 1 *  (spec.smallItems || 0)
        + 1 *  (spec.boxes || 0)
        + 1 *  (spec.bags || 0)
        + 1 *  (spec.appliances || 0)
        + 1 *  (spec.hazardous || 0)
        + 1 *  (spec.staircases || 0)
        + 1 *  (spec.disassembly || 0)
    return count
}

