<script setup lang="ts">
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow
} from '@/components/ui/table'
import Pagination from './pagination'
import { Skeleton } from '@/components/ui/skeleton'
import type { PaginationMeta } from '@/api/types/pagination'
import type { Column, DataTableRow } from './type'

defineProps<{
	columns: Column[]
	data: DataTableRow[]
	meta: PaginationMeta
	loading?: boolean
	error?: string | null
}>()

const emit = defineEmits<{
	(e: 'update:page', page: number): void
	(e: 'update:pageSize', size: number): void
}>()
</script>

<template>
	<div class="space-y-4">
		<div class="rounded-md border">
			<Table>
				<TableHeader>
					<TableRow>
						<TableHead v-for="column in columns" :key="column.accessorKey" class="h-12">
							{{ column.header }}
						</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					<template v-if="loading">
						<TableRow v-for="i in Number(meta?.per_page || 10)" :key="i">
							<TableCell v-for="column in columns" :key="column.accessorKey" class="h-12">
								<Skeleton class="h-8 w-full" />
							</TableCell>
						</TableRow>
					</template>
					<template v-else-if="error">
						<TableRow>
							<TableCell :colspan="columns.length" class="h-24 text-center text-destructive">
								{{ error }}
							</TableCell>
						</TableRow>
					</template>
					<template v-else-if="data.length === 0">
						<TableRow>
							<TableCell :colspan="columns.length" class="h-24 text-center">
								К сожалению, результатов не найдено.
							</TableCell>
						</TableRow>
					</template>
					<template v-else>
						<TableRow v-for="(row, index) in data" :key="row.id || index">
							<TableCell v-for="column in columns" :key="column.accessorKey" class="h-12">
								<template v-if="column.cell">
									{{ column.cell(row) }}
								</template>
								<template v-else>
									{{ row[column.accessorKey] }}
								</template>
							</TableCell>
						</TableRow>
					</template>
				</TableBody>
			</Table>
		</div>

		<Pagination
			:meta="meta"
			:disabled="loading"
			@update:page="page => emit('update:page', page)"
			@update:page-size="size => emit('update:pageSize', size)"
		/>
	</div>
</template>
