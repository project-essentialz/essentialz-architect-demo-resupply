import {createContext} from "react";
import {Zone} from "../services/domain";

export type ZoneContextType = {
    zoneData: Zone
    setZoneData: (data: Zone) => void

    zones: Zone[];
    setZones: (data: Zone[]) => void

    actions: {
        getAllZones: () => Promise<void>
        submitZone: (data: Zone) => Promise<void>
    }

}

export const ZoneContext = createContext<ZoneContextType>(
    {} as ZoneContextType
)
