import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import { loadLayoutMiddleware } from './loadLayout.middleware'

const routes: Array<RouteRecordRaw> = [
	{
		path: '/incomes',
		name: 'incomes',
		component: () => import('@/pages/incomes/IncomesPage.vue')
	},
	{
		path: '/orders',
		name: 'orders',
		component: () => import('@/pages/orders/OrdersPage.vue')
	},
	{
		path: '/sales',
		name: 'sales',
		component: () => import('@/pages/sales/SalesPage.vue')
	},
	{
		path: '/stocks',
		name: 'stocks',
		component: () => import('@/pages/stocks/StocksPage.vue')
	},
	{
		path: '/',
		redirect: '/incomes'
	}
]

const router = createRouter({
	history: createWebHistory(import.meta.env.VITE_APP_BASE_URL as string),
	routes
})

router.beforeEach(loadLayoutMiddleware)

export default router
