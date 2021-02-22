import {createContext} from "react";
import {Auth, AuthRequest} from "../services/domain";

export type UserContextType = {
    authData: Auth
    setAuthData: (data: Auth) => void
    actions: {
        authenticate: (data: AuthRequest) => Promise<Auth>
        logout: () => void,
        getUserData: () => void,
    }

}

export const UserContext = createContext<UserContextType>(
    {} as UserContextType
)
