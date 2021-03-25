import React, {useEffect, useState} from "react";
import {PartnerContext} from "../context";
import Api from "../services/api.service";
import {routes} from "../services/api.routes";
import {Driver, TPLOrganization} from "../domain";

type Props = {
    children: any
}
export const PartnerProvider = (props: Props) => {
    const [partner, setPartner] = useState<TPLOrganization>(new TPLOrganization())
    const [partners, setPartners] = useState<TPLOrganization[]>([])

    useEffect(() => {
        getAllPartners();
    }, [])

    const getPartner = (id: string): Promise<TPLOrganization> => {
        return Api.$<TPLOrganization>(routes.partners).get(id, "TPLOrganization").then((data) => {
            setPartner(data);
            return data;
        });
    }

    const submitPartner = (data: TPLOrganization): Promise<TPLOrganization> => {
        return Api.$<TPLOrganization>(routes.partners).create(data).then(
            data => {
                getAllPartners()
                setPartner(new TPLOrganization());
                return data;
            }
        )
    }

    const updatePartner = (data: TPLOrganization): Promise<TPLOrganization> => {
        return Api.$<TPLOrganization>(routes.partners).update(data.id!, data).then(
            data => {
                getAllPartners()
                return data;
            }
        )
    }

    const getAllPartners = () => {
        return Api.$<TPLOrganization>(routes.partners).getAll().then(setPartners)
    }

    const fetchDriverSchedule = () => {

    }

    return (
        <PartnerContext.Provider
            value={
                {
                    partner,
                    setPartner,
                    partners,
                    setPartners,
                    actions: {
                        getAllPartners,
                        getPartner,
                        submitPartner,
                        createPartner: submitPartner,
                        updatePartner
                    }
                }
            }>
            {props.children}
        </PartnerContext.Provider>
    )
}
