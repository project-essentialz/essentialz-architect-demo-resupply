import {Row} from "@zendeskgarden/react-grid";
import {EstimateComponent} from "./estimate.component";
import {Title, Well} from "@zendeskgarden/react-notifications";
import React from "react";
import {DonationSpec} from "../domain/DonationSpec";
import styled from "styled-components";

type Props = {
    spec: DonationSpec
    title?: string
    spacing?: number
}
export const EstimateWidget = (props: Props) => {
    const {spec, title = "Initial estimate", spacing = 5} = props;
    return (
        <Well style={{marginTop: spacing}}>
            <StiledTitle>{title}</StiledTitle>
            <Row>
                <EstimateComponent spec={spec}/>
            </Row>
        </Well>
    )
}

const StiledTitle = styled(Title)`
  margin-bottom: 20px;
`
