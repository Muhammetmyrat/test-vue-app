<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
function reactiveOmit<T extends object, K extends keyof T>(obj: T, key: K): Omit<T, K> {
	const { [key]: _, ...rest } = obj
	return rest as Omit<T, K>
}
import { ChevronUp } from 'lucide-vue-next'
import { SelectScrollUpButton, type SelectScrollUpButtonProps, useForwardProps } from 'reka-ui'
import { cn } from '@/lib/utils'

const props = defineProps<SelectScrollUpButtonProps & { class?: HTMLAttributes['class'] }>()

const delegatedProps = reactiveOmit(props, 'class')

const forwardedProps = useForwardProps(delegatedProps)
</script>

<template>
	<SelectScrollUpButton
		data-slot="select-scroll-up-button"
		v-bind="forwardedProps"
		:class="cn('flex cursor-default items-center justify-center py-1', props.class)"
	>
		<slot>
			<ChevronUp class="size-4" />
		</slot>
	</SelectScrollUpButton>
</template>
