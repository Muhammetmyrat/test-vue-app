import type { Column } from '@/components/data-table/type'
import type { SaleItem } from '@/api/types/sale'

export const columns = [
	{
		accessorKey: 'g_number',
		header: 'Номер заказа',
		width: 180
	},
	{
		accessorKey: 'date',
		header: 'Дата заказа',
		cell: (row: SaleItem) =>
			new Date(row.date).toLocaleDateString('ru-RU', {
				day: '2-digit',
				month: '2-digit',
				year: 'numeric',
				hour: '2-digit',
				minute: '2-digit'
			})
	},
	{
		accessorKey: 'last_change_date',
		header: 'Дата изменения',
		cell: (row: SaleItem) => new Date(row.last_change_date).toLocaleDateString('ru-RU')
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
		header: 'Общая сумма',
		cell: (row: SaleItem) => `${parseFloat(row.total_price).toLocaleString('ru-RU')} ₽`
	},
	{
		accessorKey: 'discount_percent',
		header: 'Скидка %',
		cell: (row: SaleItem) => `${row.discount_percent}%`
	},
	{
		accessorKey: 'is_supply',
		header: 'Поставка',
		cell: (row: SaleItem) => (row.is_supply ? 'Да' : 'Нет')
	},
	{
		accessorKey: 'is_realization',
		header: 'Реализация',
		cell: (row: SaleItem) => (row.is_realization ? 'Да' : 'Нет')
	},
	{
		accessorKey: 'promo_code_discount',
		header: 'Промо-скидка',
		cell: (row: SaleItem) => row.promo_code_discount || '—'
	},
	{
		accessorKey: 'warehouse_name',
		header: 'Склад'
	},
	{
		accessorKey: 'country_name',
		header: 'Страна'
	},
	{
		accessorKey: 'oblast_okrug_name',
		header: 'Федеральный округ'
	},
	{
		accessorKey: 'region_name',
		header: 'Регион'
	},
	{
		accessorKey: 'income_id',
		header: 'ID поступления'
	},
	{
		accessorKey: 'sale_id',
		header: 'ID продажи'
	},
	{
		accessorKey: 'odid',
		header: 'ID заказа WB',
		cell: (row: SaleItem) => row.odid || '—'
	},
	{
		accessorKey: 'spp',
		header: 'СПП',
		tooltip: 'Скидка постоянного покупателя'
	},
	{
		accessorKey: 'for_pay',
		header: 'К оплате',
		cell: (row: SaleItem) => `${parseFloat(row.for_pay).toLocaleString('ru-RU')} ₽`
	},
	{
		accessorKey: 'finished_price',
		header: 'Фактическая цена',
		cell: (row: SaleItem) => `${parseFloat(row.finished_price).toLocaleString('ru-RU')} ₽`
	},
	{
		accessorKey: 'price_with_disc',
		header: 'Цена со скидкой',
		cell: (row: SaleItem) => `${parseFloat(row.price_with_disc).toLocaleString('ru-RU')} ₽`
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
		accessorKey: 'is_storno',
		header: 'Сторно',
		cell: (row: SaleItem) => (row.is_storno === null ? '—' : row.is_storno ? 'Да' : 'Нет')
	}
] as Column[]
