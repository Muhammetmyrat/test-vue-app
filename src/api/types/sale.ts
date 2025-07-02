import type { PaginationLinks, PaginationMeta } from './pagination'

export interface SaleItem {
	g_number: string
	date: string
	last_change_date: string
	supplier_article: string
	tech_size: string
	barcode: number
	total_price: string
	discount_percent: string
	is_supply: boolean
	is_realization: boolean
	promo_code_discount: string | null
	warehouse_name: string
	country_name: string
	oblast_okrug_name: string
	region_name: string
	income_id: number
	sale_id: string
	odid: string | null
	spp: string
	for_pay: string
	finished_price: string
	price_with_disc: string
	nm_id: number
	subject: string
	category: string
	brand: string
	is_storno: boolean | null
}

export interface SaleResponse<T> {
	data: T[]
	links: PaginationLinks
	meta: PaginationMeta
}
