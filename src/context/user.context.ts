import {createContext} from "react";
import {Auth, AuthRequest, User} from "../services/domain";

export type UserContextType = {
    authData: Auth
    setAuthData: (data: Auth) => void

    user: User
    setUser: (user: User) => void

    users: User[]
    setUsers: (users: User[]) => void

    actions: {
        authenticate: (data: AuthRequest) => Promise<Auth>
        logout: () => void,
        getUserData: () => void,

        getUsers: () => void
        createUser: (user: User) => Promise<void>

        getUser: (id: string) => void
        resetUser: () => void
    }

}

export const UserContext = createContext<UserContextType>(
    {} as UserContextType
)
