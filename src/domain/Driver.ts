import {User} from "./User";
import {autoserialize, autoserializeAs} from "cerialize";

export class Driver {
    @autoserialize
    id?: string

    @autoserialize
    name: string = ''

    @autoserialize
    phone: string = ''

    @autoserialize
    email: string = ''

    @autoserializeAs(User)
    user: User = new User();

    @autoserializeAs('schedule_id')
    scheduleId?: string

    schedule?: any     // Ignored in serialization

    constructor() {
        this.user.role = 'driver'
    }

}
