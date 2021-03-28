import {Col, Row} from "@zendeskgarden/react-grid";
import {Title, Well} from "@zendeskgarden/react-notifications";
import React, {useContext, useEffect, useState} from "react";
import {Donation, Driver} from "../domain";
import styled from "styled-components";
import {Row as TRow} from '@zendeskgarden/react-tables';
import {PartnerContext} from "../context";
import {Inline} from "@zendeskgarden/react-loaders";
import {Button} from "@zendeskgarden/react-buttons";
import {Space} from "./space";

type Props = {
    donation: Donation,
    title?: string,
    spacing?: number,
    isStandalone?: boolean
    onSlotPicked: (slot: string) => void
}
export const DriverScheduleWidget = (props: Props) => {
    const {donation, title = 'Driver schedule for the day', spacing = 5, isStandalone = true, onSlotPicked} = props;
    const [driver, setDriver] = useState<Driver>()
    const {actions, partner} = useContext(PartnerContext)

    useEffect(() => {
        actions.getPartner(donation.tplOrganization?.id!)
    }, [donation])

    useEffect(() => {
        if (partner.drivers) {
            setDriver(partner.drivers.find(driver => driver.id === donation.driver?.id!))
        }
    }, [partner])

    useEffect(() => {
    })

    const getSchedule = () => {
        const date = donation.date!.replaceAll("-", 'X')
        console.log(date);
        return driver?.schedule ? driver.schedule[date] : {}
    }

    const renderSlot = (schedule: any, slot: string, slotTitle: string) => {
        const isUnavailable = (schedule && schedule[slot]);
        return (
            <StyledWell isRecessed={isUnavailable}>
                <Title>{slotTitle}</Title>
                <Space size={10}/>
                <Button
                    size={"small"}
                    onClick={() => onSlotPicked(slot)}
                    isStretched
                    disabled={isUnavailable}>
                    {isUnavailable ? 'Unavailable' : 'Assign'}
                </Button>
            </StyledWell>
        )
    }
    const renderContent = () => (
        <>
            <StiledTitle>{title}</StiledTitle>
            {driver && driver.schedule ? (
                <Row>
                    <Col>
                        <Row>
                            <Col>
                                {renderSlot(getSchedule(),'slot1', 'Slot 1: 8am - 10am')}
                            </Col>
                            <Col>
                                {renderSlot(getSchedule(),'slot2', 'Slot 2: 10am - 12pm')}
                            </Col>
                        </Row>
                        <Space size={15}/>
                        <Row>
                            <Col>
                                {renderSlot(getSchedule(),'slot3', 'Slot 3: 12pm - 2pm')}
                            </Col>
                            <Col>
                                {renderSlot(getSchedule(),'slot4', 'Slot 4: 2pm - 4pm')}
                            </Col>
                        </Row>
                    </Col>
                </Row>
            ) : <Inline/>}
        </>
    )
    return isStandalone ? (
        <Well style={{marginTop: spacing}}>
            {renderContent()}
        </Well>
    ) : (
        <>
            {renderContent()}
        </>
    )
}

const StyledWell = styled(Well)`
  padding: 10px;
`
const StiledTitle = styled(Title)`
  margin-bottom: 20px;
`
const TRowNoBorder = styled(TRow)`
  border: none
`
