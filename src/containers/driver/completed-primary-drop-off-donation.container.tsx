import {Donation} from "../../domain";
import {BaseContainer} from "./base.container";
import {useContext, useEffect, useState} from "react";
import {DonationContext} from "../../context";
import {useHistory, useParams} from "react-router-dom";
import {Paragraph, Span, XL} from "@zendeskgarden/react-typography";
import {Space} from "../../components";
import {Button} from "@zendeskgarden/react-buttons";
import Tick from "../../assets/images/tick.png";

export const CompletedPrimaryDropOffDonationContainer = () => {
    const history = useHistory();
    const [donation, setDonation] = useState<Donation>()
    const {actions} = useContext(DonationContext)

    const params = useParams<{ id: string }>()
    const {id} = params;

    useEffect(() => {
        actions.getDonation(id).then(setDonation);
    }, [])

    const close = () => history.replace("/")

    return (
        <BaseContainer title={"Done!"} subtitle={"Your balance is being transferred"} showBackButton showAsModal>
            <>
                <Space size={50}/>

                <div style={{textAlign: "center"}}>
                    <img style={{height: 200, margin: 'auto'}} src={Tick} alt=""/>
                </div>

                <Space size={20}/>
                <Paragraph>
                    Please allow 24-48 hours for your balance to be received!
                </Paragraph>

                <Space size={50}/>

                <Button onClick={close} isStretched>Return to home</Button>
            </>
        </BaseContainer>
    )
}
