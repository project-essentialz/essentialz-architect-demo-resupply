import {Donation} from "../../domain";
import {BaseContainer} from "./base.container";
import {useContext, useEffect, useState} from "react";
import {DonationContext} from "../../context";
import {useHistory, useParams} from "react-router-dom";
import {Paragraph, Span, XL} from "@zendeskgarden/react-typography";
import {Space} from "../../components";
import {Button} from "@zendeskgarden/react-buttons";

export const LoadUpAndMoveOutDonationContainer = () => {
    const history = useHistory();
    const [donation, setDonation] = useState<Donation>()
    const {actions} = useContext(DonationContext)

    const params = useParams<{ id: string }>()
    const {id} = params;

    useEffect(() => {
        actions.getDonation(id).then(setDonation);
    }, [])

    const progress = () => {
        history.push(`/donations/${id}/primary-drop-off`)
    }

    const close = () => history.replace("/")

    return (
        <BaseContainer title={"Load up & Move out!"} showBackButton showAsModal>
            <>
                <Paragraph>
                    You're heading to {donation?.primaryDropOff?.name} at <Span isBold>{donation?.primaryDropOff?.address}</Span>!
                </Paragraph>
                <Paragraph>
                    Remember, taking care of these items will help to keep them from being rejected at the loading dock!
                </Paragraph>
                <Paragraph>
                    Once completed, you can choose to go to the next donation, or go to the charity is your truck is full!
                </Paragraph>
                <Paragraph>
                    The choice is your!
                </Paragraph>

                <Space size={50}/>

                <Button onClick={progress} isStretched>Go to charity</Button>
                <Space size={20}/>
                <Button onClick={close} isStretched>Next donation</Button>
            </>
        </BaseContainer>
    )
}
