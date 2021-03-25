import {Donation} from "./Donation";

export class ScheduleItem{
    am: Donation[] = []
    pm: Donation[] = []

    public hasAvailability(): boolean{
        return this.am.length + this.pm.length < 3;
    }
}
export class Schedule{
    id?: string
    content?: Map<string, ScheduleItem>
}
