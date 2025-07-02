export interface PaginationLinks {
	first: string | null
	last: string | null
	prev: string | null
	next: string | null
}

export interface PaginationMeta {
	current_page: number
	from: number
	last_page: number
	links: {
		url: string | null
		label: string
		active: boolean
	}[]
	path: string
	per_page: string
	to: number
	total: number
}
