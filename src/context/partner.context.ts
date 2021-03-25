import {createContext} from "react";
import {Partner} from "../services/domain";
import {ResolutionTarget} from "../services/entityResolver";
import {Driver, TPLOrganization} from "../domain";

export type PartnerContextType = {
    partner: TPLOrganization
    setPartner: (data: TPLOrganization) => void

    partners: TPLOrganization[];
    setPartners: (data: TPLOrganization[]) => void



    actions: {
        getAllPartners: () => Promise<void>
        getPartner: (id: string) => Promise<TPLOrganization>
        submitPartner: (data: TPLOrganization) => Promise<TPLOrganization>
        createPartner: (data: TPLOrganization) => Promise<TPLOrganization>
        updatePartner: (data: TPLOrganization) => Promise<TPLOrganization>
    }

}

export const PartnerContext = createContext<PartnerContextType>(
    {} as PartnerContextType
)
