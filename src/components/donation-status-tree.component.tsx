import {Stepper} from "@zendeskgarden/react-accordions";
import {donationStatus} from "../utility/donation-status";
import {Button} from "@zendeskgarden/react-buttons";
import {Title} from "@zendeskgarden/react-notifications";
import React from "react";
import styled from "styled-components";
import {Donation} from "../services/domain";

type Props = {
    donation: Donation
}
export const DonationStatusTreeComponent = (props: Props) => {
    const statusIndex = donationStatus.indexOf(props.donation.donationStatus) + 1;
    return (
        <>
            <Stepper activeIndex={statusIndex}>
                <Stepper.Step key="step-1">
                    <Stepper.Label>Donation submitted</Stepper.Label>
                    <Stepper.Content>
                        A donor submitted the donation
                    </Stepper.Content>
                </Stepper.Step>
                <Stepper.Step key="step-2">
                    <Stepper.Label>Service request dispatched</Stepper.Label>
                    <Stepper.Content>
                        Waiting for the system to dispatch a service request to the eligible drivers
                    </Stepper.Content>
                </Stepper.Step>
                <Stepper.Step key="step-3">
                    <Stepper.Label>{statusIndex > 3 ? 'Awaiting driver' : 'Driver Assigned'}</Stepper.Label>
                    <Stepper.Content>
                        Service request is dispatched to all the drivers in the specified area.
                        You can still define driver manually.
                        <StyledButtons>
                            <Button>Assign driver manually</Button>
                        </StyledButtons>
                    </Stepper.Content>
                </Stepper.Step>
                <Stepper.Step key="step-4">
                    <Stepper.Label>{statusIndex > 4 ? 'Driver on their way' : 'Waiting for a driver to start the pickup'}</Stepper.Label>
                    <Stepper.Content>
                        Waiting for the driver to take actions. Please wait until they update the pickup status.
                    </Stepper.Content>
                </Stepper.Step>
                <Stepper.Step key="step-5">
                    <Stepper.Label>Customer accepted the quote</Stepper.Label>
                    <Stepper.Content>
                        Waiting for the customer to accept the quote
                    </Stepper.Content>
                </Stepper.Step>
                <Stepper.Step key="step-6">
                    <Stepper.Label>Payment successful</Stepper.Label>
                    <Stepper.Content>
                        Waiting for the customer to complete the payment
                    </Stepper.Content>
                </Stepper.Step>
                <Stepper.Step key="step-7">
                    <Stepper.Label>Primary drop-off</Stepper.Label>
                    <Stepper.Content>
                        Driver is heading to the drop-off location. Please wait until they update the pickup status.
                    </Stepper.Content>
                </Stepper.Step>
                <Stepper.Step key="step-8">
                    <Stepper.Label>Secondary drop-off</Stepper.Label>
                    <Stepper.Content>
                        Driver is heading to the drop-off location. Please wait until they update the pickup status.
                    </Stepper.Content>
                </Stepper.Step>
                <Stepper.Step key="step-9">
                    <Stepper.Label>Donation complete</Stepper.Label>
                    <Stepper.Content>
                        Donation is completed successfully
                    </Stepper.Content>
                </Stepper.Step>
            </Stepper>
        </>
    )
}

const StyledButtons = styled.div`
  margin-top: ${p => p.theme.space.sm};
  padding: ${p => p.theme.shadowWidths.md};

  & > button {
    margin-${p => (p.theme.rtl ? 'right' : 'left')}: ${p => p.theme.space.base * 3}px;

    &:first-child {
      margin-${p => (p.theme.rtl ? 'right' : 'left')}: 0;
    }
  }
`;


const StiledTitle = styled(Title)`
  margin-bottom: 20px;
`
