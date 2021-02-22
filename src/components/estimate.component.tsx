import {Donation} from "../services/domain";
import {Body, Cell, GroupRow, Table, Row} from "@zendeskgarden/react-tables";
import {pricing} from "../utility/pricing";
import {PALETTE} from "@zendeskgarden/react-theming";
import React from "react";

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
                {pricingRow("Large items", pricing.largeItems, donation.largeItems)}
                {pricingRow("Small items", pricing.smallItems, donation.smallItems)}
                {pricingRow("Boxes", pricing.boxes, donation.boxes)}
                {pricingRow("Bags", pricing.bags, donation.bags)}
                {pricingRow("Appliances", pricing.appliances, donation.appliances)}
                {pricingRow("Hazardous", pricing.hazardous, donation.hazardous)}
                {pricingRow("Staircases", pricing.staircases, donation.staircases)}
                {pricingRow("Disassembly", pricing.disassembly, donation.disassembly)}
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
    const price = pricing.base
        + pricing.largeItems * (d.largeItems || 0)
        + pricing.smallItems * (d.smallItems || 0)
        + pricing.boxes * (d.boxes || 0)
        + pricing.bags * (d.bags || 0)
        + pricing.appliances * (d.appliances || 0)
        + pricing.hazardous * (d.hazardous || 0)
        + pricing.staircases * (d.staircases || 0)
        + pricing.disassembly * (d.disassembly || 0)
    return Math.round(price * 100) / 100
}

export const totalItems = (d: Donation) => {
    const count =
        1 * (d.largeItems || 0)
        + 1 *  (d.smallItems || 0)
        + 1 *  (d.boxes || 0)
        + 1 *  (d.bags || 0)
        + 1 *  (d.appliances || 0)
        + 1 *  (d.hazardous || 0)
        + 1 *  (d.staircases || 0)
        + 1 *  (d.disassembly || 0)
    return count
}

