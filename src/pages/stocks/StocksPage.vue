<script setup lang="ts">
import DataTable from '@/components/data-table'
import { DateRangePicker } from '@/components/date-picker'
import { GET_STOCKS } from '@/api/stocks.api'
import { useResourceFetch } from '@/composables/useResourceFetch'
import { useFilters } from '@/composables/useFilters'
import { useChart } from '@/composables/useChart'
import { today } from '@/lib/helpers'
import type { StockItem } from '@/api/types/stock'
import { columns } from './columns'
import BarChart from '@/components/BarChart.vue'
import SelectFilter from '@/components/filters/SelectFilter.vue'

const {
	data,
	meta,
	loading,
	error,
	handleDateRangeChange,
	handlePageChange,
	handlePageSizeChange
} = useResourceFetch<StockItem>(GET_STOCKS, {
	dateFrom: today.toString(),
	dateTo: today.toString()
})

const { selectedWarehouse, filterOptions, filteredData } = useFilters<StockItem>(data)

const chartData = useChart<StockItem>({
	data: filteredData,
	valueField: 'is_supply',
	dateField: 'date',
	timeUnit: 'week',
	filterFn: (item: StockItem) => item.quantity_full > 0
})
</script>

<template>
	<div class="container mx-auto py-8 flex flex-col gap-6">
		<h1 class="text-5xl font-bold">Акции</h1>

		<div class="flex flex-wrap gap-4 items-end justify-end">
			<DateRangePicker @selected="handleDateRangeChange" />

			<SelectFilter
				v-model="selectedWarehouse"
				:options="filterOptions.warehouses"
				placeholder="Все склады"
				label="Склад"
			/>
		</div>

		<BarChart
			:data="chartData.barChartData"
			title="Изменение акции по неделям"
			show-tooltips
			line-color="--color-chart-5"
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
