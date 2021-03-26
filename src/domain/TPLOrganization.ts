import {Driver} from "./Driver";
import {Zone} from "./Zone";
import {autoserialize, autoserializeAs} from "cerialize";

export class TPLOrganization{
    get zone(): Zone | undefined {
        return this._zone;
    }

    set zone(value: Zone | undefined) {
        this._zone = value;
        this.zoneId = value?.id
    }

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

    @autoserializeAs('zone_id')
    zoneId?: string

    private _zone?: Zone

}
