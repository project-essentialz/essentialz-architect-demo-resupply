import React, {ChangeEvent, useContext, useState} from "react";
import styled from "styled-components";
import {XL, XXL, XXXL} from "@zendeskgarden/react-typography";
import {Field, Input, InputGroup, Label} from "@zendeskgarden/react-forms";
import {Button} from "@zendeskgarden/react-buttons";
import {AuthRequest} from "../../services/domain";
import {UserContext} from "../../context";
import {useHistory} from "react-router-dom";
import {Inline} from "@zendeskgarden/react-loaders";
import {Col, Grid, Row} from "@zendeskgarden/react-grid";

import {ReactComponent as Logo} from "../../assets/images/logo.svg";
import {Space} from "../../components";

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
        actions.authenticate(auth, 'charity_admin')
            .then((res) => {
                setAuthErrors(false);
                setLoading(false)
            })
            .then(goToHome)
            .catch(e => {
                setAuthErrors(true);
                setTimeout(() => {
                    setAuthErrors(false);
                }, 2000)
                setLoading(false)
            })

    }

    const getButtonContent = () => {
        if (isLoading) {
            return <Inline/>
        }
        if (hasAuthErrors) {
            return "Credentials do not match. Please try again."
        }
        return "Sign in"
    }

    return (
        <Page>
            <Grid style={{height: 300}}>
                <Row>
                    <Col>
                        <Logo style={{width: 100, height: 100}}/>
                        <Space size={10}/>
                        <Title>Login to your ReSupply portal</Title>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form>
                            <StyledField>
                                <Label>Email</Label>
                                <InputGroup>
                                    <Input name={"username"} onChange={updateField}/>
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
                    </Col>
                </Row>

            </Grid>
        </Page>
    )
}

const Title = styled(XL)`
  margin-bottom: 30px;
`
const Form = styled.div`

`
const Page = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
  justify-content: center;
  align-items: center;
  padding: 10px
`
const StyledField = styled(Field)`
  margin-bottom: 15px;
`

