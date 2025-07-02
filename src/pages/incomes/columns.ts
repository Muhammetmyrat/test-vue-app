import type { Column } from '@/components/data-table/type'
import type { IncomeItem } from '@/api/types/income'

export const columns: Column<IncomeItem>[] = [
	{
		accessorKey: 'income_id',
		header: 'ID'
	},
	{
		accessorKey: 'number',
		header: 'Номер'
	},
	{
		accessorKey: 'date',
		header: 'Дата'
	},
	{
		accessorKey: 'last_change_date',
		header: 'Дата изменения'
	},
	{
		accessorKey: 'supplier_article',
		header: 'Артикул поставщика'
	},
	{
		accessorKey: 'tech_size',
		header: 'Технический размер'
	},
	{
		accessorKey: 'barcode',
		header: 'Штрихкод'
	},
	{
		accessorKey: 'quantity',
		header: 'Количество'
	},
	{
		accessorKey: 'total_price',
		header: 'Общая стоимость'
	},
	{
		accessorKey: 'date_close',
		header: 'Дата закрытия'
	},
	{
		accessorKey: 'warehouse_name',
		header: 'Склад'
	},
	{
		accessorKey: 'nm_id',
		header: 'Артикул WB'
	},
	{
		accessorKey: 'status',
		header: 'Статус',
		cell: (row: IncomeItem) => (row.date_close ? 'Закрыт' : 'Открыт')
	}
] as Column<IncomeItem>[]
