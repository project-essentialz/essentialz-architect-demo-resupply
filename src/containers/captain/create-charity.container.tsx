import React, {ChangeEvent, useContext, useEffect, useState} from "react";
import {useHistory, useParams} from "react-router-dom";

import styled from "styled-components";

import {Col, Row} from "@zendeskgarden/react-grid";
import {LG} from "@zendeskgarden/react-typography";
import {Field, FileUpload, Hint, Input, Label, Textarea, Toggle} from "@zendeskgarden/react-forms";
import {Well} from "@zendeskgarden/react-notifications";
import {Button} from "@zendeskgarden/react-buttons";

import ReactInputMask from "react-input-mask";

import {BaseContainer} from "../base.container";
import {useDropzone} from "react-dropzone";

import {CharityContext, ZoneContext} from "../../context";
import {Charity, Zone} from "../../domain";

import * as _ from 'lodash';
import {AutocompleteField} from "../../components/auto-complete-field";
import {DayString, EntityRouteParams} from "../../types";
import {MultiSelectField} from "../../components/multi-select-field";

const weekDays: DayString[] = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];

export const CreateCharityContainer = () => {
    const history = useHistory()
    const {charity, setCharity, charities, actions} = useContext(CharityContext)
    const {zones} = useContext(ZoneContext);

    // Used if Component is in EDIT mode
    const [mode, setMode] = useState('new')
    const params = useParams<EntityRouteParams>()
    const {id} = params;


    useEffect(() => {
        console.log("Charity", charity);
    }, [charity])

    useEffect(() => {
        if (id) {
            setMode('edit')
            actions.getCharity(id)
        } else {
            setCharity(new Charity());
        }
    }, [])

    const goBack = () => history.goBack();


    const updateCharityEntry = (value: any, name: string) => {
        const c = new Charity();
        Object.assign(c, charity);
        _.set(c, name, value);
        setCharity(c);
    }
    const updateField = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const {value, name} = e.target;
        updateCharityEntry(value, name);
    }
    const updateDaysOfOperation = (e: ChangeEvent<HTMLInputElement>) => {
        const {name, checked} = e.target;
        updateCharityEntry(checked, name)
    }
    const updateZones = (zones: Zone[]) => {
        updateCharityEntry(zones, 'zones')
    }
    const updateSecondaryDropOff = (charity: Charity) => {
        updateCharityEntry(charity, 'secondaryDropOff')
    }

    const createCharity = () => actions.createCharity(charity).then(goBack)
    const updateCharity = () => actions.updateCharity(charity).then(goBack)

    const getTitle = () => mode === 'new' ? 'Create charity' : 'Update charity'

    const resolveZoneName = (value: Zone) => value ? (value.name ? value.name : '') : ''
    const resolveCharityName = (value: Charity) => value ? (value.name ? value.name : '') : ''


    const renderDayToggle = (day: DayString) => (
        <Col key={day}>
            <StyledField>
                <Toggle name={`daysOfOperation.${day}`} checked={charity.daysOfOperation[day]}
                        onChange={updateDaysOfOperation}>
                    <StyledLabel>{day}
                    </StyledLabel>
                </Toggle>
            </StyledField>
        </Col>
    )

    const onDrop = React.useCallback((acceptedFiles: File[]) => {
        alert(`${acceptedFiles.length} files accepted for upload`);
    }, []);

    const {getRootProps, getInputProps, isDragActive} = useDropzone({
        accept: ['image/jpeg', 'image/png', 'image/gif'],
        onDrop
    });

    return charity ? (
        <BaseContainer showBackButton title={getTitle()}
                       subtitle={"Please specify charity information"}>
            <Row style={{marginTop: 10}}>
                <Col xs={12} xl={8}>
                    <Well>
                        <FormTitle>Basic information</FormTitle>
                        <Row>
                            <Col xs={10}>
                                <StyledField>
                                    <Label>Charity name</Label>
                                    <Input
                                        name={"name"}
                                        onChange={updateField}
                                        value={charity.name}
                                    />
                                </StyledField>
                            </Col>
                            <Col>
                                <StyledField>
                                    <Label>CODE</Label>
                                    <Input
                                        type={"number"}
                                        name={"code"}
                                        onChange={updateField}
                                        value={charity.code}
                                    />
                                </StyledField>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <StyledField>
                                    <Label>EIN</Label>
                                    <ReactInputMask
                                        mask={'99-9999999'}
                                        name={"ein"}
                                        onChange={updateField}
                                        value={charity.ein}
                                    >
                                        <Input/>
                                    </ReactInputMask>
                                </StyledField>
                            </Col>
                        </Row>

                        <StyledField>
                            <Label>Charity logo</Label>
                            <Hint>
                                Drag the photo from your computer or click here to pick. Acceptable formats are JPG and
                                PNG.
                            </Hint>
                            <FileUpload {...getRootProps()} isDragging={isDragActive}>
                                {isDragActive ? (
                                    <span>Drop files here</span>
                                ) : (
                                    <span>Choose a file or drag and drop here</span>
                                )}
                                <Input {...getInputProps()} />
                            </FileUpload>
                        </StyledField>
                        <StyledField>
                            <Label>Point of contact</Label>
                            <Input name={"pocName"} value={charity.pocName} onChange={updateField}/>
                        </StyledField>
                        <StyledField>
                            <Label>Phone number</Label>
                            <ReactInputMask mask={'+19999999999'} name={"phone"} value={charity.phone}
                                            onChange={updateField}>
                                <Input/>
                            </ReactInputMask>
                        </StyledField>
                        <StyledField>
                            <Label>Email address</Label>
                            <Input name={"email"} value={charity.email} onChange={updateField}/>
                        </StyledField>
                        <StyledField>
                            <Label>Address</Label>
                            <Input name={"address"} value={charity.address} onChange={updateField}/>
                        </StyledField>
                        <Row>
                            <Col>
                                <StyledField>
                                    <Label>City</Label>
                                    <Input name={"city"} value={charity.city} onChange={updateField}/>
                                </StyledField>
                            </Col>
                            <Col>
                                <StyledField>
                                    <Label>State</Label>
                                    <ReactInputMask mask={'aa'} name={"state"} value={charity.state}
                                                    onChange={updateField}>
                                        <Input/>
                                    </ReactInputMask>
                                </StyledField>
                            </Col>
                            <Col>
                                <StyledField>
                                    <Label>Zip</Label>
                                    <ReactInputMask mask={'99999'} name={"zip"} value={charity.zip}
                                                    onChange={updateField}>
                                        <Input/>
                                    </ReactInputMask>
                                </StyledField>
                            </Col>
                        </Row>

                        <FormTitle>Operations information</FormTitle>
                        <StyledField>
                            <Label>Days of operation</Label>
                        </StyledField>
                        <Row>
                            {weekDays.map(renderDayToggle)}
                        </Row>
                        <StyledField>
                            <Label>Closing time</Label>
                            <Hint>
                                Enter the time when this store stops accepting pickups at the loading dock
                            </Hint>
                            <Input name={"closingBy"} value={charity.closingBy} onChange={updateField}/>
                        </StyledField>
                        <StyledField>
                            <MultiSelectField
                                label={"Zones"}
                                options={zones}
                                value={charity.zones}
                                valueResolver={resolveZoneName}
                                onValueSelected={updateZones}
                            />
                        </StyledField>

                        <FormTitle>Other</FormTitle>
                        <StyledField>
                            <Label>Notes</Label>
                            <Textarea name={"notes"} value={charity.notes} onChange={updateField}/>
                        </StyledField>
                        <StyledField>
                            <AutocompleteField
                                label={"Secondary Drop-Off location"}
                                options={charities}
                                value={charity.secondaryDropOff}
                                valueResolver={resolveCharityName}
                                onValueSelected={updateSecondaryDropOff}
                            />
                        </StyledField>
                        <StyledField>
                            <Label>Salesforce ID</Label>
                            <Hint>
                                Enter the Account ID displayed at the end of the Salesforce Account URL
                            </Hint>
                            <Input name={"salesforceId"} value={charity.salesforceId} onChange={updateField}/>
                        </StyledField>

                        <StyledField>
                            <Label>Reference ID</Label>
                            <Hint>
                                Enter the Charity ID from the existing system
                            </Hint>
                            <Input name={"refId"} onChange={updateField} value={charity.refId}/>
                        </StyledField>

                        <StyledButtonWrapper>
                            <Button
                                onClick={mode === 'new' ? createCharity : updateCharity}>{mode === 'new' ? 'Create charity' : 'Edit charity'}</Button>
                        </StyledButtonWrapper>

                    </Well>
                </Col>

            </Row>
        </BaseContainer>
    ) : (<></>)
}


const StyledField = styled(Field)`
  margin-bottom: 15px;
`

const StyledLabel = styled(Label)`
  text-transform: capitalize;
`

const FormTitle = styled(LG)`
  margin-bottom: 10px;
  margin-top: 40px;

  &:first-of-type {
    margin-top: 0;
  }
`
const StyledButtonWrapper = styled(StyledField)`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
`
