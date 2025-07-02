import type { PaginationLinks, PaginationMeta } from './pagination'

export interface StockItem {
	date: string
	last_change_date: string
	supplier_article: string
	tech_size: string
	barcode: number
	quantity: number
	is_supply: boolean
	is_realization: boolean
	quantity_full: number
	warehouse_name: string
	in_way_to_client: number
	in_way_from_client: number
	nm_id: number
	subject: string
	category: string
	brand: string
	sc_code: number
	price: string
	discount: string
}

export interface StockResponse<T> {
	data: T[]
	links: PaginationLinks
	meta: PaginationMeta
}
