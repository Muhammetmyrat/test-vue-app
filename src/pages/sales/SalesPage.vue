<script setup lang="ts">
import DataTable from '@/components/data-table'
import { DateRangePicker } from '@/components/date-picker'
import { GET_SALES } from '@/api/sales.api'
import { useResourceFetch } from '@/composables/useResourceFetch'
import { useFilters } from '@/composables/useFilters'
import { useChart } from '@/composables/useChart'
import { today } from '@/lib/helpers'
import type { SaleItem } from '@/api/types/sale'
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
} = useResourceFetch<SaleItem>(GET_SALES, {
	dateFrom: today.toString(),
	dateTo: today.toString()
})

const { selectedWarehouse, selectedRegion, selectedCountry, filterOptions, filteredData } =
	useFilters<SaleItem>(data)

const chartData = useChart<SaleItem>({
	data: filteredData,
	valueField: 'total_price',
	dateField: 'date'
})
</script>

<template>
	<div class="container mx-auto py-8 flex flex-col gap-6">
		<h1 class="text-5xl font-bold">Продажи</h1>

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

			<SelectFilter
				v-model="selectedCountry"
				:options="filterOptions.countries"
				placeholder="Все страны"
				label="Страна"
			/>
		</div>

		<LineChart
			:data="chartData.lineChartData"
			title="Динамика продаж по дням"
			show-tooltips
			time-unit="day"
			line-color="--color-chart-4"
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
