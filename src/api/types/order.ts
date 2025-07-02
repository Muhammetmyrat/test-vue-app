import type { PaginationLinks, PaginationMeta } from './pagination'

export interface OrderItem {
	g_number: string
	date: string
	last_change_date: string
	supplier_article: string
	tech_size: string
	barcode: number
	total_price: string
	discount_percent: number
	warehouse_name: string
	oblast: string
	income_id: number
	odid: string
	nm_id: number
	subject: string
	category: string
	brand: string
	is_cancel: boolean
	cancel_dt: string | null
}

export interface OrderResponse<T> {
	data: T[]
	links: PaginationLinks
	meta: PaginationMeta
}
