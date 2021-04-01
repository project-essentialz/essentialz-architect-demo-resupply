import styled from "styled-components";
import {mediaQuery, PALETTE} from "@zendeskgarden/react-theming";
import React, {useEffect, useState} from "react";
import {ReactComponent as PlusIcon} from "../assets/icons/plus-light.svg";
import {ReactComponent as MinusIcon} from "../assets/icons/minus-light.svg";
import {MD, SM, XXL} from "@zendeskgarden/react-typography";

type Props = {
    icon: () => JSX.Element,
    name: string,
    description?: string
    field: string,
    onValueChanged?: (key:string, value: number) => void
}
export const DonationCategoryTileComponent = (props: Props) => {
    const [value, setValue] = useState(0)

    useEffect(() => {
        if (props.onValueChanged) {
            props.onValueChanged(props.field, value);
        }
    }, [value])

    const inc = () => {
        setValue(value + 1)
    }
    const dec = () => {
        setValue(value - (value === 0 ? 0 : 1))
    }
    return (
        <DonationTypeBox>
            <MD style={{color: "#2c3b64"}} isBold>{props.name}</MD>
            {props.description && (
                <SM>{props.description}</SM>
            )}
            <BoxContent>
                <StyledIcon isactive={value > 0}>
                    {props.icon()}
                </StyledIcon>
                <Value isactive={value > 0}>x {value}</Value>
            </BoxContent>
            <BoxContentBottom>
                <StyledBoxButtonAdd onClick={inc}><PlusIcon/></StyledBoxButtonAdd>
                <StyledBoxButtonRemove onClick={dec}><MinusIcon/></StyledBoxButtonRemove>
            </BoxContentBottom>
        </DonationTypeBox>
    )
}
type ValueProps = {
    isactive: boolean
}

const BoxContentBottom = styled.div`
  //border-top: 1px solid #2c3b64;
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin-top: 10px;
`

const StyledBoxButton = styled.div`
  text-align: center;
  height: 40px;
  width: 40px;
  border-radius: 20px;
  padding: 10px;
  margin-bottom: 10px;
`
const StyledBoxButtonAdd = styled(StyledBoxButton)`
  color: ${PALETTE.green["400"]};
  background-color: ${PALETTE.grey["300"]};
`
const StyledBoxButtonRemove = styled(StyledBoxButton)`
  color: ${PALETTE.red["400"]};
  background-color: ${PALETTE.grey["300"]};
`


const BoxContent = styled.div`
  display: flex;
  flex: 1;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`

const Value = styled(XXL)`
  margin-left: 30px;
  position: relative;
  transition: 150ms all ease-in-out;
  right: ${(props: ValueProps) => props.isactive ? 0 : -200}px;
  opacity: ${(props: ValueProps) => props.isactive ? 1 : 0}px;;
  //color: white
`

const StyledIcon = styled.div`
  width: 100px;
  height: 70px;
  color: #2c3b64;
  transition: all 100ms ease-in-out;
  position: relative;
  right: ${(props: ValueProps) => props.isactive ? 0 : -30}px;
  user-select: none;
  ${p => mediaQuery('down', 'md', p.theme)} {
    width: 50px;
    height: 40px;
  }
`

const DonationTypeBox = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 1px solid ${PALETTE.grey["400"]};
  border-radius: 8px;
  flex: 1;
  padding-top: 10px;
  height: 200px;
  margin: 10px 0;
  overflow: hidden;
  user-select: none;
  cursor: pointer;
  transition: all 100ms ease-in-out;

  &:hover {
    transform: scale(1.05);
  }

  &:active {
    transform: scale(1.01);
  }
`
