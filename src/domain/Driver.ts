import {User} from "./User";
import {autoserializeAs} from "cerialize";

export class Driver {

    @autoserializeAs(User)
    user: User = new User();

    @autoserializeAs('schedule_id')
    scheduleId?: string

    schedule?: any     // Ignored in serialization

    constructor() {
        this.user.role = 'driver'
    }


    get phone(): string {
        return this.user.details.phone;
    }
    get email(): string {
        return this.user.details.email;
    }
    get name(): string {
        return this.user.details.name;
    }
}
