import React, {ChangeEvent, useContext, useEffect, useState} from "react";
import {BaseContainer} from "../base.container";
import {Well} from "@zendeskgarden/react-notifications";
import {Col, Row} from "@zendeskgarden/react-grid";
import styled from "styled-components";
import {Field, FileUpload, Hint, Input, Label} from "@zendeskgarden/react-forms";
import {LG} from "@zendeskgarden/react-typography";
import {useDropzone} from "react-dropzone";
import {Button} from "@zendeskgarden/react-buttons";
import {PartnerContext, ZoneContext} from "../../context";
import {useHistory, useParams} from "react-router-dom";
import ReactInputMask from "react-input-mask";
import {TPLOrganization, Zone} from "../../domain";
import {AutocompleteField} from "../../components/auto-complete-field";
import _ from 'lodash'
import {EntityRouteParams} from "../../types";
import {MultiSelectField} from "../../components/multi-select-field";

export const CreatePartnerContainer = () => {
    const [mode, setMode] = useState('new')
    const {partner, setPartner, actions} = useContext(PartnerContext)
    const {zones} = useContext(ZoneContext);
    const {id} = useParams<EntityRouteParams>()
    const history = useHistory()

    useEffect(() => {
        if (id) {
            setMode('edit');
            actions.getPartner(id);
        } else {
            setPartner(new TPLOrganization());
        }
    }, [id])

    const updatePartner = (field: string, value: any) => {
        const p = new TPLOrganization()
        Object.assign(p, partner);
        _.set(p, field, value);
        setPartner(p);
    }
    const updateField = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const {value, name} = e.target;
        updatePartner(name, value)
    }

    const updateZones = (zones: Zone[]) => {
        updatePartner('zones', zones);
    }

    const goBack = () => history.goBack();
    const submitPartner = () => {
        mode === 'new' ? actions.createPartner(partner).then(goBack) : actions.updatePartner(partner).then(goBack)
    }
    const getTitle = () => mode === 'new' ? 'Create 3PL' : 'Edit 3PL'


    const onDrop = React.useCallback((acceptedFiles: File[]) => {
        alert(`${acceptedFiles.length} files accepted for upload`);
    }, []);
    const resolveZoneName = (value: Zone) => value ? (value.name ? value.name : '') : ''

    //TODO: Change this to PDF only
    const {getRootProps, getInputProps, isDragActive} = useDropzone({
        accept: ['image/jpeg', 'image/png', 'image/gif'],
        onDrop
    });

    return partner ? (
        <BaseContainer
            showBackButton
            title={getTitle()}
            subtitle={"Provide necessary details in order to add a 3PL to the system"}
        >
            <Row>
                <Col lg={6}>
                    <Well>
                        <FormTitle>Basic information</FormTitle>
                        <StyledField>
                            <Label>Organization name</Label>
                            <Input value={partner.name} name={"name"} onChange={updateField}/>
                        </StyledField>
                        <StyledField>
                            <Label>Account manager</Label>
                            <Input value={partner.accountManagerName} name={"accountManagerName"}
                                   onChange={updateField}/>
                        </StyledField>
                        <StyledField>
                            <Label>Phone number</Label>
                            <ReactInputMask value={partner.phone} mask={'+19999999999'} name={"phone"}
                                            onChange={updateField}>
                                <Input/>
                            </ReactInputMask>
                        </StyledField>
                        <StyledField>
                            <Label>Email</Label>
                            <Input value={partner.email} name={"email"} onChange={updateField}/>
                        </StyledField>
                        <Row>
                            <Col>
                                <StyledField>
                                    <Label>Certificate of insurance</Label>
                                    <Hint>
                                        Drag the PDF file from your computer or click here to pick.
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
                            </Col>
                        </Row>

                        <StyledField>
                            <MultiSelectField
                                options={zones}
                                label={"Zone"}
                                valueResolver={resolveZoneName}
                                onValueSelected={updateZones}
                                value={partner.zones}
                            />
                        </StyledField>

                        <StyledButtonWrapper>
                            <Button onClick={submitPartner}>{getTitle()}</Button>
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


