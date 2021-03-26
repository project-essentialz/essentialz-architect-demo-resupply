import {Donation} from "./Donation";
import {autoserialize, autoserializeAs} from "cerialize";

export class ScheduleItem{
    @autoserializeAs(Donation)
    am: Donation[] = []

    @autoserializeAs(Donation)
    pm: Donation[] = []

    public hasAvailability(): boolean{
        return this.am.length + this.pm.length < 3;
    }
}

export class Schedule{
    @autoserialize
    id?: string

    @autoserializeAs(Map)
    content?: Map<string, ScheduleItem>
}
