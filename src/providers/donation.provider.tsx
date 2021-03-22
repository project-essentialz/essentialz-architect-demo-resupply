import React, {useState} from "react";
import {DonationContext} from "../context/";
import Api, {method} from "../services/api.service";
import {routes} from "../services/api.routes";
import {Donation} from "../domain/Donation";

type Props = {
    children: any
}
export const DonationProvider = (props: Props) => {
    const [donations, setDonations] = useState<Donation[]>([] as Donation[])

    const getAllDonations = (q?: string) => {
        return Api.$<Donation>(routes.donations).getAll(q).then(setDonations)
    }

    const getDonation = (id: string) => {
        return Api.$<Donation>(routes.donations).get(id)
    }

    const acceptDonation = (donation: Donation) => {
        return Api.$<Donation>(routes.acceptServiceRequest).call(method.post, {
            partnerId: '4737eb58-542e-42fe-b46e-3cdd0db78d99',
            donationId: donation.id
        })
        // return Api.$<Donation>(routes.donations).update(donation.id, {
        //     donationStatus: 'driver_assigned',
        //     driverId: 'es-test-01'
        // } as Donation)
    }

    const updateDonation = (donation: Donation) => {
        return Api.$<Donation>(routes.donations).update(donation.id!, donation)
    }

    return (
        <DonationContext.Provider value={
            {
                donations,
                setDonations,
                actions: {
                    getAllDonations,
                    getDonation,
                    acceptDonation,
                    updateDonation
                }
            }
        }>
            {props.children}
        </DonationContext.Provider>
    )
}
