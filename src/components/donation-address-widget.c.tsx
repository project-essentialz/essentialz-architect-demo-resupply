import {Donation} from "../domain";
import {MD, Paragraph} from "@zendeskgarden/react-typography";
import {Title, Well} from "@zendeskgarden/react-notifications";
import React from "react";
import styled from "styled-components";
import {Space} from "./space";

type Props = {
    donation: Donation
    title?: string
    spacing?: number
}

export const DonationAddressWidget = (props: Props) => {
    const {donation, title = "Address", spacing = 5} = props;

    return (
        <Well style={{marginTop: spacing}}>
            <StiledTitle>{title}</StiledTitle>
            <Paragraph>{donation.donor.address} {donation.donor.city}
                <br/> {donation.donor.state} {donation.donor.zip}
            </Paragraph>
            <Space size={20}/>
            <StiledTitle>Special instructions</StiledTitle>
            <Paragraph>
                {donation.spec.additionalInformation || 'No special instructions provided by the donor'}
            </Paragraph>
        </Well>
    )
}

const StiledTitle = styled(Title)`
  margin-bottom: 20px;
`
