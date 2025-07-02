import { request } from './generic.api'
import type { ListQuery } from './types/query'
import type { SaleItem, SaleResponse } from './types/sale'

export async function GET_SALES(params: ListQuery): Promise<SaleResponse<SaleItem>> {
	const response = await request<SaleResponse<SaleItem>>({
		url: 'api/sales',
		method: 'GET',
		params
	})

	return response.data
}
