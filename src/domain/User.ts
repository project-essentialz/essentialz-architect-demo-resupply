import {autoserialize, autoserializeAs} from "cerialize";


export class UserDetails {
    @autoserialize
    name: string = ''

    @autoserialize
    phone: string = ''

    @autoserialize
    email: string = ''

    @autoserialize
    tplOrganizationId: string = ''

    @autoserialize
    scheduleId: string = ''

    @autoserialize
    charityId: string = ''

}

class UserAuthorization{
    @autoserialize
    token?: string
}

export class User{
    @autoserialize
    username?: string

    @autoserialize
    password?: string

    @autoserialize
    role?: string

    @autoserializeAs(UserDetails)
    details: UserDetails

    @autoserializeAs(UserAuthorization)
    authorization?: UserAuthorization

    constructor() {
        this.details = new UserDetails();
    }
}
