import {Col, Row} from "@zendeskgarden/react-grid";
import {Field, FileUpload, Hint, Input, Label, Textarea, Tiles, Toggle} from "@zendeskgarden/react-forms";
import React, {ChangeEvent, useContext, useEffect, useState} from "react";
import {BaseContainer} from "../base.container";
import {Well} from "@zendeskgarden/react-notifications";
import {AutocompleteInput} from "../../components";
import {Button} from "@zendeskgarden/react-buttons";
import {useDropzone} from "react-dropzone";
import styled from "styled-components";
import {mediaQuery} from "@zendeskgarden/react-theming";
import {LG} from "@zendeskgarden/react-typography";
import {CharityContext, ZoneContext} from "../../context";
import {useHistory, useParams} from "react-router-dom";
import * as _ from 'lodash';
import ReactInputMask from "react-input-mask";
import {Zone} from "../../domain/Zone";
import {Charity} from "../../domain/Charity";

type DayString = 'mon' | 'tue' | 'wed' | 'thu' | 'fri' | 'sat' | 'sun';
const weekDays: DayString[] = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];


export const CreateCharityContainer = () => {
    const history = useHistory()
    const {charity, setCharity, actions} = useContext(CharityContext)
    const zoneContext = useContext(ZoneContext);
    const {zones} = zoneContext

    // Used if Component is in EDIT mode
    const [mode, setMode] = useState('new')
    const params = useParams<{ id: string }>()
    const {id} = params;

    useEffect(() => {
        if (id) {
            setMode('edit')
            actions.getCharity(id).then(setCharity);
        } else {
            setCharity(new Charity());
        }

        zoneContext.actions.getAllZones();
    }, [])


    const updateCharityEntry = (value: string, name: string) => {
        const c = new Charity();
        Object.assign(c, charity);
        _.set(c, name, value);
        setCharity(c);
    }
    const updateField = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const {value, name} = e.target;
        updateCharityEntry(value, name);
    }

    const updateZone = (zoneName: string) => {
        // const zone = _.find<Zone>(zones, (zone: Zone) => {
        //     return zone.name === zoneName
        // })
        // if (zone) {
        //     setCharity({
        //         ...charity,
        //         zoneId: zone.id!
        //     })
        // }

    }

    const createCharity = () => {
        actions.createCharity(charity)
            .then(result => {
                history.push("/charities")
            })
    }

    const updateCharity = () => {
        actions.updateCharity(charity)
            .then(result => {
                history.push("/charities")
            })
    }

    const getZoneNameById = (zoneId: string) => {
        return _.find<Zone>(zones, (zone: Zone) => zone.id === zoneId)?.name
    }

    // @ts-ignore
    const renderDayToggle = (day: 'mon' | 'tue' | 'wed' | 'thu' | 'fri' | 'sat' | 'sun') => (
        <Col key={day}>
            <StyledField>
                <Toggle checked={charity.daysOfOperation[day]} onChange={(event) => {
                    setCharity({
                        ...charity, daysOfOperation: {
                            ...charity.daysOfOperation,
                            [day]: event.target.checked
                        }
                    })
                }}>
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

    if (id && !charity.id) {
        return (<>/</>)
    }
    return (
        <BaseContainer showBackButton title={mode === 'new' ? "Create Charity" : "Edit Charity"}
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
                                        value={charity.name || ''}
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
                                        value={charity.code || ''}
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
                                        name={"charityEin"}
                                        onChange={updateField}
                                        value={charity.ein || ''}
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
                            <ReactInputMask mask={'+19999999999'} name={"phone"} value={charity.phone || ''}
                                            onChange={updateField}>
                                <Input/>
                            </ReactInputMask>
                        </StyledField>
                        <StyledField>
                            <Label>Email address</Label>
                            <Input name={"email"} value={charity.email || ''} onChange={updateField}/>
                        </StyledField>
                        <StyledField>
                            <Label>Address</Label>
                            <Input name={"address"} value={charity.address || ''} onChange={updateField}/>
                        </StyledField>
                        <Row>
                            <Col>
                                <StyledField>
                                    <Label>City</Label>
                                    <Input name={"city"} value={charity.city || ''} onChange={updateField}/>
                                </StyledField>
                            </Col>
                            <Col>
                                <StyledField>
                                    <Label>State</Label>
                                    <ReactInputMask mask={'aa'} name={"state"} value={charity.state || ''}
                                                    onChange={updateField}>
                                        <Input/>
                                    </ReactInputMask>
                                </StyledField>
                            </Col>
                            <Col>
                                <StyledField>
                                    <Label>Zip</Label>
                                    <ReactInputMask mask={'99999'} name={"zip"} value={charity.zip || ''}
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
                            {/*<AutocompleteInput value={getZoneNameById(charity.zoneId)} options={zones.map(z => z.name!)}*/}
                            {/*                   label={"Zone"}/>*/}
                        </StyledField>

                        <FormTitle>Other</FormTitle>
                        <StyledField>
                            <Label>Notes</Label>
                            <Textarea name={"notes"} value={charity.notes} onChange={updateField}/>
                        </StyledField>
                        <StyledField>
                            <Label>Secondary Drop-Off Location Info</Label>
                            {/*<Textarea name={"secondaryDropLocation"} value={charity.secondaryDropLocation}*/}
                            {/*          onChange={updateField}/>*/}
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
    )
}

const StyledCol = styled(Col)`
  ${p => mediaQuery('down', 'xs', p.theme)} {
    margin-top: ${p => p.theme.space.sm};
  }
`;

const StyledField = styled(Field)`
  margin-bottom: 15px;
`

const StyledLabel = styled(Label)`
  text-transform: capitalize;
`
const StyledTiles = styled(Tiles)`
  margin-bottom: 10px
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

/*
* Name
* Different roles and points of contact
* Closing by / last drop-off time
* Address
* Zone
* Logo
* Days of operation -> Exceptions
* Donation list / sum
* Secondary drop point
*/
