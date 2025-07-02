import type { Column } from '@/components/data-table/type'
import type { StockItem } from '@/api/types/stock'

export const columns = [
	{
		accessorKey: 'date',
		header: 'Дата',
		cell: (row: StockItem) =>
			new Date(row.date).toLocaleDateString('ru-RU', {
				day: '2-digit',
				month: '2-digit',
				year: 'numeric'
			})
	},
	{
		accessorKey: 'last_change_date',
		header: 'Последнее изменение',
		cell: (row: StockItem) =>
			new Date(row.last_change_date).toLocaleDateString('ru-RU', {
				day: '2-digit',
				month: '2-digit',
				year: 'numeric'
			})
	},
	{
		accessorKey: 'supplier_article',
		header: 'Артикул поставщика'
	},
	{
		accessorKey: 'tech_size',
		header: 'Тех. размер'
	},
	{
		accessorKey: 'barcode',
		header: 'Штрихкод',
		cell: (row: StockItem) => row.barcode.toString()
	},
	{
		accessorKey: 'quantity',
		header: 'Количество',
		cell: (row: StockItem) => row.quantity.toLocaleString('ru-RU')
	},
	{
		accessorKey: 'is_supply',
		header: 'Поставка',
		cell: (row: StockItem) => (row.is_supply ? 'Да' : 'Нет')
	},
	{
		accessorKey: 'is_realization',
		header: 'Реализация',
		cell: (row: StockItem) => (row.is_realization ? 'Да' : 'Нет')
	},
	{
		accessorKey: 'quantity_full',
		header: 'Полное количество',
		cell: (row: StockItem) => row.quantity_full.toLocaleString('ru-RU')
	},
	{
		accessorKey: 'warehouse_name',
		header: 'Склад'
	},
	{
		accessorKey: 'in_way_to_client',
		header: 'В пути к клиенту',
		cell: (row: StockItem) => row.in_way_to_client.toLocaleString('ru-RU')
	},
	{
		accessorKey: 'in_way_from_client',
		header: 'В пути от клиента',
		cell: (row: StockItem) => row.in_way_from_client.toLocaleString('ru-RU')
	},
	{
		accessorKey: 'nm_id',
		header: 'Артикул WB'
	},
	{
		accessorKey: 'subject',
		header: 'Предмет'
	},
	{
		accessorKey: 'category',
		header: 'Категория'
	},
	{
		accessorKey: 'brand',
		header: 'Бренд'
	},
	{
		accessorKey: 'sc_code',
		header: 'Код поставщика',
		cell: (row: StockItem) => row.sc_code.toString()
	},
	{
		accessorKey: 'price',
		header: 'Цена',
		cell: (row: StockItem) => `${parseFloat(row.price.toString()).toLocaleString('ru-RU')} ₽`
	},
	{
		accessorKey: 'discount',
		header: 'Скидка',
		cell: (row: StockItem) => `${parseFloat(row.discount.toString()).toLocaleString('ru-RU')}%`
	}
] as Column[]
