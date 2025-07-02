import type { PaginationLinks, PaginationMeta } from './pagination'

export interface IncomeItem {
	income_id: number
	number: string
	date: string
	last_change_date: string
	supplier_article: string
	tech_size: string
	barcode: string
	quantity: number
	total_price: number
	date_close?: string | null
	warehouse_name: string
	nm_id: number
	status: string
}

export interface IncomeResponse<T> {
	data: T[]
	links: PaginationLinks
	meta: PaginationMeta
}
