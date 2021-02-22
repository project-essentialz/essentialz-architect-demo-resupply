import React, {useState} from "react";
import {Donation, Partner} from "../services/domain";
import {PartnerContext} from "../context";
import Api from "../services/api.service";
import {routes} from "../services/api.routes";

type Props = {
    children: any
}
export const PartnerProvider = (props: Props) => {
    const [partnerData, setPartnerData] = useState<Partner>({} as Partner)
    const [partners, setPartners] = useState<Partner[]>([] as Partner[])


    const submitPartner = (data: Partner):Promise<void> => {
        return Api.$<Partner>(routes.partners).create(data).then(
            result => {
                console.log(result);
                return;
            }
        )
    }

    const getAllPartners = () => {
        return Api.$<Partner>(routes.partners).getAll().then(setPartners)
    }



    return (
        <PartnerContext.Provider value={{partnerData, setPartnerData, partners, setPartners, actions: {submitPartner, getAllPartners}}}>
            {props.children}
        </PartnerContext.Provider>
    )
}
