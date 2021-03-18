import {BaseContainer} from "../base.container";
import {Col, Row} from "@zendeskgarden/react-grid";
import {Well} from "@zendeskgarden/react-notifications";
import {Field, Input, Label, Textarea} from "@zendeskgarden/react-forms";
import React, {ChangeEvent, useContext, useEffect, useState} from "react";
import styled from "styled-components";
import {LG} from "@zendeskgarden/react-typography";
import {ZoneContext} from "../../context";
import {useHistory} from "react-router-dom";
import {Tag} from "@zendeskgarden/react-tags";
import {PALETTE} from "@zendeskgarden/react-theming";
import {Button} from "@zendeskgarden/react-buttons";

export const CreateZoneContainer = () => {
    const history = useHistory()
    const {zoneData, setZoneData, actions} = useContext(ZoneContext)

    const [zips, setZips] = useState<string[]>([])

    const updateZips = (e: ChangeEvent<HTMLTextAreaElement>) => {
        const {value} = e.target;
        setZips(value.split(','))
    }

    useEffect(() => {
        setZoneData({
            ...zoneData,
            zips: [...zips]
        })
    }, [zips])

    const removeZip = (index: number) => {
        let _zips = [...zips]
        _zips.splice(index,1);
        setZips([..._zips])
    }

    const updateField = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const {value, name} = e.target;
        setZoneData({
            ...zoneData,
            [name]: value
        })
    }

    const submitZone = () => {
        actions.submitZone(zoneData).then(
            _ => history.goBack()
        )
    }

    return <BaseContainer title={"Create zone"} subtitle={"Specify zip codes for new zone"}>
        <Row>
            <Col lg={6}>
                <Well>
                    <FormTitle>Zone information</FormTitle>
                    <StyledField>
                        <Label>Zone name</Label>
                        <Input name={"name"} onChange={updateField}/>
                    </StyledField>

                    <Row>
                        <Col>
                            <StyledField>
                                <Label>Zip codes CSV</Label>
                                <Textarea value={zips.join(',')} onChange={updateZips}/>
                            </StyledField>
                        </Col>
                        <Col>
                            <StyledField>
                                <Label>Zip codes</Label>
                                <TagContainer>
                                    {zips.map((zip, index) => (
                                        <StyledTag onClick={() => removeZip(index)} key={`${zip}-${index}`}>
                                            <span>{zip}</span>
                                        </StyledTag>
                                    ))}
                                </TagContainer>
                            </StyledField>
                        </Col>
                    </Row>

                    <StyledButtonWrapper>
                        <Button onClick={submitZone}>Create zone</Button>
                    </StyledButtonWrapper>
                </Well>
            </Col>
        </Row>
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
