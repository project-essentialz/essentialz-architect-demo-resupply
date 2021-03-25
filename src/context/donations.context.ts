import {createContext} from "react";
import {Donation} from "../domain";


export type DonationContextType = {
    donations: Donation[]
    setDonations: (data: Donation[]) => void

    donation: Donation
    setDonation: (data: Donation) => void

    actions: {
        getAllDonations: (q?:string) => Promise<void>
        getDonation: (id:string) => Promise<Donation>

        createDonation: (donation: Donation) => Promise<Donation>
        updateDonation: (donation: Donation) => Promise<Donation>
        acceptDonation: (donation: Donation) => Promise<Donation>

    }

}

export const DonationContext = createContext<DonationContextType>(
    {} as DonationContextType
)
