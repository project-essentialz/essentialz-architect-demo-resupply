import React from "react";
import {Col, Grid, Row} from "@zendeskgarden/react-grid";
import {MD, XXL} from "@zendeskgarden/react-typography";
import styled from "styled-components";
import {Button, IconButton} from "@zendeskgarden/react-buttons";
import {ReactComponent as BackIcon} from "../../assets/icons/long-arrow-left-light.svg";
import {useHistory} from "react-router-dom";

type Props = {
    title: string,
    subtitle: string
    children: JSX.Element
    showBackButton?: boolean
    extraButtons?: {title: string, onClick: () => void}[]
}
export const BaseContainer = (props: Props) => {
    const history = useHistory()

    const renderExtraButtons = () => {
        if (props.extraButtons){
            return props.extraButtons.map(button => (
                <StyledButton size={'small'} key={`button-${button.title}`} onClick={button.onClick}>
                    {button.title}
                </StyledButton>
            ))
        }
    }

    return (
        <Grid>
            <Row>
                <HorizontalOrientedColumn>
                    {props.showBackButton && (
                        <StyledIconButton
                            onClick={history.goBack}
                            aria-label="square back" isBasic={false} isPill={false}>
                            <BackIcon />
                        </StyledIconButton>
                    )}
                    <ContainerTitle>
                        <XXL>{props.title}</XXL>
                        <MD>{props.subtitle}</MD>
                    </ContainerTitle>
                </HorizontalOrientedColumn>
                <Col xs={1}>
                    <ExtraButtons>
                        {renderExtraButtons()}
                    </ExtraButtons>
                </Col>
            </Row>
            <Row>
                <Col>
                    <InnerContainer>
                        {props.children}
                    </InnerContainer>
                </Col>
            </Row>
        </Grid>
    )
}

const InnerContainer = styled.div`
  margin-top: 30px;
`
const HorizontalOrientedColumn = styled(Col)`
  display: flex;
  flex-direction: row;
  align-items: center;
`
const ContainerTitle = styled.div`
    
`
const StyledIconButton = styled(IconButton)`
  margin-right: 20px;
`
const ExtraButtons = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
`
const StyledButton = styled(Button)`
  margin-left: 20px;
`

