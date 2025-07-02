<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
function reactiveOmit<T extends object, K extends keyof T>(obj: T, key: K): Omit<T, K> {
	const { [key]: _, ...rest } = obj
	return rest as Omit<T, K>
}
import { PaginationList, type PaginationListProps } from 'reka-ui'
import { cn } from '@/lib/utils'

const props = defineProps<PaginationListProps & { class?: HTMLAttributes['class'] }>()

const delegatedProps = reactiveOmit(props, 'class')
</script>

<template>
	<PaginationList
		v-slot="slotProps"
		data-slot="pagination-content"
		v-bind="delegatedProps"
		:class="cn('flex flex-row items-center gap-1', props.class)"
	>
		<slot v-bind="slotProps"></slot>
	</PaginationList>
</template>
