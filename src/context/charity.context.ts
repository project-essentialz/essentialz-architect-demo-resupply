import {createContext} from "react";
import {Charity} from "../services/domain";

export type CharityContextType = {
    charity: Charity
    setCharity: (data: Charity) => void

    charities: Charity[]
    setCharities: (data: Charity[]) => void

    actions: {
        resetCharity: () => void
        createCharity: (data: Charity) => Promise<void>
        updateCharity: (data: Charity) => Promise<void>
        getAllCharities: () => Promise<void>
        getCharity: (id:string) => Promise<Charity>
        removeCharity: (id:string) => Promise<void>
    }

}

export const CharityContext = createContext<CharityContextType>(
    {} as CharityContextType
)
