export type DataTableRow = Record<string, any>

export interface Column {
	accessorKey: string
	header: string
	cell?: (row: DataTableRow) => any
}
