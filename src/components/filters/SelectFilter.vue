<script setup lang="ts">
import {
	Select,
	SelectTrigger,
	SelectContent,
	SelectItem,
	SelectValue,
	SelectGroup
} from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { ref, computed } from 'vue'

const props = defineProps<{
	options: string[]
	placeholder?: string
	label?: string
}>()

const model = defineModel<string | undefined>()

const search = ref('')

const filteredOptions = computed(() =>
	props.options.filter(option => option.toLowerCase().includes(search.value.toLowerCase()))
)
</script>

<template>
	<div class="flex flex-col">
		<span class="px-2 py-1.5 text-sm font-medium">{{ label || 'Опции' }}</span>
		<Select v-model="model" class="flex flex-col">
			<SelectTrigger class="w-[200px]">
				<SelectValue :placeholder="placeholder || 'Выберите значение'" />
			</SelectTrigger>
			<SelectContent>
				<div class="p-2">
					<Input v-model="search" placeholder="Поиск..." class="mb-2" />
					<SelectGroup>
						<SelectItem value="all">Все</SelectItem>
						<SelectItem v-for="option in filteredOptions" :key="option" :value="option">
							{{ option }}
						</SelectItem>
					</SelectGroup>
				</div>
			</SelectContent>
		</Select>
	</div>
</template>
