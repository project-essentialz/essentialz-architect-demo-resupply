import {Donation} from "../../domain";
import {BaseContainer} from "./base.container";
import React, {useContext, useEffect, useState} from "react";
import {DonationContext} from "../../context";
import {useHistory, useParams} from "react-router-dom";
import {Span, XL} from "@zendeskgarden/react-typography";
import {Space} from "../../components";
import {Button} from "@zendeskgarden/react-buttons";
import Tick from '../../assets/images/tick.png'
import {DonationStatus} from "../../domain/Donation";

export const QuoteAcceptedDonationContainer = () => {
    const history = useHistory();
    const [donation, setDonation] = useState<Donation>()
    const {actions} = useContext(DonationContext)

    const params = useParams<{ id: string }>()
    const {id} = params;

    useEffect(() => {
        actions.getDonation(id).then(setDonation);
    }, [])

    const progress = () => {
        if (donation){
            history.push(`/donations/${id}/add-pictures`)
        }
    }

    return (
        <BaseContainer title={"Quote is Accepted!"} showBackButton showAsModal>
            <>
                <Space size={50}/>
                <img src={Tick}/>
                <Space size={50}/>
                <XL><Span isBold>Up next:</Span> Adjust the quote</XL>
                <Space size={50}/>
                <Button
                    onClick={progress}
                    isStretched> Add pictures</Button>
            </>
        </BaseContainer>
    )
}
