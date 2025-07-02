<script setup lang="ts">
import DataTable from '@/components/data-table'
import { DateRangePicker } from '@/components/date-picker'
import { GET_ORDERS } from '@/api/orders.api'
import { useResourceFetch } from '@/composables/useResourceFetch'
import { useFilters } from '@/composables/useFilters'
import { useChart } from '@/composables/useChart'
import { today } from '@/lib/helpers'
import type { OrderItem } from '@/api/types/order'
import { columns } from './columns'
import LineChart from '@/components/LineChart.vue'
import SelectFilter from '@/components/filters/SelectFilter.vue'

const {
	data,
	meta,
	loading,
	error,
	handleDateRangeChange,
	handlePageChange,
	handlePageSizeChange
} = useResourceFetch<OrderItem>(GET_ORDERS, {
	dateFrom: today.toString(),
	dateTo: today.toString()
})

const { selectedWarehouse, selectedRegion, filterOptions, filteredData } =
	useFilters<OrderItem>(data)

const chartData = useChart<OrderItem>({
	data: filteredData,
	valueField: 'total_price',
	dateField: 'date'
})
</script>

<template>
	<div class="container mx-auto py-8 flex flex-col gap-6">
		<h1 class="text-5xl font-bold">Заказы</h1>

		<div class="flex flex-wrap gap-4 items-end justify-end">
			<DateRangePicker @selected="handleDateRangeChange" />

			<SelectFilter
				v-model="selectedWarehouse"
				:options="filterOptions.warehouses"
				placeholder="Все склады"
				label="Склад"
			/>

			<SelectFilter
				v-model="selectedRegion"
				:options="filterOptions.regions"
				placeholder="Все регионы"
				label="Регион"
			/>
		</div>

		<LineChart
			:data="chartData.lineChartData"
			title="Динамика заказов по дням"
			show-tooltips
			time-unit="day"
			line-color="--color-chart-3"
		/>

		<DataTable
			:columns="columns"
			:data="filteredData"
			:meta="meta"
			:loading="loading"
			:error="error"
			@update:page="handlePageChange"
			@update:pageSize="handlePageSizeChange"
		/>
	</div>
</template>
