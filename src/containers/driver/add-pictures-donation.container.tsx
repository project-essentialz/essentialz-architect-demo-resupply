import {Donation} from "../../domain";
import {BaseContainer} from "./base.container";
import {useContext, useEffect, useState} from "react";
import {DonationContext} from "../../context";
import {useHistory, useParams} from "react-router-dom";
import {Paragraph, Span, XL} from "@zendeskgarden/react-typography";
import {Space} from "../../components";
import {Button} from "@zendeskgarden/react-buttons";

export const AddPicturesDonationContainer = () => {
    const history = useHistory();
    const [donation, setDonation] = useState<Donation>()
    const {actions} = useContext(DonationContext)

    const params = useParams<{ id: string }>()
    const {id} = params;

    useEffect(() => {
        actions.getDonation(id).then(setDonation);
    }, [])

    const progress = () => {
        history.push(`/donations/${id}/picture-gallery`)
    }

    return (
        <BaseContainer title={"Add pictures!"} showBackButton showAsModal>
            <>
                <Paragraph>
                    It is time to take pictures!
                </Paragraph>
                <Paragraph>
                    Remember, <Span isBold> only one photo per item and only one item in each photo</Span>
                </Paragraph>

                <Space size={50}/>
                <XL><Span isBold>Up next:</Span> Load up & move out</XL>

                <Space size={50}/>

                <Button
                    onClick={progress}
                    isStretched>
                    Pictures
                </Button>
            </>
        </BaseContainer>
    )
}
