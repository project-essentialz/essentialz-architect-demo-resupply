import React from "react";
import {Col, Grid, Row} from "@zendeskgarden/react-grid";
import {MD, XXL} from "@zendeskgarden/react-typography";
import styled from "styled-components";
import {IconButton} from "@zendeskgarden/react-buttons";
import {ReactComponent as BackIcon} from "../../assets/icons/long-arrow-left-light.svg";
import {useHistory} from "react-router-dom";

type Props = {
    title: string,
    subtitle: string
    children: JSX.Element
    showBackButton?: boolean
}
export const BaseContainer = (props: Props) => {
    const history = useHistory()
    return (
        <StyledGrid>
            <Row>
                <Col xs={12}>
                    <ContainerTitle>
                        <XXL isBold>{props.title}</XXL>
                        <MD>{props.subtitle}</MD>
                    </ContainerTitle>
                </Col>
            </Row>
            <Row>
                <Col>
                    <InnerContainer>
                        {props.children}
                    </InnerContainer>
                </Col>
            </Row>
        </StyledGrid>
    )
}

const StyledGrid = styled(Grid)`
  //height: 100vh;
  //overflow: scroll
`

const InnerContainer = styled.div`
  margin-top: 30px;
`
const HorizontalOrientedColumn = styled(Col)`
  display: flex;
  flex-direction: row;
  align-items: center;
`
const ContainerTitle = styled.div`
  color: #2c3b64;
  text-align: center;
`
const StyledIconButton = styled(IconButton)`
  margin-right: 20px;
`
