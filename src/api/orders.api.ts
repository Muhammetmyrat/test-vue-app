import { request } from './generic.api'
import type { ListQuery } from './types/query'
import type { OrderItem, OrderResponse } from './types/order'

export async function GET_ORDERS(params: ListQuery): Promise<OrderResponse<OrderItem>> {
	const response = await request<OrderResponse<OrderItem>>({
		url: 'api/orders',
		method: 'GET',
		params
	})

	return response.data
}
