<script lang="ts" setup>
import type { HTMLAttributes } from 'vue'
function reactiveOmit<T extends object, K extends keyof T>(obj: T, key: K): Omit<T, K> {
	const { [key]: _, ...rest } = obj
	return rest as Omit<T, K>
}
import {
	RangeCalendarCellTrigger,
	type RangeCalendarCellTriggerProps,
	useForwardProps
} from 'reka-ui'
import { cn } from '@/lib/utils'
import { buttonVariants } from '@/components/ui/button'

const props = withDefaults(
	defineProps<RangeCalendarCellTriggerProps & { class?: HTMLAttributes['class'] }>(),
	{
		as: 'button'
	}
)

const delegatedProps = reactiveOmit(props, 'class')

const forwardedProps = useForwardProps(delegatedProps)
</script>

<template>
	<RangeCalendarCellTrigger
		data-slot="range-calendar-trigger"
		:class="
			cn(
				buttonVariants({ variant: 'ghost' }),
				'h-8 w-8 p-0 font-normal data-[selected]:opacity-100',
				'[&[data-today]:not([data-selected])]:bg-accent [&[data-today]:not([data-selected])]:text-accent-foreground',
				// Selection Start
				'data-[selection-start]:bg-primary data-[selection-start]:text-primary-foreground data-[selection-start]:hover:bg-primary data-[selection-start]:hover:text-primary-foreground data-[selection-start]:focus:bg-primary data-[selection-start]:focus:text-primary-foreground',
				// Selection End
				'data-[selection-end]:bg-primary data-[selection-end]:text-primary-foreground data-[selection-end]:hover:bg-primary data-[selection-end]:hover:text-primary-foreground data-[selection-end]:focus:bg-primary data-[selection-end]:focus:text-primary-foreground',
				// Outside months
				'data-[outside-view]:text-muted-foreground',
				// Disabled
				'data-[disabled]:text-muted-foreground data-[disabled]:opacity-50',
				// Unavailable
				'data-[unavailable]:text-destructive-foreground data-[unavailable]:line-through',
				props.class
			)
		"
		v-bind="forwardedProps"
	>
		<slot></slot>
	</RangeCalendarCellTrigger>
</template>
