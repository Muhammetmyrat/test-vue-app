import type { Column } from '@/components/data-table/type'
import type { OrderItem } from '@/api/types/order'

export const columns: Column<OrderItem>[] = [
	{
		accessorKey: 'income_id',
		header: 'ID'
	},
	{
		accessorKey: 'g_number',
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
		accessorKey: 'total_price',
		header: 'Общая стоимость'
	},
	{
		accessorKey: 'discount_percent',
		header: 'Скидка (%)',
		cell: (row: OrderItem) => `${row.discount_percent}%`
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
		accessorKey: 'oblast',
		header: 'Область'
	},
	{
		accessorKey: 'brand',
		header: 'Бренд'
	},
	{
		accessorKey: 'is_cancel',
		header: 'Статус',
		cell: (row: OrderItem) => (row.is_cancel ? 'Отменен' : row.cancel_dt ? 'Закрыт' : 'Активен')
	}
] as Column<OrderItem>[]
