import {MediaInput} from "@zendeskgarden/react-forms";
import {ReactComponent as CalendarIcon} from "../assets/icons/calendar-alt-light.svg";
import {Datepicker} from "@zendeskgarden/react-datepickers";
import React, {useEffect, useState} from "react";
import moment from "moment";

type DatePickerProps = {
    name: string
    value: string | undefined
    format?: string
    onChange: (field: string, value: string) => void,
    minValue?: Date
}
export const DatePicker = (props: DatePickerProps) => {
    const {name, value, format = "MM-DD-YYYY", onChange, minValue} = props;
    const [date, setDate] = useState<Date>(new Date())

    useEffect(() => {
        if (value) {
            console.log("Component", value)
            setDate(moment(value, format).toDate())
        }
    }, [value])

    useEffect(() => {
        onChange(name, moment(date).format(format));
    }, [date])

    return (
        <Datepicker value={date} onChange={setDate} minValue={minValue}>
            <MediaInput start={<CalendarIcon/>} name={name}/>
        </Datepicker>
    )
}
