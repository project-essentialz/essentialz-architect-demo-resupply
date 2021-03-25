import {createContext} from "react";
import {Charity} from "../domain/Charity";
import {User} from "../domain/User";

export type CharityContextType = {
    charity: Charity
    setCharity: (data: Charity) => void

    charities: Charity[]
    setCharities: (data: Charity[]) => void

    actions: {
        getAllCharities: () => Promise<void>        // Preserves list of all charities in charities state variable
        getCharity: (id:string) => Promise<void>    // Preserves single charity record in charity state variable

        createCharity: (data: Charity) => Promise<Charity>  // Creates a charity returning the created record
        updateCharity: (data: Charity) => Promise<Charity>  // Updates the charity returning the updated record
        removeCharity: (id:string) => Promise<void>         // Removes the charity

        addUser: (user: User) => Promise<void>      // Probably will be removed
    }

}

export const CharityContext = createContext<CharityContextType>(
    {} as CharityContextType
)
