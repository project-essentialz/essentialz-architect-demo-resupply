import {Donation} from "../../domain";
import {BaseContainer} from "./base.container";
import {useContext, useEffect, useState} from "react";
import {DonationContext} from "../../context";
import {useHistory, useParams} from "react-router-dom";
import {Paragraph, Span, XL} from "@zendeskgarden/react-typography";
import {Space} from "../../components";
import {Button} from "@zendeskgarden/react-buttons";

export const AdjustTheQuoteDonationContainer = () => {
    const history = useHistory();
    const [donation, setDonation] = useState<Donation>()
    const {actions} = useContext(DonationContext)

    const params = useParams<{ id: string }>()
    const {id} = params;

    useEffect(() => {
        actions.getDonation(id).then(setDonation);
    }, [])

    const progress = () => {
        history.push(`/donations/${id}/quote-calculator`)
    }

    return (
        <BaseContainer title={"Adjust the quote"} showBackButton showAsModal>
            <>
                <Paragraph>
                    Now that you've done your walk-through, its time to make sure the quote is accurate!
                </Paragraph>
                <Paragraph>
                    Hit the button below to open our pricing calculator that will help you make the changes!
                </Paragraph>
                <Paragraph>
                    Once completed, you will send the updated quote to the donor!
                </Paragraph>

                <Space size={50}/>
                <XL><Span isBold>Up next:</Span> Donor Acceptance</XL>

                <Space size={50}/>

                <Button
                    onClick={progress}
                    isStretched> Adjust</Button>
            </>
        </BaseContainer>
    )
}
