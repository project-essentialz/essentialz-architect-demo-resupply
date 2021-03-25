import {BaseContainer} from "../base.container";
import {AutocompleteInput, Space, TableComponent} from "../../components";
import {Well} from "@zendeskgarden/react-notifications";
import {Col, Row} from "@zendeskgarden/react-grid";
import React, {useContext} from "react";
import {useHistory} from "react-router-dom";
import {CharityContext} from "../../context";
import {field} from "../../utility/field";
import {extraButton, ExtraButton} from "../../utility/extraButton";
import {navigationRoutes} from "../../utility/navigationRoutes";
import {Charity} from "../../domain";

const options: string[] = [];

const fields = [
    field('code', 'Charity ID'),
    field('name', 'Charity name'),
    field('pocName', 'Point of contact'),
    field('phone', 'Phone number'),
    field('address', 'Address'),
    field('state', 'State'),
    field('closingBy', 'Closing by'),
]

type Props = {};
export const CharitiesContainer = (props: Props) => {

    const history = useHistory();
    const {charities} = useContext(CharityContext) // Charities should already be fetched at this point

    const openCreateCharity = () => history.push(navigationRoutes.createCharity)
    const openCharityDetails = (charity: Charity) => history.push(navigationRoutes.charityDetails(charity))

    const extraButtons: ExtraButton[] = [
        extraButton("Create new charity", openCreateCharity)
    ]

    return (
        <BaseContainer title={"Charities"} subtitle={"List of all charities"} extraButtons={extraButtons}>
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
            <Space size={30}/>
            <Well>
                <Row>
                    <Col>
                        <TableComponent fields={fields} onRowClicked={openCharityDetails} data={charities}/>
                    </Col>
                </Row>

            </Well>
        </BaseContainer>
    )
}
