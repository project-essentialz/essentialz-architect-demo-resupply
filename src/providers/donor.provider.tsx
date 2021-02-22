import React, {useState} from "react";
import {Donation} from "../services/domain";
import {DonorContext} from "../context/donor.context";
import Api, {method} from "../services/api.service";
import {routes} from "../services/api.routes";

type Props = {
    children: any
}
export const DonorProvider = (props: Props) => {
    const [donationData, setDonationData] = useState<Donation>(
        {
            donationStatus: 'submitted',
            driverId: ''
        } as Donation)


    const submitDonation = (data: Donation):Promise<void> => {
        return Api.$<Donation>(routes.donations).create(data)
            .then(
            result => {
                Api.$(routes.createServiceRequest).call(method.post, {
                    donationId: result.id
                }).then(_ => {
                    console.log(result);
                    return;
                })

            }
        )
    }

    return (
        <DonorContext.Provider value={{donationData, setDonationData, actions: {submitDonation}}}>
            {props.children}
        </DonorContext.Provider>
    )
}
