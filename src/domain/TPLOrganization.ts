import {Driver} from "./Driver";
import {Zone} from "./Zone";
import {autoserialize, autoserializeAs} from "cerialize";

export class TPLOrganization{
    @autoserialize
    id?: string

    @autoserialize
    name: string = ''

    @autoserializeAs(Driver)
    drivers: Driver[] = []

    @autoserializeAs('account_manager_name')
    accountManagerName: string = ''

    @autoserialize
    phone: string = ''

    @autoserialize
    email: string = ''

    @autoserializeAs(Zone)
    zones: Zone[] = []


}
