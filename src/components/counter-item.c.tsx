import React, {useEffect, useState} from "react";
import {Col, Row} from "@zendeskgarden/react-grid";
import {Label} from "@zendeskgarden/react-forms";
import {IconButton} from "@zendeskgarden/react-buttons";
import {ReactComponent as MinusIcon} from "../assets/icons/minus-light.svg";
import {ReactComponent as PlusIcon} from "../assets/icons/plus-light.svg";

type CounterItemProps = {
    title: string,
    field: string,
    value?: any,
    onChange: (field: string, count: number) => void
}
export const CounterItem = (props: CounterItemProps) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
        if (props.value) {
            setCount(parseInt(props.value, 10));
        }
    }, [props.value])

    useEffect(() => {
        props.onChange(props.field, count);
    }, [count])

    return (
        <Row style={{marginBottom: 10}}>
            <Col style={{display: "flex", alignItems: "center"}}>
                <Label>{props.title}</Label>
            </Col>
            <Col>
                <IconButton style={{marginRight: 5}} isBasic={false} isPill={false}
                            onClick={() => setCount(count - (count > 0 ? 1 : 0))}>
                    <MinusIcon/>
                </IconButton>
                <IconButton isBasic={false} isPill={false} onClick={() => setCount(count + 1)}>
                    <PlusIcon/>
                </IconButton>
            </Col>
            <Col style={{display: "flex", alignItems: "center"}} xs={1}><Label>{count}</Label></Col>
        </Row>
    )
}
