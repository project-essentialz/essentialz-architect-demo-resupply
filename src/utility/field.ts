export const field = (
    key: string,
    displayValue: string,
    sortable?: boolean,
    onClick?: (item: string, rowData: any) => void
) => (
    {
        key,
        displayValue,
        sortable,
        onClick
    }
)
