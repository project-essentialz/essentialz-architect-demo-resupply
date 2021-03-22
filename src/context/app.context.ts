import {User} from "../domain/User";
import {createContext} from "react";


type AppContextActionsType = {

}
export type AppContextType = {
    currentUser: User | undefined
    setCurrentUser: (user: User) => void

    actions: AppContextActionsType
}

export const AppContext = createContext<AppContextType>({} as AppContextType)