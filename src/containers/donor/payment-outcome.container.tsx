import {useHistory, useParams} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import {DonationContext} from "../../context";

import {BaseContainer} from "./base.container";
import {Button} from "@zendeskgarden/react-buttons";
import {Well} from "@zendeskgarden/react-notifications";
import {donationStatus} from "../../utility/donation-status";
import {Inline} from "@zendeskgarden/react-loaders";
import {Donation} from "../../domain/Donation";

export const PaymentOutcomeContainer = () => {
    const params = useParams<{ donationId: string, outcome: string }>();
    const history = useHistory();
    const {donationId, outcome} = params;
    const {actions} = useContext(DonationContext)
    const [donation, setDonation] = useState<Donation>()
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        if (!donationId) {
            proceedToReSupplyWebsite()
        } else {
            actions.getDonation(donationId).then(setDonation);
        }
    }, [])

    useEffect(() => {
        if (donation){
            if (donation.donationStatus !== 'quote_sent'){
                proceedToReSupplyWebsite()
            }else{
                handleStatusUpdate()
            }

        }
    }, [donation])

    const handleStatusUpdate = () => {
        if (outcome === 'success') {
            // actions.updateDonation({
            //     ...donation,
            //     donationStatus: 'payment_successful',
            //     eventType: 'donation_payment_successful'
            // } as Donation).then(() => {
            //     setLoading(false)
            // })
        }else{
            setLoading(false);
        }
    }

    const getTitle = () => {
        if (outcome === "success") {
            return "Thank you for using ReSupply!"
        } else {
            return "Payment did not go through."
        }
    }

    const getSubtitle = () => {
        if (outcome === "success") {
            return "Your donation is on it's way to the charity!"
        } else {
            return "Please try again using the instruction below"
        }
    }

    const tryAgain = () => {
        if (donation){
            history.replace(`/d/${donation.donationCode}`)
        }
    }

    const proceedToReSupplyWebsite = () => {
        window.location.href = 'https://resupplyme.com'
    }

    return (
        <>
            {donation && (
                <BaseContainer title={getTitle()} subtitle={getSubtitle()}>
                    <Well>
                        {outcome === 'success' ? (
                            <Button
                                disabled={isLoading}
                                onClick={proceedToReSupplyWebsite}
                                isStretched>
                                {isLoading ? (<Inline />): 'Proceed to ReSupply website'}
                            </Button>
                        ) : (
                            <Button
                                disabled={isLoading}
                                onClick={tryAgain}
                                isStretched
                                isDanger>
                                {isLoading ? (<Inline />): 'Try again'}
                            </Button>
                        )}
                    </Well>
                </BaseContainer>
            )}
        </>
    )
}
