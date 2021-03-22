import {createContext} from "react";
import {Donation} from "../domain/Donation";


export type DonorContextType = {
    donationData: Donation
    setDonationData: (data: Donation) => void
    actions: {
        submitDonation: (data: Donation) => Promise<void>
    }

}

export const DonorContext = createContext<DonorContextType>(
    {} as DonorContextType
)
