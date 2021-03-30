import React from "react";
import {Col, Grid, Row} from "@zendeskgarden/react-grid";
import {MD, XXL} from "@zendeskgarden/react-typography";
import styled from "styled-components";
import {Button, IconButton} from "@zendeskgarden/react-buttons";
import {ReactComponent as BackIcon} from "../../assets/icons/long-arrow-left-light.svg";
import {ReactComponent as CloseIcon} from "../../assets/icons/minus-light.svg";
import {useHistory} from "react-router-dom";

type Props = {
    title: string,
    subtitle?: string
    children: JSX.Element
    showBackButton?: boolean
    extraButtons?: {title: string, onClick: () => void}[],
    showAsModal?: boolean
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
                    {(props.showBackButton && !props.showAsModal ) && (
                        <StyledIconButton
                            onClick={history.goBack}
                            aria-label="square back" isBasic={false} isPill={false}>
                            <BackIcon />
                        </StyledIconButton>
                    )}
                    <ContainerTitle>
                        <XXL>{props.title}</XXL>
                        {props.subtitle && <MD>{props.subtitle}</MD>}
                    </ContainerTitle>
                </HorizontalOrientedColumn>
                <Col xs={1}>
                    <ExtraButtons>
                        {renderExtraButtons()}
                        {props.showAsModal && (
                            <StyledCloseIconButton
                                isDanger
                                onClick={() => history.replace("/")}
                                aria-label="square back" isBasic={false} isPill={false}>
                                <CloseIcon />
                            </StyledCloseIconButton>
                        )}
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

const StyledCloseIconButton = styled(IconButton)`
`

const ExtraButtons = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
`
const StyledButton = styled(Button)`
  margin-left: 20px;
`

