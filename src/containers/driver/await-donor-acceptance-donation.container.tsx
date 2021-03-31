import {Donation} from "../../domain";
import {BaseContainer} from "./base.container";
import React, {useContext, useEffect, useState} from "react";
import {DonationContext} from "../../context";
import {useHistory, useParams} from "react-router-dom";
import {Paragraph} from "@zendeskgarden/react-typography";
import {Space} from "../../components";
import QRCode from "react-qr-code";

export const AwaitDonorAcceptanceDonationContainer = () => {
    const history = useHistory();
    const [donation, setDonation] = useState<Donation>()
    const {actions} = useContext(DonationContext)

    const params = useParams<{ id: string }>()
    const {id} = params;

    useEffect(() => {
        actions.getDonation(id).then(setDonation);
        setTimeout(() => {

            history.replace(`/donations/${id}/quote-accepted`)
        }, 5000)
    }, [])


    return (
        <BaseContainer title={"Awaiting donor acceptance!"} showBackButton showAsModal>
            <>
                <Paragraph>
                    We are waiting on your donor to accept the quote!
                </Paragraph>
                <Paragraph>
                    If they are having trouble, help them by having them scan this QR code to take them to their quote!
                </Paragraph>

                <Space size={50}/>
                <QRCode value={`http://localhost:3001/d/${donation?.donationCode}`}/>
            </>
        </BaseContainer>
    )
}
