import React, {useState} from "react";
import {ZoneContext} from "../context";
import Api from "../services/api.service";
import {routes} from "../services/api.routes";
import {Zone} from "../domain/Zone";

type Props = {
    children: any
}
export const ZoneProvider = (props: Props) => {
    const [zoneData, setZoneData] = useState<Zone>(new Zone())
    const [zones, setZones] = useState<Zone[]>([] as Zone[])


    const createZone = (data: Zone): Promise<void> => {
        return Api.$<Zone>(routes.zones).create(data).then(
            result => {
                return;
            }
        )
    }

    const updateZone = (data: Zone): Promise<void> => {
        return Api.$<Zone>(routes.zones).update(data.id!, data).then(
            result => {
                return;
            }
        )
    }

    const getAllZones = () => {
        return Api.$<Zone>(routes.zones).getAll().then(setZones)
    }

    const getZone = (id: string) => {
        return Api.$<Zone>(routes.zones).get(id).then(setZoneData)
    }


    return (
        <ZoneContext.Provider value={{
            zoneData,
            setZoneData,
            zones,
            setZones,
            actions: {
                createZone,
                updateZone,
                getAllZones,
                getZone
            }
        }}>
            {props.children}
        </ZoneContext.Provider>
    )
}
