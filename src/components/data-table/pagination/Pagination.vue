<script setup lang="ts">
import {
	Pagination,
	PaginationContent,
	PaginationEllipsis,
	PaginationItem,
	PaginationNext,
	PaginationPrevious,
	PaginationFirst,
	PaginationLast
} from '@/components/ui/pagination'
import PaginationInfo from './PaginationInfo.vue'
import { cn } from '@/lib/utils'
import type { PaginationMeta } from '@/api/types/pagination'

const props = defineProps({
	meta: {
		type: Object as () => PaginationMeta,
		required: true
	},
	showFirstLast: {
		type: Boolean,
		default: true
	},
	showPrevNext: {
		type: Boolean,
		default: true
	},
	showPageSize: {
		type: Boolean,
		default: true
	},
	pageSizeOptions: {
		type: Array as () => string[],
		default: () => ['10', '20', '50', '100']
	},
	disabled: {
		type: Boolean,
		default: false
	},
	showInfo: {
		type: Boolean,
		default: true
	}
})

const emit = defineEmits(['update:pageSize', 'update:page'])

function handlePageChange(page: number) {
	emit('update:page', page)
}

function handlePageSizeChange(size: number) {
	emit('update:pageSize', size)
	handlePageChange(1)
}

function getPageNumberFromLink(label: string): number {
	if (label.includes('Previous')) return props.meta.current_page - 1
	if (label.includes('Next')) return props.meta.current_page + 1
	return Number(label)
}
</script>

<template>
	<div class="flex flex-col sm:flex-row items-center justify-end gap-10">
		<PaginationInfo
			:page-size="meta.per_page"
			:page-size-options="pageSizeOptions"
			:disabled="disabled"
			:range-start="meta.from || 1"
			:range-end="meta.to || Number(meta.per_page)"
			:total-items="meta.total || 0"
			:show-page-size="showPageSize"
			:show-info="showInfo"
			@update:pageSize="handlePageSizeChange"
		/>

		<Pagination
			v-if="meta.last_page > 1"
			:items-per-page="Number(meta.per_page)"
			:total="meta.total"
			:current-page="meta.current_page"
			class="m-0 w-auto"
		>
			<PaginationContent class="gap-1">
				<PaginationItem v-if="showFirstLast" :value="1" class="w-auto rounded-md border border-input">
					<PaginationFirst
						class="w-auto"
						:disabled="disabled || meta.current_page === 1"
						@click="handlePageChange(1)"
					/>
				</PaginationItem>

				<template v-for="(link, index) in meta.links" :key="index">
					<PaginationItem v-if="link.label === '...'" class="w-auto" :value="0">
						<PaginationEllipsis class="h-8 w-8 p-0 rounded-md" />
					</PaginationItem>
					<PaginationItem
						v-else-if="link.label.includes('Previous') && showPrevNext"
						:value="getPageNumberFromLink(link.label)"
						class="w-auto rounded-md border border-input"
					>
						<PaginationPrevious
							class="w-auto"
							:disabled="disabled || meta.current_page === 1"
							@click="handlePageChange(getPageNumberFromLink(link.label))"
						/>
					</PaginationItem>

					<PaginationItem
						v-else-if="link.label.includes('Next') && showPrevNext"
						:value="getPageNumberFromLink(link.label)"
						class="w-auto rounded-md border border-input"
					>
						<PaginationNext
							class="w-auto"
							:disabled="disabled || meta.current_page === meta.last_page"
							@click="handlePageChange(getPageNumberFromLink(link.label))"
						/>
					</PaginationItem>

					<PaginationItem v-else :value="getPageNumberFromLink(link.label)" class="w-auto p-1">
						<button
							:class="
								cn(
									'h-8 w-8 p-0 rounded-md',
									link.active ? 'bg-primary text-primary-foreground' : 'hover:bg-muted',
									disabled && 'cursor-not-allowed opacity-50'
								)
							"
							:disabled="disabled || !link.url"
							@click="handlePageChange(Number(link.label))"
						>
							{{ link.label }}
						</button>
					</PaginationItem>
				</template>

				<PaginationItem
					v-if="showFirstLast"
					:value="meta.last_page"
					class="w-auto rounded-md border border-input"
				>
					<PaginationLast
						:disabled="disabled || meta.current_page === meta.last_page"
						@click="handlePageChange(meta.last_page)"
					/>
				</PaginationItem>
			</PaginationContent>
		</Pagination>
	</div>
</template>
