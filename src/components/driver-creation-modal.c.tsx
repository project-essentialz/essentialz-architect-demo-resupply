import {Driver, TPLOrganization} from "../domain";
import {Body, Close, Footer, FooterItem, Header, Modal} from "@zendeskgarden/react-modals";
import {Space} from "./space";
import {Field, Input, Label} from "@zendeskgarden/react-forms";
import ReactInputMask from "react-input-mask";
import {Button} from "@zendeskgarden/react-buttons";
import React, {ChangeEvent, useContext, useState} from "react";
import styled from "styled-components";
import {PartnerContext, UserContext} from "../context";
import * as _ from "lodash";
import {Paragraph} from "@zendeskgarden/react-typography";
import {PALETTE} from "@zendeskgarden/react-theming";
import {Inline} from "@zendeskgarden/react-loaders";
import Api from "../services/api.service";
import {routes} from "../services/api.routes";

type Props = {
    partner: TPLOrganization
    onDone?: (driver: Driver) => void
    onClose?: () => void
}
export const DriverCreationModal = (props: Props) => {
    const {partner, onDone, onClose} = props;
    const [driver, setDriver] = useState<Driver>(new Driver())
    const {actions} = useContext(PartnerContext);
    const userContext = useContext(UserContext);

    const [error, setError] = useState('')
    const [isLoading, setLoading] = useState(false);

    const updateDriverEntry = (value: any, name: string) => {
        const d = new Driver();
        Object.assign(d, driver);
        _.set(d, name, value);
        setDriver(d);
    }
    const updateField = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const {value, name} = e.target;
        updateDriverEntry(value, name);
    }

    const submitDriver = () => {
        setError('')
        setLoading(true);

        type Schedule = { id: string }
        Api.$<Schedule>(routes.schedules).create({} as Schedule).then(schedule => {
            console.log("SCHEDULE CREATED", schedule);
            _.set(driver, "scheduleId", schedule.id)
            _.set(driver, "user.details.tplOrganizationId", partner.id)
            _.set(driver, "user.details.scheduleId", schedule.id)
            userContext.actions.createUser(driver.user).then((user) => {
                driver.user = user;
                partner.drivers.push(driver);
                actions.updatePartner(partner).then(onClose);
            }).catch(e => {
                setError('It seems that driver with this username already exists. Please try with a different one.')
            }).finally(() => {
                setLoading(false);
            })
        })


    }

    return (driver && driver.user) ? (
        <Modal onClose={onClose}>
            <Header>Add a driver profile</Header>
            <Body>
                Please provide necessary info in order to create a driver account.
                They will use the credentials provided to access their account.
                <Space size={10}/>
                <StyledField>
                    <Label>Driver name</Label>
                    <Input name={'user.details.name'} value={driver.user.details.name} onChange={updateField}/>
                </StyledField>
                <StyledField>
                    <Label>Phone number</Label>
                    <ReactInputMask mask={'+19999999999'} name={'user.details.phone'} value={driver.user.details.phone}
                                    onChange={updateField}>
                        <Input/>
                    </ReactInputMask>
                </StyledField>
                <StyledField>
                    <Label>Email</Label>
                    <Input name={'user.details.email'} value={driver.user.details.email} onChange={updateField}/>
                </StyledField>
                <StyledField>
                    <Label>Username</Label>
                    <Input name={'user.username'} value={driver.user.username} onChange={updateField}/>
                </StyledField>
                <StyledField>
                    <Label>Password</Label>
                    <Input type="password" name={'user.password'} value={driver.user.password} onChange={updateField}/>
                </StyledField>

                <Paragraph color={PALETTE.red["400"]}>
                    {error}
                </Paragraph>
            </Body>
            <Footer>
                <FooterItem>
                    <Button onClick={onClose} isDanger isBasic>
                        Cancel
                    </Button>
                </FooterItem>
                <FooterItem>
                    <Button
                        style={{minWidth: 200}}
                        disabled={isLoading}
                        isPrimary
                        onClick={submitDriver}
                    >
                        {isLoading ? <Inline/> : ('Create driver profile')}
                    </Button>
                </FooterItem>
            </Footer>
            <Close aria-label="Close modal"/>
        </Modal>
    ) : (<></>)
}
const StyledField = styled(Field)`
  margin-bottom: 15px;
`
