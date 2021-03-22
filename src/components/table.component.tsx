import React, {useState} from "react";
import {Body, Cell, Head, HeaderCell, HeaderRow, Row, SortableCell, Table} from "@zendeskgarden/react-tables";
import styled from "styled-components";
import _ from 'lodash'

type TableContainerProps = {
    fields: { key: string, displayValue: string, sortable?: boolean, onClick?: (item: string, rowData: any) => void }[]
    onRowClicked: (rowData: any) => void
    data: any[],
    tableSize?: 'small' | 'medium' | 'large'
}

type Direction = 'asc' | 'desc' | undefined;

export const TableComponent = (props: TableContainerProps) => {

    const {fields, onRowClicked, data, tableSize = 'medium'} = props;
    const [sortConfig, setSortConfig] = useState<{ field: string | null, direction: Direction }>({
        field: null,
        direction: undefined
    });

    const sortData = (tableData: any[]): any[] => {
        if (!tableData || tableData.length === 0) {
            return []
        }
        if (!sortConfig.field) {
            return tableData;
        }

        const field: string = sortConfig.field;
        const sortValue: Direction = sortConfig.direction;

        const sorted = tableData.sort((a, b) => {
            const aValue = a[field];
            const bValue = b[field];

            if (aValue > bValue) {
                return sortValue === 'asc' ? 1 : -1;
            } else if (aValue < bValue) {
                return sortValue === 'asc' ? -1 : 1;
            }

            return 0;
        })
        console.log(sorted);
        return sorted;
    };

    const renderRow = (index: number, row: any) => (
        <Row key={`${index}-table-row`} onClick={() => onRowClicked(row)}>
            {fields.map(field => (
                <Cell key={field.key}>
                    {field.onClick ? (
                            <a style={{cursor: 'pointer'}}>
                                {_.get(row, field.key)}
                            </a>)
                        : (_.get(row, field.key))}
                </Cell>
            ))}
        </Row>
    )

    const renderHeader = () => (
        <Head>
            <HeaderRow>
                {fields.map((field, index) => (
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
                    {
                        data ? (
                            sortData(data).map((row, index) => {
                                return renderRow(index, row)
                            })
                        ) : (<></>)
                    }
                </Body>
            </StyledTable>
        </div>
    );
}

const StyledTable = styled(Table)`
  margin-bottom: ${p => p.theme.space.md};
  min-width: 500px;
`;
