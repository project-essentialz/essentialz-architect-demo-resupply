import {User} from "./User";
import {autoserialize, autoserializeAs} from "cerialize";
import {Schedule} from "./Schedule";

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

    schedule?: Schedule     // Ignored in serialization

    constructor() {
        this.user.role = 'driver'
    }

}
