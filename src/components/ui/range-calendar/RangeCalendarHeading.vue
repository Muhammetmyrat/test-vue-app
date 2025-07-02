<script lang="ts" setup>
import type { HTMLAttributes } from 'vue'
function reactiveOmit<T extends object, K extends keyof T>(obj: T, key: K): Omit<T, K> {
	const { [key]: _, ...rest } = obj
	return rest as Omit<T, K>
}
import { RangeCalendarHeading, type RangeCalendarHeadingProps, useForwardProps } from 'reka-ui'
import { cn } from '@/lib/utils'

const props = defineProps<RangeCalendarHeadingProps & { class?: HTMLAttributes['class'] }>()

defineSlots<{
	default: (props: { headingValue: string }) => any
}>()

const delegatedProps = reactiveOmit(props, 'class')

const forwardedProps = useForwardProps(delegatedProps)
</script>

<template>
	<RangeCalendarHeading
		v-slot="{ headingValue }"
		data-slot="range-calendar-heading"
		:class="cn('text-sm font-medium', props.class)"
		v-bind="forwardedProps"
	>
		<slot :heading-value>
			{{ headingValue }}
		</slot>
	</RangeCalendarHeading>
</template>
