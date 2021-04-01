import {Donation} from "../../domain";
import {BaseContainer} from "./base.container";
import React, {useContext, useEffect, useState} from "react";
import {DonationContext} from "../../context";
import {useHistory, useParams} from "react-router-dom";
import {Paragraph} from "@zendeskgarden/react-typography";
import {Space} from "../../components";
import QRCode from "react-qr-code";
import {Button} from "@zendeskgarden/react-buttons";
import {Col, Row} from "@zendeskgarden/react-grid";
import {DonationStatus} from "../../domain/Donation";

export const AwaitDonorAcceptanceDonationContainer = () => {
    const history = useHistory();
    const [donation, setDonation] = useState<Donation>()
    const [reloadInterval, setReloadInterval] = useState<any>()
    const {actions} = useContext(DonationContext)

    const params = useParams<{ id: string }>()
    const {id} = params;

    useEffect(() => {
        actions.getDonation(id).then(setDonation);
        const timeout = setInterval(() => {
            actions.getDonation(id).then(setDonation);
        }, 1000);
        setReloadInterval(timeout);

    }, [])

    useEffect(() => {
        if (donation) {
            if (donation.donationStatus === DonationStatus.payment_successful) {
                progress();
            }
        }
    }, [donation])

    const progress = () => {
        if (donation) {
            clearInterval(reloadInterval);
            donation.donationStatus = DonationStatus.payment_successful;
            donation.eventType = `donation_${DonationStatus.payment_successful}`;
            actions.updateDonation(donation).then(() => {
                history.replace(`/donations/${id}/quote-accepted`)
            })
        }
    }

    return (
        <BaseContainer title={"Awaiting donor acceptance!"} showBackButton showAsModal>
            <>
                <Paragraph>
                    We are waiting on your donor to accept the quote!
                </Paragraph>
                <Paragraph>
                    If they are having trouble, help them by having them scan this QR code to take them to their quote!
                </Paragraph>

                <Space size={50}/>
                <QRCode value={`https://donation.rspl.dev/d/${donation?.donationCode}`}/>

                <Space size={50}/>
                <Row>
                    <Col>
                        <Button onClick={progress}>Simulate payment</Button>
                    </Col>
                </Row>

            </>
        </BaseContainer>
    )
}
