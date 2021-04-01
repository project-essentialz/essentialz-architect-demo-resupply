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
import {useParams} from "react-router-dom";
import {DonationStatusTreeComponent, Space} from "../../components";
import {Donation} from "../../domain/Donation";
import {CharityScopeContext} from "../../context/charity-scope.context";
import {PALETTE} from "@zendeskgarden/react-theming";

type Props = {};
export const DonationContainer = (props: Props) => {
    const params = useParams<{ id: string }>()
    const [donation, setDonation] = useState<Donation>()
    const {actions} = useContext(CharityScopeContext)

    const {id} = params;

    useEffect(() => {
        actions.getDonation(id).then(setDonation);
    }, [])

    useEffect(() => {
        console.log(donation);
    }, [donation])

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
                                        <Paragraph>{donation.donor.name}</Paragraph>
                                    </Col>
                                </Row>
                                <Row>
                                    <Table style={{marginTop: 20}}>
                                        <Body>
                                            <TRowNoBorder isReadOnly>
                                                <Cell>Phone number</Cell>
                                                <Cell><Anchor
                                                    href={`tel:${donation.donor.phone}`}>{donation.donor.phone}</Anchor></Cell>
                                            </TRowNoBorder>
                                            <TRowNoBorder isReadOnly>
                                                <Cell>Email</Cell>
                                                <Cell><Anchor
                                                    href={`mailto:${donation.donor.email}`}>{donation.donor.email}</Anchor></Cell>
                                            </TRowNoBorder>
                                            <TRowNoBorder isReadOnly>
                                                <Cell>Address</Cell>
                                                <Cell>
                                                    <Row><Col>{donation.donor.address}</Col></Row>
                                                    <Row><Col>{donation.donor.city}</Col></Row>
                                                    <Row><Col>{donation.donor.state}</Col></Row>
                                                    <Row><Col>{donation.donor.zip}</Col></Row>
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
                                                <Cell
                                                    style={{textAlign: "right"}}>{parseFloat((donation.spec.largeItems || 0) + "")}</Cell>
                                            </TRow>
                                            <TRow isReadOnly>
                                                <Cell>Small items</Cell>
                                                <Cell
                                                    style={{textAlign: "right"}}>{parseFloat((donation.spec.smallItems || 0) + "")}</Cell>
                                            </TRow>
                                            <TRow isReadOnly>
                                                <Cell>Bags</Cell>
                                                <Cell
                                                    style={{textAlign: "right"}}>{parseFloat((donation.spec.bags || 0) + "")}</Cell>
                                            </TRow>
                                            <TRow isReadOnly>
                                                <Cell>Boxes</Cell>
                                                <Cell
                                                    style={{textAlign: "right"}}>{parseFloat((donation.spec.boxes || 0) + "")}</Cell>
                                            </TRow>
                                            <TRow isReadOnly>
                                                <Cell>Disassembly</Cell>
                                                <Cell
                                                    style={{textAlign: "right"}}>{parseFloat((donation.spec.disassembly || 0) + "")}</Cell>
                                            </TRow>
                                        </Body>
                                    </Table>
                                </Row>
                            </Well>
                            <Space size={20}/>
                            {donation.primaryDropOffOutcome && (
                                <Well>
                                    <StiledTitle>Accepted items</StiledTitle>
                                    <Row>
                                        {donation.primaryDropOffOutcome.acceptedItems.map((drop, index) => {
                                            if (drop.type) {
                                                return (
                                                    <DropImage xs={4} key={`item_${drop.type}_${index}`}>
                                                        <a href={drop.photos[0]} target="_blank">
                                                            <img src={drop.photos[0]}/>
                                                        </a>
                                                    </DropImage>
                                                )
                                            } else {
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
                                                    <Cell
                                                        style={{textAlign: "right"}}>{donation.primaryDropOffOutcome.pocName}</Cell>
                                                </TRow>
                                                <TRow isReadOnly>
                                                    <Cell>Phone</Cell>
                                                    <Cell
                                                        style={{textAlign: "right"}}>{donation.primaryDropOffOutcome.pocPhone}</Cell>
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
                            This user is a returning customer. To see their previous donations click here the button
                            below.
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
  border: 1px solid ${PALETTE.grey["300"]};
  width: 150px;
  height: 150px;
  margin: 5px;
  text-align: center;

  img {
    height: 100%;
    object-fit: contain;
  }
`
