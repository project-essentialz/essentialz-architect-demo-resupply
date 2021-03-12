import {BaseContainer} from "./base.container";
import {Well} from "@zendeskgarden/react-notifications";
import {Col, Row} from "@zendeskgarden/react-grid";
import {AutocompleteInput, TableComponent, TrucksTable} from "../components";
import React, {useContext, useEffect} from "react";
import {useHistory} from "react-router-dom";
import {PartnerContext} from "../context";
import {field} from "../utility/field";
import {Partner} from "../services/domain";

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
    field('driverName', 'Driver name'),
    field('organizationName', '3PL'),
    field('phone', 'Phone'),
    field('startRating', 'Star rating'),
    field('zoneId', 'Zone'),
    field('accountManager', 'Account Manager')
]

type Props = {};
export const TrucksContainer = (props: Props) => {
    const {partners, actions} = useContext(PartnerContext)
    const history = useHistory();

    useEffect(() => {
        actions.getAllPartners();
    }, [])

    const extraButtons:{title: string, onClick: () => void}[] = [
        {
            title: 'Add a driver',
            onClick: () => {history.push('create-partner')}
        }
    ]

    const openPartnerDetails = (partner: Partner) => {
        history.push(`/partners/${partner.id}`)
    }
    return (
        <BaseContainer title={"Drivers"} subtitle={"List of all partners"} extraButtons={extraButtons}>
            <>
                <Well>
                    <Row>
                        <Col>
                            <AutocompleteInput disabled options={options} label={"Organization filter"}/>
                        </Col>
                        <Col>
                            <AutocompleteInput disabled options={options} label={"Driver filter"}/>
                        </Col>
                        <Col>
                            <AutocompleteInput disabled options={options} label={"Rating filter"}/>
                        </Col>
                    </Row>
                </Well>
                <div style={{height: 30}}/>
                <Well>
                    <TableComponent fields={fields} onRowClicked={openPartnerDetails} data={partners}/>
                </Well>
            </>

        </BaseContainer>
    )
}

/*
Details
Organization name
Driver name
CIO Insurance
Zone
Phone number
Email
Photo of driver's licence
Vehicle type
Star rating

Table
Organization name
Driver name
Star rating
Phone number
Zone
 */
