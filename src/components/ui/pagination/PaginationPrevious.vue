<script setup lang="ts">
import type { PaginationPrevProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
function reactiveOmit<T extends object, K extends keyof T>(obj: T, key: K): Omit<T, K> {
	const { [key]: _, ...rest } = obj
	return rest as Omit<T, K>
}
import { ChevronLeftIcon } from 'lucide-vue-next'
import { PaginationPrev, useForwardProps } from 'reka-ui'
import { cn } from '@/lib/utils'
import { buttonVariants, type ButtonVariants } from '@/components/ui/button'

const props = withDefaults(
	defineProps<
		PaginationPrevProps & {
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
	<PaginationPrev
		data-slot="pagination-previous"
		:class="cn(buttonVariants({ variant: 'ghost', size }), 'gap-1 px-2.5 sm:pr-2.5', props.class)"
		v-bind="forwarded"
	>
		<slot>
			<ChevronLeftIcon />
			<span class="hidden sm:block">Previous</span>
		</slot>
	</PaginationPrev>
</template>
