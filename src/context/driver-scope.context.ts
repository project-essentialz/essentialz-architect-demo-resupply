import {Donation, Driver, TPLOrganization, User, Zone} from "../domain";
import {createContext} from "react";

export type DriverScopeContextType = {
    driver?: Driver
    setDriver: (driver: Driver) => void

    tplOrganization?: TPLOrganization
    setTplOrganization: (org: TPLOrganization) => void

    donations?: Donation[]
    setDonations: (donations: Donation[]) => void

    schedule?: any
    setSchedule: (schedule: any) => void

    actions: {

    }

}

export const DriverScopeContext = createContext<DriverScopeContextType>(
    {} as DriverScopeContextType
)
