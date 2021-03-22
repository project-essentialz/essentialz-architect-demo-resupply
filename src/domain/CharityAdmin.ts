import {User} from "./User";
import {Charity} from "./Charity";

export class CharityAdmin extends User{
    details?: {
        name: string,
        phone?: string,
        email?: string,
        charity: Charity
    }
}
