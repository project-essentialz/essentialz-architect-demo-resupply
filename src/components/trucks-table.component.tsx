import React, {useState} from 'react';
import styled from 'styled-components';
import {Body, Cell, Head, HeaderCell, HeaderRow, Row, Table} from '@zendeskgarden/react-tables';
import {Pagination} from '@zendeskgarden/react-pagination';

const StyledTable = styled(Table)`
  margin-bottom: ${p => p.theme.space.md};
  min-width: 500px;
`;


/**
 Organization name
 Driver name
 Star rating
 Phone number
 Zone
 */


interface IRow {
    partnerId: string;
    name: string;
    organizationName: string;
    starRating: string;
    phoneNumber: string;
    zone: string
}

const rowData: IRow[] = Array.from(Array(3)).map((row, index) => ({
    partnerId: `${index + Math.round(Math.random() * 1000)}`,
    name: 'John Doe',
    organizationName: 'HugeJunk Ltd',
    phoneNumber: "123-321-3455",
    starRating: '4.5',
    zone: 'Zone 1'
}));

const createRow = (row: IRow, index: number, onSelect: () => void) => (
    <Row key={index} onClick={onSelect}>
        <Cell>{row.partnerId}</Cell>
        <Cell>{row.name}</Cell>
        <Cell>{row.organizationName}</Cell>
        <Cell>{row.phoneNumber}</Cell>
        <Cell>{row.zone}</Cell>
        <Cell>{row.starRating}</Cell>
    </Row>
);

export const TrucksTable = () => {
    const pageSize = 10;
    const [currentPage, setCurrentPage] = useState(1);


    return (
        <div style={{overflowX: 'auto'}}>
            <StyledTable>
                <Head>
                    <HeaderRow>
                        <HeaderCell>Partner ID</HeaderCell>
                        <HeaderCell>Name</HeaderCell>
                        <HeaderCell>Organization</HeaderCell>
                        <HeaderCell>Phone number</HeaderCell>
                        <HeaderCell>Zone</HeaderCell>
                        <HeaderCell>Star rating</HeaderCell>
                    </HeaderRow>
                </Head>
                <Body>
                    {currentPage === 1
                        ? rowData.slice(currentPage - 1, pageSize).map((row, index) => {
                            return createRow(row, index, () => {
                            })
                        })
                        : rowData
                            .slice(currentPage * pageSize - pageSize, currentPage * pageSize)
                            .map((row, index) => {
                                return createRow(row, index, () => {
                                })
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



