import { computed } from 'vue'
import type { Ref } from 'vue'
import { format, eachWeekOfInterval, isSameWeek, parseISO } from 'date-fns'
import { ru } from 'date-fns/locale'

interface ChartDataPoint {
	date: string
	value: number
	[key: string]: any
}

interface ChartDataConfig<T> {
	data: Ref<T[]>
	valueField: keyof T
	dateField?: keyof T
	groupByField?: keyof T
	timeUnit?: 'day' | 'week' | 'month'
	filterFn?: (item: T) => boolean
}

export function useChart<T>(config: ChartDataConfig<T>) {
	const filteredData = computed(() => {
		return config.filterFn ? config.data.value.filter(config.filterFn) : config.data.value
	})

	const barChartData = computed(() => {
		if (!filteredData.value.length) return { labels: [], values: [] }

		if (config.timeUnit && config.dateField) {
			const dates = filteredData.value.map(item =>
				parseISO(item[config.dateField as keyof T] as string)
			)
			const minDate = new Date(Math.min(...dates.map(d => d.getTime())))
			const maxDate = new Date(Math.max(...dates.map(d => d.getTime())))

			if (config.timeUnit === 'week') {
				const weeks = eachWeekOfInterval({ start: minDate, end: maxDate }, { weekStartsOn: 1 })

				const weekData = weeks.map(weekStart => {
					const weekItems = filteredData.value.filter(item => {
						const date = parseISO(item[config.dateField as keyof T] as string)
						return isSameWeek(date, weekStart, { weekStartsOn: 1 })
					})

					const value = weekItems.reduce((sum, item) => {
						const fieldValue = item[config.valueField]
						return sum + (fieldValue === true ? 1 : Number(fieldValue) || 0)
					}, 0)

					return {
						label: `${format(weekStart, 'ww', { locale: ru })} неделя (${format(weekStart, 'MMM', { locale: ru })})`,
						value,
						weekStart
					}
				})

				weekData.sort((a, b) => (a.weekStart > b.weekStart ? 1 : -1))

				return {
					labels: weekData.map(item => item.label),
					values: weekData.map(item => item.value)
				}
			}
		}

		if (config.groupByField) {
			const groupedMap = new Map<string, number>()

			filteredData.value.forEach(item => {
				const groupKey = String(item[config.groupByField as keyof T])
				const fieldValue = item[config.valueField]
				const value = fieldValue === true ? 1 : Number(fieldValue) || 0
				groupedMap.set(groupKey, (groupedMap.get(groupKey) || 0) + value)
			})

			return {
				labels: Array.from(groupedMap.keys()),
				values: Array.from(groupedMap.values())
			}
		}

		return {
			labels: [],
			values: []
		}
	})

	const lineChartData = computed<ChartDataPoint[]>(() => {
		const salesMap = new Map<string, number>()
		const dateField = config.dateField || ('date' as keyof T)

		if (config.data.value.length) {
			const data = config.data.value

			data.forEach(item => {
				const dateValue = item[dateField]
				const dateKey = typeof dateValue === 'string' ? dateValue.split('T')[0] : ''
				const value = Number(item[config.valueField]) || 0

				if (dateKey) {
					salesMap.set(dateKey, (salesMap.get(dateKey) || 0) + value)
				}
			})

			return Array.from(salesMap.entries())
				.sort(([dateA], [dateB]) => new Date(dateA).getTime() - new Date(dateB).getTime())
				.map(([date, value]) => ({ date, value }))
		}

		return []
	})

	return {
		lineChartData,
		barChartData,
		filteredData
	}
}
