import {BaseContainer} from "./base.container";
import {useContext, useEffect, useState} from "react";
import {DonationContext} from "../../context";
import {useParams} from "react-router-dom";
import {EstimateComponent} from "../../components";
import styled from "styled-components";
import {Anchor, Button} from "@zendeskgarden/react-buttons";
import {Well} from "@zendeskgarden/react-notifications";
import {SM} from "@zendeskgarden/react-typography";
import Api from "../../services/api.service";
import {useStripe} from "@stripe/react-stripe-js";
import {donationStatus} from "../../utility/donation-status";
import {Donation} from "../../domain";
import {loadStripe} from "@stripe/stripe-js";

const stripeKey = 'pk_live_51IbPzLION1witdQTAnASC69EjzZgS48HlVTFEleX2KSAZEbmng5Mo16WjaMk4LQ0BmXLniqxd90cDzeG5YXuL3vL00pG9KD8Hq';

export const PaymentContainer = () => {
    // const stripe = useStripe();
    const params = useParams<{ donationCode: string }>()
    const {actions, donations} = useContext(DonationContext)
    const {donationCode} = params

    const [donation, setDonation] = useState<Donation>()

    useEffect(() => {
        if (donationCode) {
            actions.getAllDonations(`donation_code=${donationCode}`)
        } else {
            window.location.href = "https://resupplyme.com"
        }
    }, [])

    useEffect(() => {
        if (donations && donations.length > 0) {
            setDonation(donations[0])
        }
    }, [donations])


    const setupPayment = () => {
        if (donation) {
            Api.$('functions/stripe_checkout').create({
                success_url: `https://donation.rspl.dev/c/${donation.id}/success`,
                cancel_url: `https://donation.rspl.dev/c/${donation.id}/error`,
                donation_id: donation.id
            }).then((result: any) => {
                loadStripe(stripeKey, {
                    stripeAccount: result.account
                })
                    .then((value) => {
                        value!.redirectToCheckout({sessionId: result.id})
                    })

            })
                .catch(e => {
                    console.log("Error");
                })
        }
    }

    const isPaymentCompleted = () => {
        if (donation) {
            return donationStatus.indexOf(donation.donationStatus!) >= donationStatus.indexOf('payment_successful')
        }
        return false
    }

    return (<BaseContainer title={"Confirm the donation"}
                           subtitle={"Please follow the instruction to complete the payment"}>
        <>
            {donation && (
                <>
                    <Well>
                        <EstimateComponent spec={donation.adjustedSpec}/>
                        <Button
                            // disabled={isPaymentCompleted()}
                            onClick={setupPayment}
                            style={{marginTop: 70}}
                            isStretched>
                            {isPaymentCompleted() ? 'Payment completed' : 'Continue to payment'}
                        </Button>
                        <SM style={{textAlign: 'center', marginTop: 10}}>By proceeding you agree with ReSupply's <Anchor
                            target="_blank" href={"https://resupplyme.com/utility/terms"}>Terms of Service</Anchor></SM>
                    </Well>
                </>
            )}
        </>
    </BaseContainer>)
}

const StyledTable = styled.div`
  table {
    background-color: white;
  }
`
