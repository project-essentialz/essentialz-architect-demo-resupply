import {BaseContainer} from "../base.container";
import React, {useContext, useEffect} from "react";
import {Well} from "@zendeskgarden/react-notifications";
import {useHistory} from "react-router-dom";
import {ZoneContext} from "../../context";
import {extraButton} from "../../utility/extraButton";
import {TableComponent} from "../../components";
import {Zone} from "../../domain/Zone";

const fields = [
    {
        key: "name",
        displayValue: "Name"
    },

    {
        key: "zips",
        displayValue: "Zips"
    },

]


export const ZonesContainer = () => {
    const history = useHistory()
    const {zones, actions} = useContext(ZoneContext)

    useEffect(() => {
        actions.getAllZones();
    }, [])

    const openCreateZone = () => history.push('create-zone');
    const openEditZone = (zone: Zone) => history.push(`edit-zone/${zone.id}`)
    const extraButtons = [
        extraButton('Create new zone', openCreateZone)
    ]

    return (
        <BaseContainer title={"Zone list"} subtitle={"List of all zones"} extraButtons={extraButtons}>
            <>
                <Well>
                    <TableComponent fields={fields} onRowClicked={openEditZone} data={zones}/>

                </Well>
            </>
        </BaseContainer>
    )
}
