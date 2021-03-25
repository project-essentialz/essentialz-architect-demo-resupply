import {User} from "./User";

/**
 * CharityAdmin is a composite object consisted of information about the person that will access the system
 * and the {@link User} object allowing this entity to be able to access the platform.
 */
export class CharityAdmin {
    name?: string
    phone?: string
    email?: string
    user: User


    constructor() {
        this.user = new User();
    }
}
