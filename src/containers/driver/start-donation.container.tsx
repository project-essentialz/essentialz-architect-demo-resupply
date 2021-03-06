import {Donation} from "../../domain";
import {BaseContainer} from "./base.container";
import {useContext, useEffect, useState} from "react";
import {DonationContext} from "../../context";
import {useHistory, useParams} from "react-router-dom";
import {Paragraph, Span, XL} from "@zendeskgarden/react-typography";
import {Space} from "../../components";
import {Button} from "@zendeskgarden/react-buttons";
import {DonationStatus} from "../../domain/Donation";

export const StartDonationContainer = () => {
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
            donation.donationStatus = DonationStatus.driver_en_route;
            donation.eventType = `donation_${DonationStatus.driver_en_route}`
            actions.updateDonation(donation).then(() => {
                history.push(`/donations/${id}/notify-arrival`)
            })
        }

    }

    return (
        <BaseContainer title={"Start the job"} showBackButton showAsModal>
            <>
                <Paragraph>
                    Once you hit the start jub button the donor will know that you are on the way!
                </Paragraph>
                <Paragraph>
                    You can go back by pressing the close button in the top right corner to view donation details at any point.
                </Paragraph>

                <Space size={50}/>
                <XL><Span isBold>Up next:</Span> Notify of arrival</XL>

                <Space size={50}/>

                <Button
                    onClick={progress}
                    isStretched> Start job</Button>
            </>
        </BaseContainer>
    )
}
