import React, {useState} from 'react';
import styled from 'styled-components';
import {Body, Cell, Head, HeaderCell, HeaderRow, Row, Table} from '@zendeskgarden/react-tables';
import {Pagination} from '@zendeskgarden/react-pagination';
import {DrawerModal} from '@zendeskgarden/react-modals';
import {Button} from '@zendeskgarden/react-buttons';
import {Stepper} from '@zendeskgarden/react-accordions';
import {useHistory} from "react-router-dom";

const StyledTable = styled(Table)`
  margin-bottom: ${p => p.theme.space.md};
  min-width: 500px;
`;

interface IRow {
    donationId: string;
    charity: string;
    customer: string;
    address: string;
    phoneNumber: string;
    status: string
}

const rowData: IRow[] = Array.from(Array(100)).map((row, index) => ({
    donationId: `MA-${index + Math.round(Math.random() * 100000)}`,
    charity: 'Habitat for Humanity',
    customer: 'John Doe',
    address: '1234 Jump High Rd, 30110 Boston MA',
    phoneNumber: "123-321-3455",
    status: 'awaiting-driver'
}));

const createRow = (row: IRow, index: number, onSelect: () => void) => (
    <Row key={index} onClick={onSelect}>
        <Cell>{row.donationId}</Cell>
        <Cell>{row.charity}</Cell>
        <Cell>{row.customer}</Cell>
        <Cell>{row.phoneNumber}</Cell>
        <Cell>{row.address}</Cell>
        <Cell>{row.status}</Cell>
    </Row>
);

export const DonationsTable = () => {
    const pageSize = 10;
    const history = useHistory();
    const [currentPage, setCurrentPage] = useState(1);
    const [isOpen, setIsOpen] = useState(false);
    const open = () => setIsOpen(true);
    const close = () => setIsOpen(false);


    return (
        <div style={{overflowX: 'auto'}}>
            <StyledTable>
                <Head>
                    <HeaderRow>
                        <HeaderCell>Donation ID</HeaderCell>
                        <HeaderCell>Charity</HeaderCell>
                        <HeaderCell>Donor</HeaderCell>
                        <HeaderCell>Phone number</HeaderCell>
                        <HeaderCell>Address</HeaderCell>
                        <HeaderCell>Status</HeaderCell>
                    </HeaderRow>
                </Head>
                <Body>
                    {currentPage === 1
                        ? rowData.slice(currentPage - 1, pageSize).map((row, index) => {
                            return createRow(row, index, open)
                        })
                        : rowData
                            .slice(currentPage * pageSize - pageSize, currentPage * pageSize)
                            .map((row, index) => {
                                return createRow(row, index, open)
                            })}
                </Body>
            </StyledTable>

            <DrawerModal isOpen={isOpen} onClose={close}>
                <DrawerModal.Header>Donation ID #45 | Tracking</DrawerModal.Header>
                <DrawerModal.Body>

                    <Stepper activeIndex={2}>
                        <Stepper.Step key="step-1">
                            <Stepper.Label>Donation submitted</Stepper.Label>
                            <Stepper.Content>
                                Your garden&apos;s success depends on its location, so choose a spot that has healthy
                                soil, gets good light, and is easily watered.
                            </Stepper.Content>
                        </Stepper.Step>
                        <Stepper.Step key="step-2">
                            <Stepper.Label>Service request dispatched</Stepper.Label>
                            <Stepper.Content>
                                The layout of your garden depends on its purpose. If you&apos;re planting flowers,
                                consider aesthetics like color and layout. If you&apos;re growing food, think about
                                harvest times and the kinds of pests that might be attracted to your crops.
                            </Stepper.Content>
                        </Stepper.Step>
                        <Stepper.Step key="step-3">
                            <Stepper.Label>Awaiting driver</Stepper.Label>
                            <Stepper.Content>
                                Service request is dispatched to all the drivers in the specified area.
                                You can still define driver manually.
                                <StyledButtons>
                                    <Button>Assign driver manually</Button>
                                </StyledButtons>
                            </Stepper.Content>
                        </Stepper.Step>
                        <Stepper.Step key="step-4">
                            <Stepper.Label>Driver on their way</Stepper.Label>
                            <Stepper.Content>
                                Driver is heading to the pickup location. Please wait until they update the pickup status.
                            </Stepper.Content>
                        </Stepper.Step>
                        <Stepper.Step key="step-5">
                            <Stepper.Label>Customer accepted the quote</Stepper.Label>
                            <Stepper.Content>
                                Driver is heading to the pickup location. Please wait until they update the pickup status.
                            </Stepper.Content>
                        </Stepper.Step>
                        <Stepper.Step key="step-6">
                            <Stepper.Label>Payment successful</Stepper.Label>
                            <Stepper.Content>
                                Driver is heading to the pickup location. Please wait until they update the pickup status.
                            </Stepper.Content>
                        </Stepper.Step>
                        <Stepper.Step key="step-7">
                            <Stepper.Label>Primary drop-off</Stepper.Label>
                            <Stepper.Content>
                                Driver is heading to the pickup location. Please wait until they update the pickup status.
                            </Stepper.Content>
                        </Stepper.Step>
                        <Stepper.Step key="step-8">
                            <Stepper.Label>Secondary drop-off</Stepper.Label>
                            <Stepper.Content>
                                Driver is heading to the pickup location. Please wait until they update the pickup status.
                            </Stepper.Content>
                        </Stepper.Step>
                        <Stepper.Step key="step-9">
                            <Stepper.Label>Donation complete</Stepper.Label>
                            <Stepper.Content>
                                Driver is heading to the pickup location. Please wait until they update the pickup status.
                            </Stepper.Content>
                        </Stepper.Step>
                    </Stepper>
                </DrawerModal.Body>
                <DrawerModal.Footer>
                    <DrawerModal.FooterItem>
                        <Button isBasic onClick={()=> {history.push('/donations/1')}}>
                            Show donation detailed view
                        </Button>
                    </DrawerModal.FooterItem>
                </DrawerModal.Footer>
                <DrawerModal.Close/>
            </DrawerModal>
        </div>
    );
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
