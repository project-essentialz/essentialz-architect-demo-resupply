import {Zone} from "./zone";

export type Partner = {
    id: string;
    organizationName: string
    driverName: string
    phone: string
    email: string
    vehicleType: string
    licencePlace: string
    zoneId: string
    zone?: Zone
    certificateOfInsurance: string
    driversLicence: string
    accountManager: string
}
