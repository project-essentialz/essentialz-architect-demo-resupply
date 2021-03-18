import React, {ChangeEvent, useContext, useState} from "react";
import styled from "styled-components";
import {XXXL} from "@zendeskgarden/react-typography";
import {Field, Input, InputGroup, Label} from "@zendeskgarden/react-forms";
import {Button} from "@zendeskgarden/react-buttons";
import {ReactComponent as Logo} from "../../assets/images/logo.svg";
import {AuthRequest} from "../../services/domain";
import {UserContext} from "../../context";
import {useHistory} from "react-router-dom";
import {Inline} from "@zendeskgarden/react-loaders";

export const LoginContainer = () => {
    const history = useHistory()
    const {actions} = useContext(UserContext)
    const [auth, setAuth] = useState<AuthRequest>({
        provider: 'email'
    } as AuthRequest)
    const [isLoading, setLoading] = useState(false);
    const [hasAuthErrors, setAuthErrors] = useState(false);

    const updateField = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const {value, name} = e.target;
        setAuth({
            ...auth,
            [name]: value
        } as AuthRequest)
    }

    const goToHome = () => history.replace("/");
    const authenticate = () => {
        setLoading(true);
        setAuthErrors(true);
        const authData = auth;
        authData!.username = authData?.username + "@resupplyme.com";
        actions.authenticate(authData)
            .then(() => {
                setAuthErrors(false);
                setLoading(false)
            })
            .then(goToHome)
            .catch(e => {
                setAuthErrors(true);
                setLoading(false)
            })

    }

    const getButtonContent = () => {
        if (isLoading){
            return <Inline/>
        }
        if (hasAuthErrors){
            return "Credentials do not match. Please try again."
        }
        return "Sign in"
    }

    return (
        <Page>
            <Form>
                <Title isBold>Sign in to ReSupply Captain Portal</Title>
                <StyledField>
                    <Label>Email</Label>
                    <InputGroup>
                        <Input name={"username"} onChange={updateField}/>
                        <Button disabled>@resupplyme.com</Button>
                    </InputGroup>

                </StyledField>
                <StyledField>
                    <Label>Password</Label>
                    <Input type={"password"} name={"password"} onChange={updateField}/>
                </StyledField>
                <Button
                    onClick={authenticate}
                    isStretched
                    isPrimary={!hasAuthErrors && !isLoading}
                    isDanger={hasAuthErrors && !isLoading}
                    disabled={isLoading}
                >
                    {getButtonContent()}
                </Button>
            </Form>
            <Logo style={{padding: 80}}/>
        </Page>
    )
}

const Title = styled(XXXL)`
  margin-bottom: 30px;
`
const Form = styled.div`
  margin-right: 50px;
  max-width: 400px;
`
const Page = styled.div`
  position: relative;
  display: flex;
  width: 100vw;
  height: 100vh;
  justify-content: center;
  align-items: center;
`
const StyledField = styled(Field)`
  margin-bottom: 15px;
`

