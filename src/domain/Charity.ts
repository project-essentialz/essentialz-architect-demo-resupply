import {Zone} from "./Zone";
import {CharityAdmin} from "./CharityAdmin";
import {autoserialize, autoserializeAs} from "cerialize";

class DaysOfOperation{
    mon: boolean = true
    tue: boolean = true
    wed: boolean = true
    thu: boolean = true
    fri: boolean = true
    sat: boolean = false
    sun: boolean = false
}

export class Charity {
    @autoserialize
    id?: string

    @autoserialize
    name: string = ''

    @autoserialize
    ein: string = ''

    @autoserialize
    code: string = ''

    @autoserializeAs('logo_url')
    logoUrl: string = ''

    @autoserializeAs('poc_name')
    pocName: string = ''

    @autoserialize
    phone: string = ''

    @autoserialize
    email: string = ''

    @autoserialize
    address: string = ''

    @autoserialize
    city: string = ''

    @autoserialize
    state: string = ''

    @autoserialize
    zip: string = ''

    @autoserializeAs('days_of_operation')
    daysOfOperation: DaysOfOperation = new DaysOfOperation()

    @autoserializeAs('closing_by')
    closingBy: string = ''

    @autoserializeAs(Zone)
    zones: Zone[] = []

    @autoserialize
    notes: string = ''

    @autoserializeAs('secondary_drop_off')
    secondaryDropOff?: Charity

    @autoserializeAs('ref_id')
    refId: string = ''

    @autoserializeAs('salesforce_id')
    salesforceId: string = ''

    @autoserializeAs('charity_admins')
    charityAdmins: CharityAdmin[] = []


    constructor() {
        this.daysOfOperation = new DaysOfOperation();
    }
}


