import {BaseContainer} from "../base.container";
import React, {useContext, useEffect} from "react";
import {Well} from "@zendeskgarden/react-notifications";
import {useHistory} from "react-router-dom";
import {ZoneContext} from "../../context";
import GoogleMapReact from 'google-map-react';
import {ExtraButton, extraButton} from "../../utility/extraButton";

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

    const mapProps = {
        center: {
            lat: 42.3142647,
            lng: -71.1103635
        },
        zoom: 11
    }
    useEffect(() => {
        actions.getAllZones();
    }, [])

    const openCreateZone = () => history.push('create-zone');

    const extraButtons = [
        extraButton('Create new zone', openCreateZone)
    ]

    const handleGoogleMapApi = (google: any) => {
        const map = google.map
        const drawingManager = new google.maps.drawing.DrawingManager({
            drawingMode: google.maps.drawing.OverlayType.MARKER,
            drawingControl: true,
            drawingControlOptions: {
                position: google.maps.ControlPosition.TOP_CENTER,
                drawingModes: [
                    google.maps.drawing.OverlayType.MARKER,
                    google.maps.drawing.OverlayType.POLYGON,
                ]
            },
            markerOptions: {
                icon: 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png',
                clickable: true,
                draggable: true
            },
            polygonOptions: {
                fillColor: '#e0761f',
                fillOpacity: 0.2,
                strokeWeight: 1,
                clickable: true,
                editable: true,
                draggable: true,
                zIndex: 1
            }
        });
        drawingManager.setMap(map);
    }

    const AnyReactComponent = (props: { text: string, lat: number, lng: number }) => <div>{props.text}</div>;

    return (
        <BaseContainer title={"Zone list"} subtitle={"List of all zones"} extraButtons={extraButtons}>
            <>
                <Well>
                    {/*<TableComponent fields={fields} onRowClicked={() => {}} data={zones}/>*/}
                    <div style={{height: '70vh', width: '100%'}}>
                        <GoogleMapReact
                            bootstrapURLKeys={{
                                key: 'AIzaSyAv4PUPRvbRfCCdYzjoOSvGWfQcpLAxTtA',
                                libraries: ['drawing'].join(',')
                            }}
                            defaultCenter={mapProps.center}
                            defaultZoom={mapProps.zoom}
                            yesIWantToUseGoogleMapApiInternals
                            onGoogleApiLoaded={handleGoogleMapApi}
                        >
                            <AnyReactComponent
                                lat={42.3142647}
                                lng={-71.1103635}
                                text="Boston"
                            />
                        </GoogleMapReact>
                    </div>
                </Well>
            </>
        </BaseContainer>
    )
}
