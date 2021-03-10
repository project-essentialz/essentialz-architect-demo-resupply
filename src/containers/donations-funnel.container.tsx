import {BaseContainer} from "./base.container";
import React, {useContext, useEffect, useState} from "react";
import {AutocompleteInput, DonationStatusTreeComponent, TableComponent} from "../components";
import {Col, Row} from "@zendeskgarden/react-grid";
import {Well} from "@zendeskgarden/react-notifications";
import {DonationContext} from "../context";
import {Donation} from "../services/domain";
import {field} from "../utility/field";
import {DrawerModal} from "@zendeskgarden/react-modals";
import {Button} from "@zendeskgarden/react-buttons";
import {useHistory} from "react-router-dom";
import styled from "styled-components";

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
    field('charityName', 'Charity name'),
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
        actions.getAllDonations();
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
                            <AutocompleteInput options={options} label={"Charity filter"}/>
                        </Col>
                        <Col>
                            <AutocompleteInput options={options} label={"Driver filter"}/>
                        </Col>
                        <Col>
                            <AutocompleteInput options={options} label={"Customer filter"}/>
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

const StyledButtons = styled.div`
  margin-top: ${p => p.theme.space.sm};
  padding: ${p => p.theme.shadowWidths.md};

  & > button {
    margin-${p => (p.theme.rtl ? 'right' : 'left')}: ${p => p.theme.space.base * 3}px;

    &:first-child {
      margin-${p => (p.theme.rtl ? 'right' : 'left')}: 0;
    }
  }
`;
