import React from "react";
import {Col, Grid, Row} from "@zendeskgarden/react-grid";
import {MD, XXL} from "@zendeskgarden/react-typography";
import styled from "styled-components";
import {Button, IconButton} from "@zendeskgarden/react-buttons";
import {ReactComponent as BackIcon} from '../assets/icons/long-arrow-left-light.svg';
import {useHistory} from "react-router-dom";

type Props = {
    title: string;
    subtitle: string;
    children: any;
    showBackButton?: boolean;
    extraButtons?: { title: string, onClick: () => void }[]
    innerContainerTopSpacing?: number
}
export const BaseContainer = (props: Props) => {
    const history = useHistory();
    const {title, subtitle, children, extraButtons, showBackButton, innerContainerTopSpacing = 50} = props;

    const renderExtraButtons = () => {
        if (extraButtons) {
            return extraButtons.map(button => (
                <StyledButton key={`button-${button.title}`} onClick={button.onClick}>
                    {button.title}
                </StyledButton>
            ))
        }
    }

    const goBack = () => {
        history.goBack()
    }
    return (
        <Grid>
            <Row>
                <HorizontalOrientedColumn>
                    {showBackButton && (
                        <IconButton
                            onClick={goBack}
                            aria-label="square back" isBasic={false} isPill={false}>
                            <BackIcon/>
                        </IconButton>
                    )}
                    <ContainerTitle>
                        <XXL>{title}</XXL>
                        <MD>{subtitle}</MD>
                    </ContainerTitle>
                </HorizontalOrientedColumn>
                <Col>
                    <ExtraButtons>
                        {renderExtraButtons()}
                    </ExtraButtons>
                </Col>
            </Row>
            <Row>
                <Col>
                    <InnerContainer style={{marginTop: innerContainerTopSpacing}}>
                        {children}
                    </InnerContainer>
                </Col>
            </Row>
        </Grid>
    )
}

const InnerContainer = styled.div`
  //margin-top: 50px;
`
const ContainerTitle = styled.div`
  margin-left: 20px;
`

const HorizontalOrientedColumn = styled(Col)`
  display: flex;
  flex-direction: row;
`
const ExtraButtons = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
`
const StyledButton = styled(Button)`
  margin-left: 20px;
`
