<script setup lang="ts">
import type { PaginationFirstProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
function reactiveOmit<T extends object, K extends keyof T>(obj: T, key: K): Omit<T, K> {
	const { [key]: _, ...rest } = obj
	return rest as Omit<T, K>
}
import { ChevronLeftIcon } from 'lucide-vue-next'
import { PaginationFirst, useForwardProps } from 'reka-ui'
import { cn } from '@/lib/utils'
import { buttonVariants, type ButtonVariants } from '@/components/ui/button'

const props = withDefaults(
	defineProps<
		PaginationFirstProps & {
			size?: ButtonVariants['size']
			class?: HTMLAttributes['class']
		}
	>(),
	{
		size: 'default'
	}
)

const delegatedProps = reactiveOmit(props, 'class', 'size')
const forwarded = useForwardProps(delegatedProps)
</script>

<template>
	<PaginationFirst
		data-slot="pagination-first"
		:class="cn(buttonVariants({ variant: 'ghost', size }), 'gap-1 px-2.5 sm:pr-2.5', props.class)"
		v-bind="forwarded"
	>
		<slot>
			<ChevronLeftIcon />
			<span class="hidden sm:block">First</span>
		</slot>
	</PaginationFirst>
</template>
