import {createContext} from "react";
import {Donation} from "../domain/Donation";


export type DonationContextType = {
    donations: Donation[]
    setDonations: (data: Donation[]) => void

    actions: {
        getAllDonations: (q?:string) => Promise<void>
        getDonation: (id:string) => Promise<Donation>
        updateDonation: (donation: Donation) => Promise<Donation>
        acceptDonation: (donation: Donation) => Promise<Donation>
    }

}

export const DonationContext = createContext<DonationContextType>(
    {} as DonationContextType
)
