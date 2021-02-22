import {BaseContainer} from "./base.container";
import {AutocompleteInput, TableComponent} from "../components";
import {Well} from "@zendeskgarden/react-notifications";
import {Col, Row} from "@zendeskgarden/react-grid";
import React, {useContext, useEffect} from "react";
import {useHistory} from "react-router-dom";
import {CharityContext} from "../context";
import {field} from "../utility/field";
import {Charity} from "../services/domain";

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
    field('id', 'Charity ID'),
    field('charityName', 'Charity name'),
    field('pointOfContact', 'Point of contact'),
    field('phone', 'Phone number'),
    field('address', 'Address'),
    field('state', 'State'),
    field('closingTime', 'Closing by'),
]

type Props = {};
export const CharitiesContainer = (props: Props) => {

    const history = useHistory();
    const {actions, charities} = useContext(CharityContext)

    useEffect(() => {
        actions.getAllCharities();
    }, [])

    const extraButtons: { title: string, onClick: () => void }[] = [
        {
            title: 'Create new charity',
            onClick: () => {
                history.push('create-charity')
            }
        }
    ]

    const openCharityDetails = (data: Charity) => {
        history.push(`/charities/${data.id}`)
    }

    return (
        <BaseContainer title={"Charities"} subtitle={"List of all charities"} extraButtons={extraButtons}>
            <>
                <Well>
                    <Row>
                        <Col>
                            <AutocompleteInput disabled options={options} label={"Charity filter"}/>
                        </Col>
                        <Col>
                            <AutocompleteInput disabled options={options} label={"State filter"}/>
                        </Col>
                        <Col>
                            <AutocompleteInput disabled options={options} label={"City filter"}/>
                        </Col>
                    </Row>
                </Well>
                <div style={{height: 30}}/>
                <Well>
                    <TableComponent fields={fields} onRowClicked={openCharityDetails} data={charities}/>
                </Well>
            </>

        </BaseContainer>
    )
}
