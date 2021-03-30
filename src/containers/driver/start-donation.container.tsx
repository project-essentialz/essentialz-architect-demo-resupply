import {Donation} from "../../domain";
import {BaseContainer} from "./base.container";
import {useContext, useEffect, useState} from "react";
import {DonationContext} from "../../context";
import {useParams} from "react-router-dom";
import {Paragraph, Span, XL} from "@zendeskgarden/react-typography";
import {Space} from "../../components";
import {Button} from "@zendeskgarden/react-buttons";

export const StartDonationContainer = () => {
    const [donation, setDonation] = useState<Donation>()
    const {actions} = useContext(DonationContext)

    const params = useParams<{ id: string }>()
    const {id} = params;

    useEffect(() => {
        actions.getDonation(id).then(setDonation);
    }, [])
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

                <Button isStretched> Start job</Button>
            </>
        </BaseContainer>
    )
}
