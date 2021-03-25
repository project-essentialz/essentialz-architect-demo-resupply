import {DonationStatusTreeComponent} from "./donation-status-tree.component";
import {Title, Well} from "@zendeskgarden/react-notifications";
import React from "react";
import styled from "styled-components";
import {Donation} from "../domain";

type Props = {
    donation: Donation,
    title?: string,
    spacing?: number
}
export const ServiceRequestTreeWidget = (props: Props) => {
    const {donation, title = "Service request status", spacing = 5} = props;
    return (

        <Well style={{marginTop: spacing}}>
            <StiledTitle>{title}</StiledTitle>
            <DonationStatusTreeComponent donation={donation}/>
        </Well>
    )
}


const StiledTitle = styled(Title)`
  margin-bottom: 20px;
`
