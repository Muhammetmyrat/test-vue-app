<script setup lang="ts">
import { computed } from 'vue'
import type { Ref } from 'vue'
import { Bar } from 'vue-chartjs'
import {
	Chart as ChartJS,
	Title,
	Tooltip,
	Legend,
	BarElement,
	CategoryScale,
	LinearScale
} from 'chart.js'
import type { ChartOptions, TooltipItem } from 'chart.js'
import { oklchToRgb, hexToRgb } from '@/lib/utils'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

interface ChartDataPoint {
	labels: string[]
	values: number[]
}

const props = defineProps<{
	data: Ref<ChartDataPoint>
	title?: string
	lineColor: string
	showTooltips?: boolean
}>()

const backgroundColor = computed(() => {
	const style = getComputedStyle(document.documentElement)
	const colorValue = style.getPropertyValue(props.lineColor).trim() || 'var(--color-primary)'

	if (colorValue.startsWith('oklch')) {
		try {
			const matches = colorValue.match(/oklch\(([^)]+)\)/)
			if (matches?.[1]) {
				const [l, c, h] = matches[1].split(/\s+/).map(parseFloat)
				const rgb = oklchToRgb(l, c, h)
				return `rgba(${hexToRgb(rgb)}, 0.2)`
			}
		} catch (e) {
			console.warn('Failed to parse OKLCH color', e)
		}
	}

	return `rgba(${hexToRgb(colorValue)}, 0.2)`
})

const chartData = computed(() => {
	return {
		labels: props.data.value.labels,
		datasets: [
			{
				label: props.title,
				data: props.data.value.values,
				backgroundColor: backgroundColor.value
			}
		]
	}
})

const chartOptions = computed<ChartOptions<'bar'>>(() => ({
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
				label: (context: TooltipItem<'bar'>) => {
					const value = context.parsed.y
					return `${context.dataset.label}: ${value.toLocaleString('ru-RU')}`
				}
			}
		}
	},
	scales: {
		y: {
			beginAtZero: true,
			title: {
				display: true,
				text: 'Количество',
				padding: 10
			},
			ticks: {
				callback: (value: string | number) => `${Number(value).toLocaleString('ru-RU')}`
			},
			grid: {
				color: (context: { tick: { value: number } }) =>
					context.tick.value === 0 ? 'rgba(0, 0, 0, 0.1)' : 'rgba(0, 0, 0, 0.05)'
			}
		},
		x: {
			title: {
				display: true,
				text: 'Период'
			},
			grid: {
				display: false
			}
		}
	}
}))
</script>

<template>
	<div class="position-relative w-full h-[500px]">
		<Bar :data="chartData" :options="chartOptions" />
	</div>
</template>
