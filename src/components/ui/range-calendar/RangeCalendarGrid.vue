<script lang="ts" setup>
import type { HTMLAttributes } from 'vue'
function reactiveOmit<T extends object, K extends keyof T>(obj: T, key: K): Omit<T, K> {
	const { [key]: _, ...rest } = obj
	return rest as Omit<T, K>
}
import { RangeCalendarGrid, type RangeCalendarGridProps, useForwardProps } from 'reka-ui'
import { cn } from '@/lib/utils'

const props = defineProps<RangeCalendarGridProps & { class?: HTMLAttributes['class'] }>()

const delegatedProps = reactiveOmit(props, 'class')

const forwardedProps = useForwardProps(delegatedProps)
</script>

<template>
	<RangeCalendarGrid
		data-slot="range-calendar-grid"
		:class="cn('w-full border-collapse space-x-1', props.class)"
		v-bind="forwardedProps"
	>
		<slot></slot>
	</RangeCalendarGrid>
</template>
