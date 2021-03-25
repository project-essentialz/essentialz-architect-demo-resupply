import {Driver} from "./Driver";
import {Zone} from "./Zone";

export class TPLOrganization{
    get zone(): Zone | undefined {
        return this._zone;
    }

    set zone(value: Zone | undefined) {
        this._zone = value;
        this.zoneId = value?.id
    }
    id?: string
    name: string = ''
    drivers: Driver[] = []

    accountManagerName: string = ''
    phone: string = ''
    email: string = ''

    zoneId?: string
    private _zone?: Zone

}
