import React, {useState} from "react";
import {Zone} from "../services/domain";
import {ZoneContext} from "../context";
import Api from "../services/api.service";
import {routes} from "../services/api.routes";

type Props = {
    children: any
}
export const ZoneProvider = (props: Props) => {
    const [zoneData, setZoneData] = useState<Zone>({} as Zone)
    const [zones, setZones] = useState<Zone[]>([] as Zone[])


    const submitZone = (data: Zone): Promise<void> => {
        return Api.$<Zone>(routes.zones).create(data).then(
            result => {
                console.log(result);
                return;
            }
        )
    }

    const getAllZones = () => {
        return Api.$<Zone>(routes.zones).getAll().then(setZones)
    }


    return (
        <ZoneContext.Provider value={{zoneData, setZoneData, zones, setZones, actions: {submitZone, getAllZones}}}>
            {props.children}
        </ZoneContext.Provider>
    )
}
