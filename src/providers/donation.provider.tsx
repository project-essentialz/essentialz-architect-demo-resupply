import React, {useEffect, useState} from "react";
import {DonationContext} from "../context/";
import Api, {method} from "../services/api.service";
import {routes} from "../services/api.routes";
import {Donation, Driver, TPLOrganization} from "../domain";

type Props = {
    children: any
}
export const DonationProvider = (props: Props) => {
    const [donation, setDonation] = useState<Donation>(new Donation())
    const [donations, setDonations] = useState<Donation[]>([])


    useEffect(() => {
        getAllDonations()
    }, [])

    const getAllDonations = (q?: string) => {
        return Api.$<Donation>(routes.donations).getAll(q).then(setDonations)
    }

    const getDonation = (id: string) => {
        // Todo: This might be required for all the gets out there.

        return Api.$<Donation>(routes.donations).get(id).then((result) => {
            const d = new Donation();
            Object.assign(d, result);
            setDonation(d);
            return d;
        })
    }

    const acceptDonation = (donation: Donation) => {
        return Api.$<Donation>(routes.acceptServiceRequest).call(method.post, {
            partnerId: '4737eb58-542e-42fe-b46e-3cdd0db78d99',
            donationId: donation.id
        })
    }

    const updateDonation = (donation: Donation) => {
        return Api.$<Donation>(routes.donations).update(donation.id!, donation)
    }

    const createDonation = (donation: Donation) => {
        return Api.$<Donation>(routes.donations).create(donation).then(d => {
            getAllDonations();
            return d
        })
    }

    const assignDonation = (donation: Donation, partner: TPLOrganization, driver: Driver) => {
        const d = new Donation();
        Object.assign(d, donation);
        d.driver = driver;
        d.tplOrganization = partner;
        updateDonation(d).then((result) => {
            setDonation(d);
        });
    }

    return (
        <DonationContext.Provider value={
            {
                donations,
                setDonations,
                donation,
                setDonation,
                actions: {
                    getAllDonations,
                    getDonation,
                    acceptDonation,
                    updateDonation,
                    createDonation
                }
            }
        }>
            {props.children}
        </DonationContext.Provider>
    )
}
