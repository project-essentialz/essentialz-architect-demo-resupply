import {Body, Close, Footer, FooterItem, Header, Modal} from "@zendeskgarden/react-modals";
import {Space} from "./space";
import {Button} from "@zendeskgarden/react-buttons";
import React, {useEffect, useState} from "react";
import {Driver, TPLOrganization} from "../domain";
import Api, {method} from "../services/api.service";
import {routes} from "../services/api.routes";
import {Input} from "@zendeskgarden/react-forms";

type Props = {
    partner: TPLOrganization
    onDone?: (driver: Driver) => void
    onClose?: () => void
}
export const MerchantModal = (props: Props) => {
    const {onClose, partner} = props;
    const [url, setUrl] = useState<string>('');

    useEffect(() => {
        if (partner){
            Api.$(routes.getMerchantUrl).call(method.post, {
                tplId: partner.id,
                returnUrl: `https://resupplyme.com`,
                refreshUrl: `https://resupplyme.com`
            }).then((res: any) => {
                console.log(res.created - res.expiresAt)
                setUrl(res.url);
            })
        }
    }, [partner])

    return (
        <Modal onClose={onClose}>
            <Header>3PL Merchant Account</Header>
            {partner.stripeAccount ? (
                <Body>
                    This account has already been set up.
                    <Space size={10}/>
                    <Input value={url} readOnly />
                </Body>
            ) : (
                <Body>
                    Us this link to setup 3PL Merchant Account on Stripe
                    <Space size={10}/>
                    <Input value={url} readOnly />
                </Body>
            )}
            <Footer>
                <FooterItem>
                    <Button onClick={onClose} isDanger isBasic>
                        Close
                    </Button>
                </FooterItem>
            </Footer>
            <Close aria-label="Close modal"/>
        </Modal>
    )
}
