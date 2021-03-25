import {BaseContainer} from "../base.container";
import {Well} from "@zendeskgarden/react-notifications";
import {Col, Row} from "@zendeskgarden/react-grid";
import {AutocompleteInput, Space, TableComponent} from "../../components";
import React, {useContext, useEffect} from "react";
import {useHistory} from "react-router-dom";
import {PartnerContext} from "../../context";
import {field} from "../../utility/field";
import {extraButton, ExtraButton} from "../../utility/extraButton";
import {navigationRoutes} from "../../utility/navigationRoutes";
import {TPLOrganization} from "../../domain";

const options: string[] = [];

const fields = [
    field('name', '3PL name'),
    field('accountManagerName', 'Account manager'),
    field('phone', 'Phone'),
    field('email', 'Email'),
    field('zone.name', 'Zone')
]

export const PartnersContainer = () => {
    const {partners} = useContext(PartnerContext)
    const history = useHistory();

    const extraButtons: ExtraButton[] = [
        extraButton("Add a 3PL", () => {
            history.push(navigationRoutes.createTPL)
        })
    ]

    const openPartnerDetails = (partner: TPLOrganization) => history.push(navigationRoutes.tplDetails(partner))

    return (
        <BaseContainer title={"3PLs"} subtitle={"List of all partners"} extraButtons={extraButtons}>
            <>
                <Well>
                    <Row>
                        <Col>
                            <AutocompleteInput disabled options={options} label={"Organization filter"}/>
                        </Col>
                    </Row>
                </Well>
                <Space size={30}/>
                <Well>
                    <TableComponent fields={fields} onRowClicked={openPartnerDetails} data={partners}/>
                </Well>
            </>

        </BaseContainer>
    )
}
