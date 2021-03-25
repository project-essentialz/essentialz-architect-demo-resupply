import {User} from "./User";

export class Driver {
    id?: string
    name: string = ''
    phone: string = ''
    email: string = ''
    user: User = new User();

    scheduleId?: string

    constructor() {
        this.user.role = 'driver'
    }



}
