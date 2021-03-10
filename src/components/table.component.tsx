import React, {useState} from "react";
import {Body, Cell, Head, HeaderCell, HeaderRow, Row, SortableCell, Table} from "@zendeskgarden/react-tables";
import styled from "styled-components";

type TableContainerProps = {
    fields: { key: string, displayValue: string, sortable?: boolean, onClick?: (item: string, rowData: any) => void }[]
    onRowClicked: (rowData: any) => void
    data: any[],
    tableSize?: 'small' | 'medium' | 'large'
}

type Direction = 'asc' | 'desc' | undefined;

export const TableComponent = (props: TableContainerProps) => {

    const {fields, onRowClicked, data, tableSize = 'medium'} = props;

    const pageSize = 100;
    const [currentPage, setCurrentPage] = useState(1);
    const [sortConfig, setSortConfig] = useState<{field: string | null, direction: Direction}>({field: null, direction: undefined});

    const sortData = (tableData: any[]) => {
        if (!sortConfig.field) {
            return tableData;
        }

        const field: string = sortConfig.field;
        const sortValue: Direction = sortConfig.direction;

        return tableData.sort((a, b) => {
            const aValue = a[field];
            const bValue = b[field];

            if (aValue > bValue) {
                return sortValue === 'asc' ? 1 : -1;
            } else if (aValue < bValue) {
                return sortValue === 'asc' ? -1 : 1;
            }

            return 0;
        });
    };

    const renderRow = (index: number, row: any) => (
        <Row key={`${index}-table-row`} onClick={() => onRowClicked(row)}>
            {fields.map(field => (
                <Cell key={field.key}>
                    {field.onClick ? (
                        <a style={{cursor: 'pointer'}}
                           onClick={() => {field.onClick!(field.displayValue, row)}}>
                            {row[field.key]}
                        </a>)
                        : (row[field.key])}
                </Cell>
            ))}
        </Row>
    )

    const renderHeader = () => (
        <Head>
            <HeaderRow>
                {fields.map((field) => (
                    field.sortable ?
                        (
                            <SortableCell
                                key={field.key}
                                onClick={() => {
                                    if (sortConfig.direction === 'asc') {
                                        setSortConfig({field: field.key, direction: 'desc'});
                                    } else if (sortConfig.direction === 'desc') {
                                        setSortConfig({field: null, direction: undefined});
                                    } else {
                                        setSortConfig({field: field.key, direction: 'asc'});
                                    }
                                }}
                                sort={sortConfig.direction}
                            >
                                {field.displayValue}
                            </SortableCell>
                        ) :
                        (<HeaderCell key={field.key}>{field.displayValue}</HeaderCell>)
                ))}
            </HeaderRow>
        </Head>
    )

    return (
        <div style={{overflowX: 'auto'}}>
            <StyledTable size={tableSize}>
                {renderHeader()}
                <Body>
                    {currentPage === 1
                        ? sortData(data).slice(currentPage - 1, pageSize).map((row, index) => {
                            return renderRow(index, row)
                        })
                        : data
                            .slice(currentPage * pageSize - pageSize, currentPage * pageSize)
                            .map((row, index) => {
                                return renderRow(index, row)
                            })}
                </Body>
            </StyledTable>
        </div>
    );
}

const StyledTable = styled(Table)`
  margin-bottom: ${p => p.theme.space.md};
  min-width: 500px;
`;
