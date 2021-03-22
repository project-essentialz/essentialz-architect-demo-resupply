import {useHistory, useParams} from "react-router-dom";
import React, {ChangeEvent, useContext, useEffect, useState} from "react";
import {BaseContainer} from "./base.container";
import {DonationContext} from "../../context";
import styled from "styled-components";
import {PALETTE} from "@zendeskgarden/react-theming";
import {Col, Row} from "@zendeskgarden/react-grid";
import {Button} from "@zendeskgarden/react-buttons";
import {Field, Input, Label} from "@zendeskgarden/react-forms";
import {Title} from "@zendeskgarden/react-notifications";
import {Donation} from "../../domain/Donation";


export const DropOffContainer = () => {
    const params = useParams<{ id: string }>();
    const history = useHistory()
    const {id} = params
    const {actions} = useContext(DonationContext)
    const [donation, setDonation] = useState<Donation>()
    const [availableItems, setAvailableItems] = useState<{ url: string, selected: boolean }[]>([])

    useEffect(() => {
        if (id) {
            actions.getDonation(id).then(setDonation);
        }
    }, [])

    useEffect(() => {
        if (donation) {
            // setAvailableItems(donation.photos.map(p => ({url: p.url, selected: false})))
        }
    }, [donation])

    const toggleItem = (index: number) => {
        let items = availableItems;
        items[index].selected = !items[index].selected;
        setAvailableItems([...items])
    }

    const updateField = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const {value, name} = e.target;
        setDonation({
            ...donation,
            [name]: value
        } as Donation)

    }

    const sendConfirmation = () => {
        // actions.updateDonation({
        //     ...donation,
        //     primaryDrop: availableItems,
        //     donationStatus: 'completed',
        //     eventType: 'donation_completed'} as Donation).then(
        //     r => history.goBack()
        // )
    }


    if (availableItems) {

        return (
            <BaseContainer title={"Drop off"} subtitle={"Pick items to leave at the charity"}>
                <>
                    <Row>
                        <Col>
                            <StyledField>
                                <Label>Name</Label>
                                <Input name={"pocName"} onChange={updateField}/>
                            </StyledField>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <StyledField>
                                <Label>Phone</Label>
                                <Input name={"pocPhone"} onChange={updateField}/>
                            </StyledField>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Title>Pick items for the charity</Title>
                        </Col>
                    </Row>
                    <Row>
                        {availableItems.map((i, index) => (
                            <DonationItem xs={4} key={i.url} onClick={() => toggleItem(index)}>
                                <div className={`inner ${i.selected ? 'selected' : ''}`}>
                                    <img src={i.url + ""}/>
                                </div>
                            </DonationItem>
                        ))}
                    </Row>
                    <Row style={{marginTop: 30}}>
                        <Button
                            // disabled={!donation || !donation.pocName || !donation.pocPhone}
                            onClick={sendConfirmation}
                            isPrimary
                            isStretched
                        >Send confirmation</Button>
                    </Row>
                </>
            </BaseContainer>
        )
    } else {
        return <></>
    }

}


const DonationItem = styled(Col)`
  width: 100%;
  padding: 5px;
  box-sizing: border-box !important;

  .inner {
    height: 150px;
    border: 1px solid ${PALETTE.grey["300"]};
    padding: 10px;
    box-sizing: border-box !important;
    transition: all 100ms ease-in-out;

    &.selected {
      box-sizing: border-box !important;
      border: 10px solid ${PALETTE.blue["600"]};
    }

    text-align: center;
  }

  img {
    box-sizing: border-box !important;
    height: 100%;
    margin: auto;
    object-fit: contain;
  }
`
const StyledField = styled(Field)`
  margin-bottom: 15px;
`
