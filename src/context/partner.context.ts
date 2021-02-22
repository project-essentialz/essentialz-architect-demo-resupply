import {createContext} from "react";
import {Partner} from "../services/domain";

export type PartnerContextType = {
    partnerData: Partner
    setPartnerData: (data: Partner) => void

    partners: Partner[];
    setPartners: (data: Partner[]) => void

    actions: {
        getAllPartners: () => Promise<void>
        submitPartner: (data: Partner) => Promise<void>
    }

}

export const PartnerContext = createContext<PartnerContextType>(
    {} as PartnerContextType
)
