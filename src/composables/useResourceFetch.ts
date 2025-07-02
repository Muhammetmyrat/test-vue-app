import { reactive, ref, watch } from 'vue'
import type { PaginationMeta } from '@/api/types/pagination'

export interface Pagination {
	page: number
	pageSize: number
}

export interface DateRange {
	dateFrom: string
	dateTo: string
}

export interface FetchParams {
	dateFrom: string
	dateTo: string
	page: number
	limit: number
}

export function useResourceFetch<T>(
	fetchFn: (params: FetchParams) => Promise<{ data: T[]; meta: PaginationMeta }>,
	initialFilter?: DateRange
) {
	const data = ref<T[]>([])
	const meta = ref<PaginationMeta>({} as PaginationMeta)

	const loading = ref(false)
	const error = ref<string | null>(null)

	const filter = reactive<DateRange>({
		dateFrom: initialFilter?.dateFrom || '',
		dateTo: initialFilter?.dateTo || ''
	})

	const pagination = reactive<Pagination>({
		page: 1,
		pageSize: 10
	})

	async function fetchData() {
		loading.value = true
		error.value = null
		try {
			const result = await fetchFn({
				dateFrom: filter.dateFrom,
				dateTo: filter.dateTo,
				page: pagination.page,
				limit: pagination.pageSize
			})
			data.value = result.data
			meta.value = result.meta
		} catch (e) {
			error.value = 'Не удалось загрузить данные'
			console.error(e)
		} finally {
			loading.value = false
		}
	}

	function handleDateRangeChange(range: DateRange) {
		filter.dateFrom = range.dateFrom
		filter.dateTo = range.dateTo
		pagination.page = 1
		fetchData()
	}

	function handlePageChange(newPage: number) {
		pagination.page = newPage
	}

	function handlePageSizeChange(newSize: number) {
		pagination.pageSize = newSize
		handlePageChange(1)
	}

	watch(() => [pagination.page, pagination.pageSize], fetchData, { immediate: true })

	return {
		data,
		meta,
		loading,
		error,
		handleDateRangeChange,
		handlePageChange,
		handlePageSizeChange,
		fetchData
	}
}
