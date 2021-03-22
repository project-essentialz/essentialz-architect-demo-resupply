import {Zone} from "./Zone";

export class Charity {
    id?: string
    name?: string

    ein?: string
    code?: string

    logoUrl?: string

    pocName?: string
    phone?: string
    email?: string

    address?: string
    city?: string
    state?: string
    zip?: string

    daysOfOperation: {
        mon: boolean
        tue: boolean
        wed: boolean
        thu: boolean
        fri: boolean
        sat: boolean
        sun: boolean
    }

    closingBy?: string

    zone?: Zone
    notes: string
    secondaryDropOff?: Charity
    refId?: string
    salesforceId?: string


    constructor() {
        this.daysOfOperation = {
            mon: true,
            tue: true,
            wed: true,
            thu: true,
            fri: true,
            sat: false,
            sun: false,
        }
        this.notes = ''
    }
}
