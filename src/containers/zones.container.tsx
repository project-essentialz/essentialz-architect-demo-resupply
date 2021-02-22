import {BaseContainer} from "./base.container";
import {TableComponent} from "../components";
import React, {useContext, useEffect} from "react";
import {Well} from "@zendeskgarden/react-notifications";
import {useHistory} from "react-router-dom";
import {ZoneContext} from "../context";

const fields = [
    {
        key: "id",
        displayValue: "Zone ID"
    },
    {
        key: "name",
        displayValue: "Name"
    },

]


export const ZonesContainer = () => {
    const history = useHistory()
    const {zones, actions} = useContext(ZoneContext)

    useEffect(() => {
        actions.getAllZones();
    }, [])

    const extraButtons:{title: string, onClick: () => void}[] = [
        {
            title: 'Create new zone',
            onClick: () => {history.push('create-zone')}
        }
    ]

    return (
        <BaseContainer title={"Zone list"} subtitle={"List of all zones"} extraButtons={extraButtons}>
            <>
                <Well>
                    <TableComponent fields={fields} onRowClicked={() => {}} data={zones}/>
                </Well>
            </>
        </BaseContainer>
    )
}
