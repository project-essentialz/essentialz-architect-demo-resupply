import {Body, Cell, GroupRow, Table, Row} from "@zendeskgarden/react-tables";
import {pricing} from "../utility/pricing";
import {PALETTE} from "@zendeskgarden/react-theming";
import React from "react";
import {Donation} from "../domain/Donation";

type Props = {
    donation: Donation
}
export const EstimateComponent = (props: Props) => {
    const {donation} = props;
    return (
        <Table>
            <Body>
                <GroupRow>
                    <Cell>Items</Cell>
                    <Cell style={{textAlign: "right"}}>Quantity</Cell>
                    <Cell style={{textAlign: "right"}}>Price</Cell>
                </GroupRow>
                {pricingRow("Base price", pricing.base, 1)}
                {pricingRow("Large items", pricing.largeItems, donation.spec.largeItems)}
                {pricingRow("Small items", pricing.smallItems, donation.spec.smallItems)}
                {pricingRow("Boxes", pricing.boxes, donation.spec.boxes)}
                {pricingRow("Bags", pricing.bags, donation.spec.bags)}
                {pricingRow("Appliances", pricing.appliances, donation.spec.appliances)}
                {pricingRow("Hazardous", pricing.hazardous, donation.spec.hazardous)}
                {pricingRow("Staircases", pricing.staircases, donation.spec.staircases)}
                {pricingRow("Disassembly", pricing.disassembly, donation.spec.disassembly)}
                <Row style={{background: PALETTE.grey["100"]}}>
                    <Cell width={300}>Total</Cell>
                    <Cell style={{textAlign: "right"}} colSpan={2}>${totalPrice(donation)}</Cell>
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

export const totalPrice = (d: Donation) => {
    return d.getEstimate(d.spec)
}

export const totalItems = (d: Donation) => {
    const count =
        1 * (d.spec.largeItems || 0)
        + 1 *  (d.spec.smallItems || 0)
        + 1 *  (d.spec.boxes || 0)
        + 1 *  (d.spec.bags || 0)
        + 1 *  (d.spec.appliances || 0)
        + 1 *  (d.spec.hazardous || 0)
        + 1 *  (d.spec.staircases || 0)
        + 1 *  (d.spec.disassembly || 0)
    return count
}

