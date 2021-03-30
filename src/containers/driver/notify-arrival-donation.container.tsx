import {Donation} from "../../domain";
import {BaseContainer} from "./base.container";
import {useContext, useEffect, useState} from "react";
import {DonationContext} from "../../context";
import {useHistory, useParams} from "react-router-dom";
import {Paragraph, Span, XL} from "@zendeskgarden/react-typography";
import {Space} from "../../components";
import {Button} from "@zendeskgarden/react-buttons";

export const NotifyArrivalDonationContainer = () => {
    const history = useHistory();
    const [donation, setDonation] = useState<Donation>()
    const {actions} = useContext(DonationContext)

    const params = useParams<{ id: string }>()
    const {id} = params;

    useEffect(() => {
        actions.getDonation(id).then(setDonation);
    }, [])

    const progress = () => {
        history.push(`/donations/${id}/adjust-the-quote`)
    }

    return (
        <BaseContainer title={"Notify Arrival!"} showBackButton showAsModal>
            <>
                <Paragraph>
                    We let the donor know that you are almost there!.
                </Paragraph>
                <Paragraph>
                    Use the contact information provided to contact the donor if needed!.
                </Paragraph>
                <Paragraph>
                    Don't forget to look for special instructions before you arrive!
                </Paragraph>

                <Space size={50}/>
                <XL><Span isBold>Up next:</Span> Adjust the quote</XL>

                <Space size={50}/>

                <Button
                    onClick={progress}
                    isStretched> Notify Arrival</Button>
            </>
        </BaseContainer>
    )
}
