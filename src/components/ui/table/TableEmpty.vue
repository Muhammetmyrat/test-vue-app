<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
function reactiveOmit<T extends object, K extends keyof T>(obj: T, key: K): Omit<T, K> {
	const { [key]: _, ...rest } = obj
	return rest as Omit<T, K>
}
import { cn } from '@/lib/utils'
import TableCell from './TableCell.vue'
import TableRow from './TableRow.vue'

const props = withDefaults(
	defineProps<{
		class?: HTMLAttributes['class']
		colspan?: number
	}>(),
	{
		colspan: 1
	}
)

const delegatedProps = reactiveOmit(props, 'class')
</script>

<template>
	<TableRow>
		<TableCell
			:class="cn('p-4 whitespace-nowrap align-middle text-sm text-foreground', props.class)"
			v-bind="delegatedProps"
		>
			<div class="flex items-center justify-center py-10">
				<slot></slot>
			</div>
		</TableCell>
	</TableRow>
</template>
