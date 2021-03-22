import {BaseContainer} from "../base.container";
import {Col, Row} from "@zendeskgarden/react-grid";
import {Well} from "@zendeskgarden/react-notifications";
import {Field, Input, Label, Textarea} from "@zendeskgarden/react-forms";
import React, {ChangeEvent, useContext, useEffect, useState} from "react";
import styled from "styled-components";
import {LG} from "@zendeskgarden/react-typography";
import {ZoneContext} from "../../context";
import {useHistory, useParams} from "react-router-dom";
import {Tag} from "@zendeskgarden/react-tags";
import {PALETTE} from "@zendeskgarden/react-theming";
import {Button} from "@zendeskgarden/react-buttons";
import {Zone} from "../../domain/Zone";
import _ from "lodash";

export const CreateZoneContainer = () => {
    const history = useHistory()
    const {zoneData, setZoneData, actions} = useContext(ZoneContext)

    const [mode, setMode] = useState('new')
    const params = useParams<{ id: string }>()
    const {id} = params;

    useEffect(() => {
        if (id){
            setMode('edit');
            actions.getZone(id);
        }else{
            setMode('new');
            setZoneData(new Zone());
        }
    }, [])

    const updateZone = (field: string, data: any) => {
        const z = new Zone();
        Object.assign(z, zoneData);
        _.set(z, field, data);
        setZoneData(z);
    }
    const updateZips = (e: ChangeEvent<HTMLTextAreaElement>) => {
        const {value} = e.target;
        const zips = value.split(",");
        updateZone("zips", zips)
    }
    const removeZip = (index: number) => {
        let zips = [...zoneData.zips]
        zips.splice(index,1);
        updateZone('zips', zips)
    }
    const updateField = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const {value, name} = e.target;
        updateZone(name, value);
    }

    const submitZone = () => {
        if (mode === 'new'){
            actions.createZone(zoneData).then(
                _ => history.goBack()
            )
        }else{
            actions.updateZone(zoneData).then(
                _ => history.goBack()
            )
        }
    }

    const getTitle = () => {
        return mode === 'new' ? 'Create zone' : 'Update zone'
    }

    return <BaseContainer showBackButton title={getTitle()} subtitle={"Specify zip codes for your zone"}>
        {zoneData && (
            <Row>
                <Col lg={6}>
                    <Well>
                        <FormTitle>Zone information</FormTitle>
                        <StyledField>
                            <Label>Zone name</Label>
                            <Input value={zoneData.name || ''} name={"name"} onChange={updateField}/>
                        </StyledField>

                        <Row>
                            <Col>
                                <StyledField>
                                    <Label>Zip codes CSV</Label>
                                    <Textarea value={zoneData.zips.join(',') || ''} onChange={updateZips}/>
                                </StyledField>
                            </Col>
                            <Col>
                                <StyledField>
                                    <Label>Zip codes</Label>
                                    <TagContainer>
                                        {zoneData.zips.map((zip, index) => (
                                            <StyledTag onClick={() => removeZip(index)} key={`${zip}-${index}`}>
                                                <span>{zip}</span>
                                            </StyledTag>
                                        ))}
                                    </TagContainer>
                                </StyledField>
                            </Col>
                        </Row>

                        <StyledButtonWrapper>
                            <Button onClick={submitZone}>{getTitle()}</Button>
                        </StyledButtonWrapper>
                    </Well>
                </Col>
            </Row>
        )}
    </BaseContainer>
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
const TagContainer = styled.div``
const StyledTag = styled(Tag)`
  margin: 5px;
  transition: all 100ms ease-in-out;
  cursor: pointer !important;

  &:hover {
    background-color: ${PALETTE.red["600"]};
    color: white
  }
`
const StyledButtonWrapper = styled(StyledField)`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
`
