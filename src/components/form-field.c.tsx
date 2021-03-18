import React, {ChangeEvent} from "react";
import {Field, Input, Label} from "@zendeskgarden/react-forms";
import styled from "styled-components";
import ReactInputMask from "react-input-mask";

type FormFieldProps = {
    label: string
    name: string
    mask?: string
    onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void

}

export const FormField = (props: FormFieldProps) => {
    return (
        <StyledField>
            <Label>{props.label}</Label>
            {props.mask ? (
                <ReactInputMask mask={props.mask} name={props.name} onChange={props.onChange}>
                    <Input/>
                </ReactInputMask>
            ) : (
                <Input name={props.name} onChange={props.onChange}/>
            )}

        </StyledField>
    )
}

const StyledField = styled(Field)`
  margin-bottom: 15px;
`