import {createContext} from "react";
import {Donation} from "../domain";


export type CharityScopeContextType = {
    donations: Donation[]
    setDonations: (data: Donation[]) => void

    donation: Donation
    setDonation: (data: Donation) => void

    actions: {
        getAllDonations: (q?:string) => Promise<void>
        getDonation: (id:string) => Promise<Donation>

    }

}

export const CharityScopeContext = createContext<CharityScopeContextType>(
    {} as CharityScopeContextType
)
