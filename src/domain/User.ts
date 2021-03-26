import {autoserialize, autoserializeAs} from "cerialize";


class UserDetails {
    @autoserialize
    name: string = ''

    @autoserialize
    phone: string = ''

    @autoserialize
    email: string = ''
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
    details?: UserDetails

    @autoserializeAs(UserAuthorization)
    authorization?: UserAuthorization
}
