import {createContext} from "react";
import {Auth, AuthRequest} from "../services/domain";
import {User} from "../domain";

export type UserContextType = {
    authData: Auth
    setAuthData: (data: Auth) => void

    user: User
    setUser: (user: User) => void

    users: User[]
    setUsers: (users: User[]) => void

    actions: {
        authenticate: (data: AuthRequest, restrict?: string) => Promise<Auth>
        logout: () => void,
        getUserData: () => void,

        getUsers: () => void
        createUser: (user: User) => Promise<User>

        getUser: (id: string) => void
        resetUser: () => void
    }

}

export const UserContext = createContext<UserContextType>(
    {} as UserContextType
)
