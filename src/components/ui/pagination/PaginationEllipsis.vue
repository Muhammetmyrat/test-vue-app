<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
function reactiveOmit<T extends object, K extends keyof T>(obj: T, key: K): Omit<T, K> {
	const { [key]: _, ...rest } = obj
	return rest as Omit<T, K>
}
import { MoreHorizontal } from 'lucide-vue-next'
import { PaginationEllipsis, type PaginationEllipsisProps } from 'reka-ui'
import { cn } from '@/lib/utils'

const props = defineProps<PaginationEllipsisProps & { class?: HTMLAttributes['class'] }>()

const delegatedProps = reactiveOmit(props, 'class')
</script>

<template>
	<PaginationEllipsis
		data-slot="pagination-ellipsis"
		v-bind="delegatedProps"
		:class="cn('flex size-9 items-center justify-center', props.class)"
	>
		<slot>
			<MoreHorizontal class="size-4" />
			<span class="sr-only">More pages</span>
		</slot>
	</PaginationEllipsis>
</template>
