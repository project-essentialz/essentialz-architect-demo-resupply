import {createContext} from "react";
import {Zone} from "../domain/Zone";

export type ZoneContextType = {
    zoneData: Zone
    setZoneData: (data: Zone) => void

    zones: Zone[];
    setZones: (data: Zone[]) => void

    actions: {
        getAllZones: () => Promise<void>
        getZone: (id: string) => Promise<void>

        createZone: (data: Zone) => Promise<void>
        updateZone: (data: Zone) => Promise<void>
    }

}

export const ZoneContext = createContext<ZoneContextType>(
    {} as ZoneContextType
)
