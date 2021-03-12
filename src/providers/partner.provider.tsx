import React, {useState} from "react";
import {Donation, Partner, Zone} from "../services/domain";
import {PartnerContext} from "../context";
import Api from "../services/api.service";
import {routes} from "../services/api.routes";

type Props = {
    children: any
}
export const PartnerProvider = (props: Props) => {
    const [partnerData, setPartnerData] = useState<Partner>({} as Partner)
    const [partners, setPartners] = useState<Partner[]>([] as Partner[])


    const submitPartner = (data: Partner): Promise<void> => {
        return Api.$<Partner>(routes.partners).create(data).then(
            result => {
                console.log(result);
                return;
            }
        )
    }

    const getAllPartners = () => {
        return Api.$<Partner>(routes.partners).getAll().then(partners => {
            setPartners(partners);
            // Putting all of the requests for zone resolution in an array
            const zonePromises = partners.map((partner, index) => (
                Api.$<Zone>(routes.zones).get(partner.zoneId).then(zone => {
                    return {zone, index};
                })
            ))
            // Putting all of the requests for counting completed jobs in an array
            const countPromises = partners.map((partner, index) => (
                Api.$<Donation>(routes.donations).getAll(`driver_id=${partner.id}&donation_status=completed`)
                    .then(donations => {
                        return {count: donations.length, index}
                    })
            ))

            // Resolving all zones
            Promise.all(zonePromises).then((values) => {
                values.forEach((value) => {
                    partners[value.index].zone = value.zone;
                    setPartners([...partners])
                })
            })

            // Resolving counting jobs per driver
            Promise.all(countPromises).then((values) => {
                values.forEach((value) => {
                    partners[value.index].numberOfCompletedJobs = value.count;
                    setPartners([...partners])
                })
            })
        })
    }

    return (
        <PartnerContext.Provider
            value={
                {
                    partnerData, setPartnerData, partners, setPartners,
                    actions: {submitPartner, getAllPartners}
                }
            }>
            {props.children}
        </PartnerContext.Provider>
    )
}
