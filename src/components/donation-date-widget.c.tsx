import {Donation} from "../domain";
import {Paragraph, XXL, XXXL} from "@zendeskgarden/react-typography";
import {Title, Well} from "@zendeskgarden/react-notifications";
import React from "react";
import styled from "styled-components";
import {Space} from "./space";
import moment from "moment";
import {Col, Row} from "@zendeskgarden/react-grid";
import {PALETTE} from "@zendeskgarden/react-theming";

type Props = {
    donation: Donation
    title?: string
    spacing?: number
}

export const DonationDateWidget = (props: Props) => {
    const {donation, title = "Date", spacing = 5} = props;

    const getSlotText = () => {
        switch (donation.timeSlot){
            case 'slot1': return '8am - 10am'
            case 'slot2': return '10am - 12pm'
            case 'slot3': return '12pm - 2pm'
            case 'slot4': return '2pm - 4pm'
            default: return 'Unassigned'
        }
    }
    return (
        <StyledWell style={{marginTop: spacing}}>
            <Row>
                <StyledCol>
                    Requested date
                    <XXL>{moment(donation.date).format("MM/DD/YYYY")}</XXL>
                </StyledCol>
                <StyledCol>
                    Requested part of day
                    <XXL>
                        {donation.partOfDay.toUpperCase()}
                    </XXL>
                </StyledCol>
            </Row>
            <Row>
                <StyledCol>
                    Slot assigned
                    <XXL>
                        {getSlotText()}
                    </XXL>
                </StyledCol>
            </Row>

        </StyledWell>
    )
}
const StyledWell = styled(Well)`
  padding: 0;
  border: none;
`
const StyledCol = styled(Col)`
  padding: 10px;
  margin: 0 10px 10px 10px;
  border-radius: 4px;
  border: 1px solid ${PALETTE.grey["400"]};
  &:nth-of-type(2){
    margin-left: 0;
  }
`
