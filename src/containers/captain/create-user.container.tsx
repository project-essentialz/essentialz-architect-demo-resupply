import {BaseContainer} from "../base.container";
import {Col, Row} from "@zendeskgarden/react-grid";
import {Well} from "@zendeskgarden/react-notifications";
import {Field, Input, Label} from "@zendeskgarden/react-forms";
import React, {ChangeEvent, useContext, useEffect, useState} from "react";
import styled from "styled-components";
import {LG} from "@zendeskgarden/react-typography";
import {Button} from "@zendeskgarden/react-buttons";
import {AutocompleteInput} from "../../components";
import {UserContext} from "../../context";
import {useHistory, useParams} from "react-router-dom";

export const CreateUserContainer = () => {
    const [mode, setMode] = useState<string>('new')
    const history = useHistory()
    const params = useParams<{ id: string }>();

    const {user, setUser, actions} = useContext(UserContext)
    const {id} = params;

    useEffect(() => {
        if (id) {
            setMode('edit');
            actions.getUser(id);
        } else {
            actions.resetUser()
        }
    }, [])

    const updateField = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const {value, name} = e.target;
        if (name === 'name') {
            setUser({
                ...user,
                details: {
                    ...user.details,
                    name: value
                }
            })
        } else {
            setUser({
                ...user,
                [name]: value
            })
        }
    }

    const submitUser = () => {
        actions.createUser(user).then(
            _ => history.goBack()
        )
    }

    return (
        <BaseContainer showBackButton title={'Create user'} subtitle={'Create a user with a defined role'}>
            <>
                <Row>
                    <Col lg={6}>
                        <Well>
                            <FormTitle>User information</FormTitle>
                            <StyledField>
                                <Label>Name</Label>
                                <Input value={user.details ? user.details.name : ''} name={"name"} onChange={updateField}/>
                            </StyledField>
                            <StyledField>
                                <Label>Email</Label>
                                <Input value={user.username} name={"username"} onChange={updateField}/>
                            </StyledField>
                            <StyledField>
                                <Label>Password</Label>
                                <Input type='password' name={"password"} onChange={updateField}/>
                            </StyledField>
                            <StyledField>
                                <AutocompleteInput
                                    label={'Role'}
                                    hideSearchIcon
                                    value={user.role}
                                    onValueSelected={(role) =>{setUser({...user, role: role!})}}
                                    options={['captain', 'scheduler']}/>
                            </StyledField>

                            <StyledButtonWrapper>
                                <Button onClick={submitUser}>Add new user</Button>
                            </StyledButtonWrapper>
                        </Well>
                    </Col>
                </Row>
            </>
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

