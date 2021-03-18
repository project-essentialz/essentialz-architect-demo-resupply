import {MediaInput} from "@zendeskgarden/react-forms";
import {ReactComponent as CalendarIcon} from "../assets/icons/calendar-alt-light.svg";
import {Datepicker} from "@zendeskgarden/react-datepickers";
import React, {useEffect, useState} from "react";

type DatePickerProps = {
    name: string
    onChange: (value: string) => void
}
export const DatePicker = () => {
    const [date, setDate] = useState(new Date())

    useEffect(() => {
        console.log(date);
    }, [date])
    return (
        <Datepicker value={date} onChange={setDate}>
            <MediaInput start={<CalendarIcon/>} name={"date"}/>
        </Datepicker>
    )
}