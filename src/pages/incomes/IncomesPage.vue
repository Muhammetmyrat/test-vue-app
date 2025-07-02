<script setup lang="ts">
import DataTable from '@/components/data-table'
import { DateRangePicker } from '@/components/date-picker'
import { GET_INCOMES } from '@/api/incomes.api'
import { useResourceFetch } from '@/composables/useResourceFetch'
import { useFilters } from '@/composables/useFilters'
import { useChart } from '@/composables/useChart'
import { today } from '@/lib/helpers'
import type { IncomeItem } from '@/api/types/income'
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
} = useResourceFetch<IncomeItem>(GET_INCOMES, {
	dateFrom: today.toString(),
	dateTo: today.toString()
})

const { selectedWarehouse, filterOptions, filteredData } = useFilters<IncomeItem>(data)

const chartData = useChart<IncomeItem>({
	data: filteredData,
	valueField: 'quantity',
	groupByField: 'warehouse_name'
})
</script>

<template>
	<div class="container mx-auto py-8 flex flex-col gap-6">
		<h1 class="text-5xl font-bold">Доходы</h1>

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
			title="Количество доходов по складом"
			show-tooltips
			line-color="--color-chart-2"
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
