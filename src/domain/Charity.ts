import {Zone} from "./Zone";
import {CharityAdmin} from "./CharityAdmin";

export class Charity {

    id?: string
    name: string = ''

    ein: string = ''
    code: string = ''

    logoUrl: string = ''

    pocName: string = ''
    phone: string = ''
    email: string = ''

    address: string = ''
    city: string = ''
    state: string = ''
    zip: string = ''

    daysOfOperation: {
        mon: boolean
        tue: boolean
        wed: boolean
        thu: boolean
        fri: boolean
        sat: boolean
        sun: boolean
    }

    closingBy: string = ''

    zoneId?: string
    /**
     *
     * @private field _zone
     * See getter and setter named {@link zone}
     */
    private _zone?: Zone

    notes: string = ''
    secondaryDropOff?: Charity

    refId: string = ''
    salesforceId: string = ''

    charityAdmins: CharityAdmin[] = []

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
    }

    get zone(): Zone | undefined {
        return this._zone;
    }

    set zone(value: Zone | undefined) {
        this._zone = value;
        if (value) {
            this.zoneId = value.id
        }
    }
}
