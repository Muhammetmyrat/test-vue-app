<script setup lang="ts">
import { computed } from 'vue'
import type { Ref } from 'vue'
import {
	Chart as ChartJS,
	Title,
	Tooltip,
	Legend,
	LineElement,
	PointElement,
	CategoryScale,
	LinearScale,
	TimeScale,
	Filler
} from 'chart.js'
import type { ChartOptions } from 'chart.js'
import { Line } from 'vue-chartjs'
import 'chartjs-adapter-date-fns'
import { ru } from 'date-fns/locale'
import { oklchToRgb, hexToRgb } from '@/lib/utils'

ChartJS.register(
	Title,
	Tooltip,
	Legend,
	LineElement,
	PointElement,
	CategoryScale,
	LinearScale,
	TimeScale,
	Filler
)

interface ChartDataPoint {
	date: string
	value: number
}

const props = defineProps<{
	data: Ref<ChartDataPoint[]>
	title?: string
	lineColor: string
	fillColor?: string
	showTooltips?: boolean
	timeUnit?: 'day' | 'week' | 'month'
}>()

const cleanedData = computed(() =>
	props.data.value.map(item => ({
		date: item.date.split(' ')[0],
		value: item.value
	}))
)

const colorValue = computed(() => {
	const style = getComputedStyle(document.documentElement)
	return style.getPropertyValue(props.lineColor).trim() || 'var(--color-primary)'
})

const borderColor = computed(() => {
	if (colorValue.value.startsWith('oklch')) {
		try {
			const matches = colorValue.value.match(/oklch\(([^)]+)\)/)
			if (matches?.[1]) {
				const [l, c, h] = matches[1].split(/\s+/).map(parseFloat)
				return oklchToRgb(l, c, h)
			}
		} catch (e) {
			console.warn('Failed to parse OKLCH color', e)
		}
	}
	return colorValue.value
})

const backgroundColor = computed(() => {
	try {
		const rgb = hexToRgb(borderColor.value)
		return `rgba(${rgb}, 0.2)`
	} catch (e) {
		console.warn('Failed to parse hexToRgb color', e)
		return 'rgba(59, 130, 246, 0.2)'
	}
})

const chartData = computed(() => {
	if (cleanedData.value.length) {
		return {
			labels: cleanedData.value.map(item => item.date),
			datasets: [
				{
					label: props.title,
					data: cleanedData.value.map(item => item.value),
					borderColor: borderColor.value,
					backgroundColor: backgroundColor.value,
					borderWidth: 2,
					pointRadius: 4,
					pointHoverRadius: 6,
					fill: true,
					tension: 0.3
				}
			]
		}
	}

	return {
		labels: [],
		datasets: []
	}
})

const chartOptions = computed<ChartOptions<'line'>>(() => ({
	responsive: true,
	maintainAspectRatio: false,
	plugins: {
		legend: {
			position: 'top' as const,
			labels: {
				usePointStyle: true,
				padding: 20
			}
		},
		title: {
			display: !!props.title,
			text: props.title,
			font: {
				size: 16
			},
			padding: {
				bottom: 20
			}
		},
		tooltip: {
			enabled: props.showTooltips,
			callbacks: {
				label: context => {
					const value = context.parsed.y
					return `${props.title}: ${value.toLocaleString('ru-RU')} ₽`
				}
			}
		}
	},
	scales: {
		x: {
			type: 'time',
			time: {
				parser: 'yyyy-MM-dd',
				tooltipFormat: 'dd MMM yyyy',
				unit: props.timeUnit,
				displayFormats: {
					day: 'dd MMM',
					week: 'dd MMM',
					month: 'MMM yyyy'
				}
			},
			title: {
				display: true,
				text: 'Дата',
				padding: 10
			},
			adapters: {
				date: {
					locale: ru
				}
			},
			grid: {
				display: false
			}
		},
		y: {
			beginAtZero: false,
			title: {
				display: true,
				text: 'Сумма',
				padding: 10
			},
			ticks: {
				callback: value => `${Number(value).toLocaleString('ru-RU')} ₽`
			},
			grid: {
				color: (context: { tick: { value: number } }) =>
					context.tick.value === 0 ? 'rgba(0, 0, 0, 0.1)' : 'rgba(0, 0, 0, 0.05)'
			}
		}
	},
	interaction: {
		intersect: false,
		mode: 'index'
	}
}))
</script>

<template>
	<div class="position-relative w-full h-[500px]">
		<Line :data="chartData" :options="chartOptions" />
	</div>
</template>
