import React, {ChangeEvent, useContext, useState} from "react";
import {BaseContainer} from "./base.container";
import {Well} from "@zendeskgarden/react-notifications";
import {Col, Row} from "@zendeskgarden/react-grid";
import styled from "styled-components";
import {Field, FileUpload, Hint, Input, Label} from "@zendeskgarden/react-forms";
import {LG} from "@zendeskgarden/react-typography";
import {useDropzone} from "react-dropzone";
import {AutocompleteInput} from "../components";
import {Button} from "@zendeskgarden/react-buttons";
import {PartnerContext} from "../context";
import {useHistory} from "react-router-dom";
import {Partner} from "../services/domain";
import ReactInputMask from "react-input-mask";

const options = [
    'Asparagus',
    'Brussel sprouts',
    'Cauliflower',
    'Garlic',
    'Jerusalem artichoke',
    'Kale',
    'Lettuce',
    'Onion',
    'Mushroom',
    'Potato',
    'Radish',
    'Spinach',
    'Tomato',
    'Yam',
    'Zucchini'
];

export const CreateTruckContainer = () => {
    const [partner, setPartner] = useState<Partner>({} as Partner)
    const {actions} = useContext(PartnerContext)
    const history = useHistory()

    const updateField = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const {value, name} = e.target;
        setPartner({
            ...partner,
            [name]: value
        })
    }

    const submitPartner = () => {
        actions.submitPartner(partner).then(
            _ => history.goBack()
        )
    }

    const onDrop = React.useCallback((acceptedFiles: File[]) => {
        alert(`${acceptedFiles.length} files accepted for upload`);
    }, []);


    //TODO: Change this to PDF only
    const {getRootProps, getInputProps, isDragActive} = useDropzone({
        accept: ['image/jpeg', 'image/png', 'image/gif'],
        onDrop
    });

    return (
        <BaseContainer showBackButton title={"Add a driver"}
                       subtitle={"Provide necessary details in order to add a driver to the system"}>
            <Row>
                <Col lg={6}>
                    <Well>
                        <FormTitle>Basic information</FormTitle>
                        <StyledField>
                            <Label>Organization name</Label>
                            <Input name={"organizationName"} onChange={updateField}/>
                        </StyledField>
                        <StyledField>
                            <Label>Account manager</Label>
                            <Input name={"accountManager"} onChange={updateField}/>
                        </StyledField>
                        <StyledField>
                            <Label>Driver name</Label>
                            <Input name={"driverName"} onChange={updateField}/>
                        </StyledField>
                        <StyledField>
                            <Label>Phone number</Label>
                            <ReactInputMask mask={'+19999999999'} name={"phone"} onChange={updateField}>
                                <Input />
                            </ReactInputMask>
                        </StyledField>
                        <StyledField>
                            <Label>Email</Label>
                            <Input name={"email"} onChange={updateField}/>
                        </StyledField>
                        <StyledField>
                            <Label>Vehicle type</Label>
                            <Input name={"vehicleType"} onChange={updateField}/>
                        </StyledField>
                        <StyledField>
                            <Label>License plate</Label>
                            <Input name={"licencePlace"} onChange={updateField}/>
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
                            <Col>
                                <StyledField>
                                    <Label>Photo of a driver's licence</Label>
                                    <Hint>
                                        Drag the photo file from your computer or click here to pick.
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
                            <AutocompleteInput options={options} label={"Zone"}/>
                        </StyledField>

                        <StyledButtonWrapper>
                            <Button onClick={submitPartner}>Add new delivery partner</Button>
                        </StyledButtonWrapper>

                    </Well>
                </Col>
            </Row>
        </BaseContainer>
    )
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


