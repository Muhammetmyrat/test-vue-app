import { request } from './generic.api'
import type { ListQuery } from './types/query'
import type { StockItem, StockResponse } from './types/stock'

export async function GET_STOCKS(params: ListQuery): Promise<StockResponse<StockItem>> {
	const response = await request<StockResponse<StockItem>>({
		url: 'api/stocks',
		method: 'GET',
		params
	})

	return response.data
}
