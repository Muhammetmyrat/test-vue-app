<script setup lang="ts">
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue
} from '@/components/ui/select'
import type { AcceptableValue } from 'reka-ui'

defineProps({
	pageSize: { type: String, required: true, default: '10' },
	pageSizeOptions: {
		type: Array as () => string[],
		default: () => ['10', '20', '50', '100']
	},
	rangeStart: { type: Number, required: true, default: 1 },
	rangeEnd: { type: Number, required: true, default: 10 },
	totalItems: { type: Number, required: true, default: 0 },
	disabled: { type: Boolean, default: false },
	showPageSize: { type: Boolean, default: true },
	showInfo: { type: Boolean, default: true }
})

const emit = defineEmits(['update:pageSize'])

function handlePageSizeChange(size: AcceptableValue) {
	emit('update:pageSize', size)
}
</script>

<template>
	<div class="flex flex-col sm:flex-row items-center justify-end gap-6">
		<div v-if="showInfo" class="text-sm text-muted-foreground">
			Показано с {{ rangeStart }} по {{ rangeEnd }} из {{ totalItems }} записей
		</div>

		<div v-if="showPageSize" class="flex items-center gap-2">
			<span class="text-sm text-muted-foreground">Строк на странице</span>
			<Select :model-value="pageSize" :disabled="disabled" @update:model-value="handlePageSizeChange">
				<SelectTrigger class="h-8 w-max">
					<SelectValue :placeholder="pageSize" />
				</SelectTrigger>
				<SelectContent side="top">
					<SelectItem v-for="size in pageSizeOptions" :key="size" :value="size">
						{{ size }}
					</SelectItem>
				</SelectContent>
			</Select>
		</div>
	</div>
</template>
