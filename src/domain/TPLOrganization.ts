import {Driver} from "./Driver";
import {Zone} from "./Zone";
import {autoserialize, autoserializeAs} from "cerialize";

export class TPLOrganization {
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

    public getAvailableDrivers(date: string) {
        return this.drivers.filter(driver => {
            const schedule = driver.schedule;
            if (schedule) {
                const scheduleForDate = schedule[date];
                if (scheduleForDate) {
                    // Driver has some assignments for specified date
                    const slot1 = scheduleForDate.slot1 || 0;
                    const slot2 = scheduleForDate.slot2 || 0;
                    const slot3 = scheduleForDate.slot3 || 0;
                    const slot4 = scheduleForDate.slot4 || 0;
                    // One of 3 available slots is not filled so driver has availability
                    return (slot1 + slot2 + slot3 + slot4) < 3
                } else {
                    // Driver has nothing assigned for that date
                    return true;
                }
            }
            return false;

        });
    }


}
