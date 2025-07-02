import type { NavigationGuardNext, RouteLocationNormalized } from 'vue-router'

const LayoutsEnum = {
	default: 'default',
	empty: 'empty'
} as const

const LayoutToFileMap = {
	default: 'Default.vue',
	empty: 'Empty.vue'
} as const

type LayoutName = keyof typeof LayoutsEnum

interface RouteMeta {
	layout?: LayoutName
	layoutComponent?: unknown
	[key: string]: unknown
}

export async function loadLayoutMiddleware(
	to: RouteLocationNormalized,
	_: RouteLocationNormalized,
	next: NavigationGuardNext
): Promise<void> {
	const layout = (to.meta as RouteMeta).layout || LayoutsEnum.default
	const fileName = LayoutToFileMap[layout as LayoutName]
	const fileNameWithoutExtension = fileName.replace(/\.vue$/, '')

	const component = await import(`../layouts/${fileNameWithoutExtension}.vue`)
	const routeMeta = to.meta as RouteMeta
	routeMeta.layoutComponent = component.default

	next()
}
