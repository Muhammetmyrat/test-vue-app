import { request } from './generic.api'
import type { ListQuery } from './types/query'
import type { IncomeItem, IncomeResponse } from './types/income'

export async function GET_INCOMES(params: ListQuery): Promise<IncomeResponse<IncomeItem>> {
	const response = await request<IncomeResponse<IncomeItem>>({
		url: 'api/incomes',
		method: 'GET',
		params
	})

	return response.data
}
