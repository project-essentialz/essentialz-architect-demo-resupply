import {Donation} from "./Donation";


/**
 * Due to dynamic nature of a Schedule object Type is dynamically created when necessary.
 * Look for references and see usage.
 */
export type ScheduleItem = {
    am: Donation[]
    pm: Donation[]
}
