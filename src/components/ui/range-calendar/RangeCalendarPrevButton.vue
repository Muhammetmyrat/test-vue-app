<script lang="ts" setup>
import type { HTMLAttributes } from 'vue'
function reactiveOmit<T extends object, K extends keyof T>(obj: T, key: K): Omit<T, K> {
	const { [key]: _, ...rest } = obj
	return rest as Omit<T, K>
}
import { ChevronLeft } from 'lucide-vue-next'
import { RangeCalendarPrev, type RangeCalendarPrevProps, useForwardProps } from 'reka-ui'
import { cn } from '@/lib/utils'
import { buttonVariants } from '@/components/ui/button'

const props = defineProps<RangeCalendarPrevProps & { class?: HTMLAttributes['class'] }>()

const delegatedProps = reactiveOmit(props, 'class')

const forwardedProps = useForwardProps(delegatedProps)
</script>

<template>
	<RangeCalendarPrev
		data-slot="range-calendar-prev-button"
		:class="
			cn(
				buttonVariants({ variant: 'outline' }),
				'absolute left-1',
				'size-7 bg-transparent p-0 opacity-50 hover:opacity-100',
				props.class
			)
		"
		v-bind="forwardedProps"
	>
		<slot>
			<ChevronLeft class="size-4" />
		</slot>
	</RangeCalendarPrev>
</template>
