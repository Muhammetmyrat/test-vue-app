<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
function reactiveOmit<T extends object, K extends keyof T>(obj: T, key: K): Omit<T, K> {
	const { [key]: _, ...rest } = obj
	return rest as Omit<T, K>
}
import {
	PaginationRoot,
	type PaginationRootEmits,
	type PaginationRootProps,
	useForwardPropsEmits
} from 'reka-ui'
import { cn } from '@/lib/utils'

const props = defineProps<
	PaginationRootProps & {
		class?: HTMLAttributes['class']
	}
>()
const emits = defineEmits<PaginationRootEmits>()

const delegatedProps = reactiveOmit(props, 'class')
const forwarded = useForwardPropsEmits(delegatedProps, emits)
</script>

<template>
	<PaginationRoot
		v-slot="slotProps"
		data-slot="pagination"
		v-bind="forwarded"
		:class="cn('mx-auto flex w-full justify-center', props.class)"
	>
		<slot v-bind="slotProps"></slot>
	</PaginationRoot>
</template>
