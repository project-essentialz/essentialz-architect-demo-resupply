import styled from "styled-components";
import {mediaQuery, PALETTE} from "@zendeskgarden/react-theming";
import React, {useEffect, useState} from "react";
import {ReactComponent as PlusIcon} from "../assets/icons/plus-light.svg";
import {ReactComponent as MinusIcon} from "../assets/icons/minus-light.svg";
import {MD, XXL} from "@zendeskgarden/react-typography";

type Props = {
    icon: () => JSX.Element,
    name: string,
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
            <BoxContent>
                <StyledIcon isactive={value > 0}>
                    {props.icon()}
                </StyledIcon>
                <Value isactive={value > 0}>x {value}</Value>
            </BoxContent>
            <MD style={{color: "white"}} isBold>{props.name}</MD>
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
  border-top: 1px solid ${PALETTE.white};
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
`

const StyledBoxButton = styled.div`
  flex: 1;
  text-align: center;
  height: 40px;
  padding: 10px;

`
const StyledBoxButtonAdd = styled(StyledBoxButton)`
  background-color: ${PALETTE.green["400"]};
  color: ${PALETTE.white};
`
const StyledBoxButtonRemove = styled(StyledBoxButton)`
  background-color: ${PALETTE.red["400"]};
  color: ${PALETTE.white};
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
  color: white
`

const StyledIcon = styled.div`
  width: 100px;
  height: 70px;
  color: white;
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
  border: 1px solid ${PALETTE.white};
  border-radius: 8px;
  flex: 1;
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
