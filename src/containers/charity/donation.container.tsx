import React, {useContext, useEffect, useRef, useState} from 'react';
import {BaseContainer} from "./base.container";
import {Col, Row} from "@zendeskgarden/react-grid";
import {Title, Well} from '@zendeskgarden/react-notifications';
import {Anchor, Button} from "@zendeskgarden/react-buttons";
import styled from "styled-components";
import {Body, Cell, GroupRow, Row as TRow, Table} from '@zendeskgarden/react-tables';

import {Tag} from '@zendeskgarden/react-tags';
import {MD, Paragraph} from "@zendeskgarden/react-typography";
import {TooltipModal} from '@zendeskgarden/react-modals';
import {DonationContext} from "../../context";
import {Donation} from "../../services/domain";
import {useParams} from "react-router-dom";
import {DonationStatusTreeComponent} from "../../components";

type Props = {};
export const DonationContainer = (props: Props) => {
    const params = useParams<{ id: string }>()
    const [donation, setDonation] = useState<Donation>()
    const {actions} = useContext(DonationContext)

    const {id} = params;

    useEffect(() => {
        actions.getDonation(id).then(setDonation);
    }, [])

    const tagRef = useRef<HTMLDivElement>(null);
    const [referenceElement, setReferenceElement] = useState<HTMLDivElement | null>();

    if (donation) {
        return (
            <BaseContainer showBackButton title={`Request: ${donation.donationCode}`} subtitle={'Donation details'}>
                <>
                    <Row>
                        <Col xs={4}>
                            <Well>
                                <StiledTitle>Client info</StiledTitle>
                                <Row>
                                    <Col>
                                        <Paragraph>{donation.donorName}</Paragraph>
                                    </Col>
                                </Row>
                                <Row>
                                    <Table style={{marginTop: 20}}>
                                        <Body>
                                            <TRowNoBorder isReadOnly>
                                                <Cell>Phone number</Cell>
                                                <Cell><Anchor href={`tel:${donation.phone}`}>{donation.phone}</Anchor></Cell>
                                            </TRowNoBorder>
                                            <TRowNoBorder isReadOnly>
                                                <Cell>Email</Cell>
                                                <Cell><Anchor href={`mailto:${donation.email}`}>{donation.email}</Anchor></Cell>
                                            </TRowNoBorder>
                                            <TRowNoBorder isReadOnly>
                                                <Cell>Address</Cell>
                                                <Cell>
                                                    <Anchor href={"https://www.google.rs/maps/place/TX-123,+Seguin,+TX,+USA/@29.5872806,-97.9470873,17z/data=!3m1!4b1!4m5!3m4!1s0x865cd0271896901b:0xad152987c9e8e7fe!8m2!3d29.5872806!4d-97.9448986"}>123 Random Rd, Seguin, TX, USA</Anchor>
                                                    <Row><Col>{donation.city}</Col></Row>
                                                    <Row><Col>{donation.state}</Col></Row>
                                                    <Row><Col>{donation.zip}</Col></Row>
                                                </Cell>
                                            </TRowNoBorder>
                                        </Body>
                                    </Table>
                                </Row>
                            </Well>
                        </Col>
                        <Col xs={4}>
                            <Well>
                                <StiledTitle>Service request info</StiledTitle>
                                <Row>
                                    <Table>
                                        <Body>
                                            <GroupRow>
                                                <Cell>Donation items</Cell>
                                                <Cell style={{textAlign: "right"}}>Quantity</Cell>
                                            </GroupRow>
                                            <TRow isReadOnly>
                                                <Cell>Large items</Cell>
                                                <Cell style={{textAlign: "right"}}>{parseFloat((donation.largeItems || 0) + "")}</Cell>
                                            </TRow>
                                            <TRow isReadOnly>
                                                <Cell>Small items</Cell>
                                                <Cell style={{textAlign: "right"}}>{parseFloat((donation.smallItems || 0) + "")}</Cell>
                                            </TRow>
                                            <TRow isReadOnly>
                                                <Cell>Bags</Cell>
                                                <Cell style={{textAlign: "right"}}>{parseFloat((donation.bags || 0) + "")}</Cell>
                                            </TRow>
                                            <TRow isReadOnly>
                                                <Cell>Boxes</Cell>
                                                <Cell style={{textAlign: "right"}}>{parseFloat((donation.boxes || 0) + "")}</Cell>
                                            </TRow>
                                            <TRow isReadOnly>
                                                <Cell>Appliances</Cell>
                                                <Cell style={{textAlign: "right"}}>{parseFloat((donation.appliances || 0) + "")}</Cell>
                                            </TRow>
                                            <TRow isReadOnly>
                                                <Cell>Hazardous</Cell>
                                                <Cell style={{textAlign: "right"}}>{parseFloat((donation.hazardous || 0) + "")}</Cell>
                                            </TRow>
                                        </Body>
                                    </Table>
                                </Row>
                                <TableCaption>Additional information</TableCaption>
                                <Row>
                                    <Table>
                                        <Body>
                                            <TRow isReadOnly>
                                                <Cell>Are items above or below the ground floor?</Cell>
                                                <Cell style={{textAlign: "right"}}><TTag value={donation.aboveTheGroundFloor === 'no' ? 'No' : 'Yes'}/></Cell>
                                            </TRow>
                                            <TRow isReadOnly>
                                                <Cell>Is elevator present?</Cell>
                                                <Cell style={{textAlign: "right"}}><TTag value={donation.aboveTheGroundFloor === 'yes-elevator' ? 'Yes' : 'No'}/></Cell>
                                            </TRow>
                                            <TRow isReadOnly>
                                                <Cell>Will client move items to ground floor?</Cell>
                                                <Cell style={{textAlign: "right"}}><TTag value={donation.aboveTheGroundFloor === 'yes-curbside' ? 'Yes' : 'No'}/></Cell>
                                            </TRow>
                                            <TRow isReadOnly>
                                                <Cell>How many staircases we will need to take?</Cell>
                                                <Cell style={{textAlign: "right"}}>{parseFloat(donation.staircases + "")}</Cell>
                                            </TRow>
                                            <TRow isReadOnly>
                                                <Cell>Disassembly required?</Cell>
                                                <Cell style={{textAlign: "right"}}><TTag value={donation.disassembly > 0 ? 'Yes' : 'No'}/></Cell>
                                            </TRow>
                                            <TRow isReadOnly>
                                                <Cell>How many items need disassembly?</Cell>
                                                <Cell style={{textAlign: "right"}}>{parseFloat(donation.disassembly + "")}</Cell>
                                            </TRow>
                                        </Body>
                                    </Table>
                                </Row>
                            </Well>
                            {donation.primaryDrop && (
                                <Well>
                                    <StiledTitle>Accepted items</StiledTitle>
                                    <Row>
                                    {donation.primaryDrop.map((drop) => {
                                        if (drop.selected){
                                            return (
                                                <DropImage xs={4}>
                                                    <img src={drop.url}/>
                                                </DropImage>
                                            )
                                        }else{
                                            return null
                                        }
                                    })}
                                    </Row>
                                    <Row>
                                        <TableCaption>Accepted by</TableCaption>
                                        <Table>
                                            <Body>
                                                <TRow isReadOnly>
                                                    <Cell>Name:</Cell>
                                                    <Cell style={{textAlign: "right"}}>{donation.pocName}</Cell>
                                                </TRow>
                                                <TRow isReadOnly>
                                                    <Cell>Phone</Cell>
                                                    <Cell style={{textAlign: "right"}}>{donation.pocPhone}</Cell>
                                                </TRow>
                                            </Body>
                                        </Table>
                                    </Row>

                                </Well>
                            )}
                        </Col>
                        <Col xs={4}>
                            <Well>
                                <StiledTitle>Service request status</StiledTitle>
                                <DonationStatusTreeComponent donation={donation}/>
                            </Well>
                        </Col>
                    </Row>

                    <TooltipModal
                        referenceElement={referenceElement}
                        onClose={() => setReferenceElement(null)}
                        placement="end"
                    >
                        <TooltipModal.Title>Returning Customer</TooltipModal.Title>
                        <TooltipModal.Body>
                            This user is a returning customer. To see their previous donations click here the button below.
                            <StyledButtons>
                                <Button>See previous donations</Button>
                            </StyledButtons>
                        </TooltipModal.Body>
                        <TooltipModal.Close aria-label="Close"/>
                    </TooltipModal>
                </>
            </BaseContainer>

        );
    } else {
        return <></>
    }
};

const StyledButtons = styled.div`
  margin-top: ${p => p.theme.space.sm};
  padding: ${p => p.theme.shadowWidths.md};

  & > button {
    margin-${p => (p.theme.rtl ? 'right' : 'left')}: ${p => p.theme.space.base * 3}px;

    &:first-child {
      margin-${p => (p.theme.rtl ? 'right' : 'left')}: 0;
    }
  }
`;

const StiledTitle = styled(Title)`
  margin-bottom: 20px;
`
const TRowNoBorder = styled(TRow)`
  border: none
`
const TableCaption = styled(MD)`
  margin: 30px 0 10px 0;
`
const TTag = (props: { value: string }) => (
    <Tag hue={props.value === 'Yes' ? 'green' : 'red'}>
        <span>{props.value}</span>
    </Tag>
)

const DropImage = styled(Col)`
  border: 1px solid black;
  width: 150px;
  height: 150px;
  text-align: center;
  img{
    height: 100%;
    object-fit: contain;
  }
`
