import React from "react";
import {Col, Grid, Row} from "@zendeskgarden/react-grid";
import {LG, MD, XXL, XXXL} from "@zendeskgarden/react-typography";
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
                <HorizontalOrientedColumn>
                    {props.showBackButton && (
                        <StyledIconButton
                            onClick={history.goBack}
                            aria-label="square back" isBasic={false} isPill={false}>
                            <BackIcon />
                        </StyledIconButton>
                    )}
                    <ContainerTitle>
                        <XXXL isBold>{props.title}</XXXL>
                        <LG>{props.subtitle}</LG>
                    </ContainerTitle>
                </HorizontalOrientedColumn>
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
    color: white;
`
const StyledIconButton = styled(IconButton)`
  margin-right: 20px;
`
