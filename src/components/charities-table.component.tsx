import React, {useState} from 'react';
import styled from 'styled-components';
import {Body, Cell, Head, HeaderCell, HeaderRow, Row, Table} from '@zendeskgarden/react-tables';
import {Pagination} from '@zendeskgarden/react-pagination';
import {useHistory} from "react-router-dom";

const StyledTable = styled(Table)`
  margin-bottom: ${p => p.theme.space.md};
  min-width: 500px;
`;

interface IRow {
    donationId: string;
    name: string;
    pointOfContact: string;
    address: string;
    phoneNumber: string;
    status: string
}

const rowData: IRow[] = Array.from(Array(100)).map((row, index) => ({
    donationId: `${index + Math.round(Math.random() * 1000)}`,
    name: 'Habitat for Humanity',
    pointOfContact: 'John Doe',
    address: '1234 Jump High Rd, 30110 Boston MA',
    phoneNumber: "123-321-3455",
    status: 'awaiting-driver'
}));

const createRow = (row: IRow, index: number, onSelect: () => void) => (
    <Row key={index} onClick={onSelect}>
        <Cell>{row.donationId}</Cell>
        <Cell>{row.name}</Cell>
        <Cell>{row.pointOfContact}</Cell>
        <Cell>{row.phoneNumber}</Cell>
        <Cell>{row.address}</Cell>
    </Row>
);

export const CharitiesTable = () => {
    const pageSize = 10;

    const history = useHistory();
    const [currentPage, setCurrentPage] = useState(1);

    const goToCharityPage = () => {
        history.push('/charities/1');
    }

    return (
        <div style={{overflowX: 'auto'}}>
            <StyledTable>
                <Head>
                    <HeaderRow>
                        <HeaderCell>Charity ID</HeaderCell>
                        <HeaderCell>Name</HeaderCell>
                        <HeaderCell>Point of contact</HeaderCell>
                        <HeaderCell>Phone number</HeaderCell>
                        <HeaderCell>Address</HeaderCell>
                    </HeaderRow>
                </Head>
                <Body>
                    {currentPage === 1
                        ? rowData.slice(currentPage - 1, pageSize).map((row, index) => {
                            return createRow(row, index, goToCharityPage)
                        })
                        : rowData
                            .slice(currentPage * pageSize - pageSize, currentPage * pageSize)
                            .map((row, index) => {
                                return createRow(row, index, goToCharityPage)
                            })}
                </Body>
            </StyledTable>
            <Pagination
                totalPages={rowData.length / pageSize}
                currentPage={currentPage}
                onChange={setCurrentPage}
            />
        </div>
    );
};


/**
 *
 * Name
 * Different roles and points of contact
 * Closing by / last drop-off time
 * Address
 * Zone
 * Logo
 * Days of operation -> Exceptions
 * Donation list / sum
 * Secondary drop point
 *
 */
