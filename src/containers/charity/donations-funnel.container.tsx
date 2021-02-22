import {BaseContainer} from "./base.container";
import React, {useContext, useEffect, useState} from "react";
import {AutocompleteInput, DonationStatusTreeComponent, TableComponent} from "../../components";
import {Col, Row} from "@zendeskgarden/react-grid";
import {Well} from "@zendeskgarden/react-notifications";
import {DonationContext} from "../../context";
import {Donation} from "../../services/domain";
import {field} from "../../utility/field";
import {DrawerModal} from "@zendeskgarden/react-modals";
import {Button} from "@zendeskgarden/react-buttons";
import {useHistory} from "react-router-dom";

const options = [
    'Asparagus',
    'Brussel sprouts',
    'Cauliflower',
    'Garlic',
    'Jerusalem artichoke',
    'Kale',
    'Lettuce',
    'Onion',
    'Mushroom',
    'Potato',
    'Radish',
    'Spinach',
    'Tomato',
    'Yam',
    'Zucchini'
];

const fields = [
    field('donationCode', 'Donation ID'),
    field('donorName', 'Donor name'),
    field('phone', 'phone'),
    field('donationStatus', 'Status')
]

type Props = {}

export const DonationsFunnelContainer = (props: Props) => {
    const history = useHistory();
    const {donations, actions} = useContext(DonationContext);

    const [isOpen, setIsOpen] = useState(false);
    const [selectedDonation, setSelectedDonation] = useState<Donation>()
    const open = () => setIsOpen(true);
    const close = () => setIsOpen(false);


    useEffect(() => {
        actions.getAllDonations('charity_id=af9de00f-77c8-40c0-bd80-8938fdb21d50');
    }, [])

    const openDonationDrawer = (data: Donation) => {
        setSelectedDonation(data);
        open();
    }

    return (
        <BaseContainer title={'Donations funnel'} subtitle={'List of all donations in the system'}>
            <>
                <Well>
                    <Row>
                        <Col>
                            <AutocompleteInput disabled options={options} label={"Driver filter"}/>
                        </Col>
                        <Col>
                            <AutocompleteInput disabled options={options} label={"Customer filter"}/>
                        </Col>
                    </Row>
                </Well>
                <div style={{height: 30}}/>
                <Well>
                    <TableComponent fields={fields} onRowClicked={openDonationDrawer} data={donations}/>
                </Well>

                <DrawerModal isOpen={isOpen} onClose={close}>
                    <DrawerModal.Header>Donation ID #45 | Tracking</DrawerModal.Header>
                    <DrawerModal.Body>
                        <DonationStatusTreeComponent donation={selectedDonation!}/>
                    </DrawerModal.Body>
                    <DrawerModal.Footer>
                        <DrawerModal.FooterItem>
                            <Button isBasic onClick={() => {
                                history.push(`/donations/${selectedDonation!.id}`)
                            }}>
                                Show donation detailed view
                            </Button>
                        </DrawerModal.FooterItem>
                    </DrawerModal.Footer>
                    <DrawerModal.Close/>
                </DrawerModal>
            </>
        </BaseContainer>
    )
}
