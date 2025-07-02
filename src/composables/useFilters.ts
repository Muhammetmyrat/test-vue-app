import { ref, computed } from 'vue'
import type { Ref } from 'vue'

interface FilterOptions {
	warehouses: string[]
	regions: string[]
	countries: string[]
}

interface Filters<T> {
	selectedWarehouse: Ref<string>
	selectedRegion: Ref<string>
	selectedCountry: Ref<string>
	filterOptions: Ref<FilterOptions>
	filteredData: Ref<T[]>
}

export function useFilters<
	T extends {
		warehouse_name: string
		region_name: string
		country_name: string
	}
>(initialData: Ref<T[]>): Filters<T> {
	const selectedWarehouse = ref<string>('all')
	const selectedRegion = ref<string>('all')
	const selectedCountry = ref<string>('all')

	const filterOptions = computed<FilterOptions>(() => {
		const data = initialData.value

		return {
			warehouses: Array.from(new Set(data.map(item => item.warehouse_name))).filter(Boolean),
			regions: Array.from(new Set(data.map(item => item.region_name))).filter(Boolean),
			countries: Array.from(new Set(data.map(item => item.country_name))).filter(Boolean)
		}
	})

	const filteredData = computed(() => {
		return initialData.value.filter(item => {
			const warehouseMatch =
				selectedWarehouse.value !== 'all' ? item.warehouse_name === selectedWarehouse.value : true
			const regionMatch =
				selectedRegion.value !== 'all' ? item.region_name === selectedRegion.value : true
			const countryMatch =
				selectedCountry.value !== 'all' ? item.country_name === selectedCountry.value : true
			return warehouseMatch && regionMatch && countryMatch
		})
	})

	return {
		selectedWarehouse,
		selectedRegion,
		selectedCountry,
		filterOptions,
		filteredData
	}
}
