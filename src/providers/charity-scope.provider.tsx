import React, {useContext, useEffect, useState} from "react";
import {UserContext} from "../context/";
import Api from "../services/api.service";
import {routes} from "../services/api.routes";
import {Donation} from "../domain";
import {CharityScopeContext} from "../context/charity-scope.context";

type Props = {
    children: any
}
export const CharityScopeProvider = (props: Props) => {
    const {user} = useContext(UserContext);
    const [donation, setDonation] = useState<Donation>(new Donation())
    const [donations, setDonations] = useState<Donation[]>([])


    useEffect(() => {
        getAllDonations()
    }, [user])

    const getAllDonations = (q?: string) => {
        return Api.$<Donation>(routes.donations).getAll(q).then(donations => {
            setDonations(donations.filter(d => {
                if (d.charity) {
                    return d.charity!.id === user.details.charityId
                }
                return false;
            }));
        })
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

    return (
        <CharityScopeContext.Provider value={
            {
                donations,
                setDonations,
                donation,
                setDonation,
                actions: {
                    getAllDonations,
                    getDonation
                }
            }
        }>
            {props.children}
        </CharityScopeContext.Provider>
    )
}
