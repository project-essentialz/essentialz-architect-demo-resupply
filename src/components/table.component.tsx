import React, {useState} from "react";
import {Body, Cell, Head, HeaderCell, HeaderRow, Row, Table} from "@zendeskgarden/react-tables";
import {Pagination} from "@zendeskgarden/react-pagination";
import styled from "styled-components";

type TableContainerProps = {
    fields: { key: string, displayValue: string }[]
    onRowClicked: (rowData: any) => void
    data: any[]
}
export const TableComponent = (props: TableContainerProps) => {

    const {fields, onRowClicked, data} = props;

    const pageSize = 10;
    const [currentPage, setCurrentPage] = useState(1);


    const renderRow = (index: number, row: any) => (
        <Row key={`${index}-table-row`} onClick={() => onRowClicked(row)}>
            {fields.map(field => (
                <Cell key={field.key}>{row[field.key]}</Cell>
            ))}
        </Row>
    )

    const renderHeader = () => (
        <Head>
            <HeaderRow>
                {fields.map((field) => (
                    <HeaderCell key={field.key}>{field.displayValue}</HeaderCell>
                ))}
            </HeaderRow>
        </Head>
    )

    return (
        <div style={{overflowX: 'auto'}}>
            <StyledTable>
                {renderHeader()}
                <Body>
                    {currentPage === 1
                        ? data.slice(currentPage - 1, pageSize).map((row, index) => {
                            return renderRow(index, row)
                        })
                        : data
                            .slice(currentPage * pageSize - pageSize, currentPage * pageSize)
                            .map((row, index) => {
                                return renderRow(index, row)
                            })}
                </Body>
            </StyledTable>
            {/*<Pagination*/}
            {/*    totalPages={(data.length / pageSize) | 1}*/}
            {/*    currentPage={currentPage}*/}
            {/*    onChange={setCurrentPage}*/}
            {/*/>*/}
        </div>
    );
}

const StyledTable = styled(Table)`
  margin-bottom: ${p => p.theme.space.md};
  min-width: 500px;
`;
