<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
function reactiveOmit<T extends object, K extends keyof T>(obj: T, key: K): Omit<T, K> {
	const { [key]: _, ...rest } = obj
	return rest as Omit<T, K>
}
import { SelectSeparator, type SelectSeparatorProps } from 'reka-ui'
import { cn } from '@/lib/utils'

const props = defineProps<SelectSeparatorProps & { class?: HTMLAttributes['class'] }>()

const delegatedProps = reactiveOmit(props, 'class')
</script>

<template>
	<SelectSeparator
		data-slot="select-separator"
		v-bind="delegatedProps"
		:class="cn('bg-border pointer-events-none -mx-1 my-1 h-px', props.class)"
	/>
</template>
