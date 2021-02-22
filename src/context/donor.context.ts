import {createContext} from "react";
import {Donation} from "../services/domain";

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
