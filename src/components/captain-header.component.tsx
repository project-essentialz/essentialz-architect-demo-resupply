import React, {useContext, useRef, useState} from "react";

import {ReactComponent as ProductIcon} from '../assets/icons/pictogram.svg';
import {ReactComponent as HelpIcon} from '@zendeskgarden/svg-icons/src/16/lifesaver-stroke.svg';
import {ReactComponent as MenuTrayIcon} from '@zendeskgarden/svg-icons/src/16/grid-2x2-stroke.svg';
import {ReactComponent as PersonIcon} from '@zendeskgarden/svg-icons/src/16/user-solo-stroke.svg';


import {Header, HeaderItem, HeaderItemIcon, HeaderItemText} from "@zendeskgarden/react-chrome";
import {PALETTE} from "@zendeskgarden/react-theming";
import {TooltipModal} from "@zendeskgarden/react-modals";
import {Anchor} from "@zendeskgarden/react-buttons";
import {UserContext} from "../context";

export const CaptainHeader = () => {
    const {actions} = useContext(UserContext)
    const buttonRef = useRef<HTMLButtonElement>(null);
    const [referenceElement, setReferenceElement] = useState<HTMLButtonElement | null>();

    return (
        <Header isStandalone>
            <HeaderItem hasLogo>
                <HeaderItemIcon>
                    <ProductIcon style={{color: PALETTE.red[400]}}/>
                </HeaderItemIcon>
                <HeaderItemText>ReSupply Captain Portal</HeaderItemText>
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
