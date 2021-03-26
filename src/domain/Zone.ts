import {autoserialize} from "cerialize";

export class Zone {
    @autoserialize
    id?: string
    @autoserialize
    name?: string
    @autoserialize
    zips: string[] = []

}
