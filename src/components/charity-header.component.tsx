import React, {useContext, useEffect, useRef, useState} from "react";

import {ReactComponent as ProductIcon} from '../assets/icons/pictogram.svg';
import {ReactComponent as PlusIcon} from '../assets/icons/plus-light.svg';
import {ReactComponent as MinusIcon} from '../assets/icons/minus-light.svg';
import {ReactComponent as PersonIcon} from '@zendeskgarden/svg-icons/src/16/user-solo-stroke.svg';


import {Header, HeaderItem, HeaderItemIcon, HeaderItemText} from "@zendeskgarden/react-chrome";
import {PALETTE} from "@zendeskgarden/react-theming";
import {TooltipModal} from "@zendeskgarden/react-modals";
import {Anchor} from "@zendeskgarden/react-buttons";
import {UserContext} from "../context";

export const CharityHeader = () => {
    const {actions} = useContext(UserContext)
    const buttonRef = useRef<HTMLButtonElement>(null);
    const [referenceElement, setReferenceElement] = useState<HTMLButtonElement | null>();

    const [zoom, setZoom] = useState(100)

    const zoomIn = () => {
        setZoom(zoom * 1.1);
    }
    const zoomOut = () => {
        setZoom(zoom * 0.9);
    }
    useEffect(() => {
        document.getElementsByTagName('main')[0].style.zoom = `${zoom}%`;
    }, [zoom])
    return (
        <Header isStandalone>
            <HeaderItem hasLogo>
                <HeaderItemIcon>
                    <ProductIcon style={{color: PALETTE.red[400]}}/>
                </HeaderItemIcon>
                <HeaderItemText>ReSupply Charity Portal</HeaderItemText>
            </HeaderItem>
            <HeaderItem>
                <HeaderItemIcon onClick={zoomOut}>
                    <MinusIcon/>
                </HeaderItemIcon>
                <HeaderItemText onClick={() => {setZoom(100)}}>{zoom === 100 ? 'Adjust Zoom' : 'Reset Zoom'}</HeaderItemText>
                <HeaderItemIcon onClick={zoomIn}>
                    <PlusIcon/>
                </HeaderItemIcon>
            </HeaderItem>
            <HeaderItem isRound
                        ref={buttonRef}
                        onClick={() => {setReferenceElement(buttonRef.current)}}>
                <HeaderItemIcon>
                    <PersonIcon/>
                </HeaderItemIcon>
                <HeaderItemText isClipped>User</HeaderItemText>
            </HeaderItem>

            <TooltipModal
                referenceElement={referenceElement}
                onClose={() => setReferenceElement(null)}
                placement={"bottom-start"}
            >
                <TooltipModal.Title>User menu</TooltipModal.Title>
                <TooltipModal.Body>
                    <Anchor onClick={() => {actions.logout()}}>Logout</Anchor>
                </TooltipModal.Body>
            </TooltipModal>
        </Header>
    )
}
