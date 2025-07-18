<script setup lang="ts">
import { type DateValue, isEqualMonth } from '@internationalized/date'
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight } from 'lucide-vue-next'
import { type DateRange, RangeCalendarRoot, useDateFormatter } from 'reka-ui'

import { createMonth, type Grid, toDate } from 'reka-ui/date'
import { type Ref, ref, watch } from 'vue'
import { cn } from '@/lib/utils'
import { Button, buttonVariants } from '@/components/ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import {
	RangeCalendarCell,
	RangeCalendarCellTrigger,
	RangeCalendarGrid,
	RangeCalendarGridBody,
	RangeCalendarGridHead,
	RangeCalendarGridRow,
	RangeCalendarHeadCell
} from '@/components/ui/range-calendar'
import { today } from '@/lib/helpers'

defineProps<{
	range?: { dateFrom: string; dateTo: string }
}>()

const emit = defineEmits<{
	(e: 'selected', payload: { dateFrom: string; dateTo: string }): void
}>()

const locale = ref('ru')
const formatter = useDateFormatter(locale.value)

const value = ref({
	start: today,
	end: today
}) as Ref<DateRange | null>

const placeholder = ref(today) as Ref<DateValue>
const secondMonthPlaceholder = ref(today.add({ months: 1 })) as Ref<DateValue>

const firstMonth = ref(
	createMonth({
		dateObj: placeholder.value,
		locale: locale.value,
		fixedWeeks: true,
		weekStartsOn: 1
	})
) as Ref<Grid<DateValue>>

const secondMonth = ref(
	createMonth({
		dateObj: secondMonthPlaceholder.value,
		locale: locale.value,
		fixedWeeks: true,
		weekStartsOn: 1
	})
) as Ref<Grid<DateValue>>

function updateMonth(reference: 'first' | 'second', months: number) {
	if (reference === 'first') {
		placeholder.value = placeholder.value.add({ months })
	} else {
		secondMonthPlaceholder.value = secondMonthPlaceholder.value.add({
			months
		})
	}
}

watch(placeholder, _placeholder => {
	firstMonth.value = createMonth({
		dateObj: _placeholder,
		weekStartsOn: 1,
		fixedWeeks: false,
		locale: locale.value
	})
	if (isEqualMonth(secondMonthPlaceholder.value, _placeholder)) {
		secondMonthPlaceholder.value = secondMonthPlaceholder.value.add({
			months: 1
		})
	}
})

watch(secondMonthPlaceholder, _secondMonthPlaceholder => {
	secondMonth.value = createMonth({
		dateObj: _secondMonthPlaceholder,
		weekStartsOn: 1,
		fixedWeeks: false,
		locale: locale.value
	})
	if (isEqualMonth(_secondMonthPlaceholder, placeholder.value))
		placeholder.value = placeholder.value.subtract({ months: 1 })
})

function onDateRangeSelected(range: DateRange | null) {
	if (range?.start && range?.end) {
		emit('selected', {
			dateFrom: range.start.toString(),
			dateTo: range.end.toString()
		})
	}
}

function capitalize(str: string) {
	return str.charAt(0).toUpperCase() + str.slice(1)
}
</script>

<template>
	<Popover>
		<PopoverTrigger as-child>
			<Button
				variant="outline"
				:class="cn('w-[280px] justify-start text-left font-normal', !value && 'text-muted-foreground')"
			>
				<CalendarIcon class="mr-2 h-4 w-4" />
				<template v-if="value?.start">
					<template v-if="value?.end">
						{{ formatter.custom(toDate(value.start), { dateStyle: 'medium' }) }} –
						{{ formatter.custom(toDate(value.end), { dateStyle: 'medium' }) }}
					</template>
					<template v-else>
						{{ formatter.custom(toDate(value.start), { dateStyle: 'medium' }) }}
					</template>
				</template>
				<template v-else>Выберите дату</template>
			</Button>
		</PopoverTrigger>
		<PopoverContent class="w-auto p-0">
			<RangeCalendarRoot
				v-slot="{ weekDays }"
				v-model="value"
				v-model:placeholder="placeholder"
				class="p-3"
				@update:modelValue="onDateRangeSelected"
			>
				<div class="flex flex-col gap-y-4 mt-4 sm:flex-row sm:gap-x-4 sm:gap-y-0">
					<!-- First Month -->
					<div class="flex flex-col gap-4">
						<div class="flex items-center justify-between">
							<button
								:class="
									cn(
										buttonVariants({ variant: 'outline' }),
										'h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100'
									)
								"
								@click="updateMonth('first', -1)"
							>
								<ChevronLeft class="h-4 w-4" />
							</button>
							<div class="text-sm font-medium">
								{{ capitalize(formatter.fullMonthAndYear(toDate(firstMonth.value))) }}
							</div>
							<button
								:class="
									cn(
										buttonVariants({ variant: 'outline' }),
										'h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100'
									)
								"
								@click="updateMonth('first', 1)"
							>
								<ChevronRight class="h-4 w-4" />
							</button>
						</div>
						<RangeCalendarGrid>
							<RangeCalendarGridHead>
								<RangeCalendarGridRow>
									<RangeCalendarHeadCell v-for="day in weekDays" :key="day" class="w-full">
										{{ day }}
									</RangeCalendarHeadCell>
								</RangeCalendarGridRow>
							</RangeCalendarGridHead>
							<RangeCalendarGridBody>
								<RangeCalendarGridRow
									v-for="(weekDates, index) in firstMonth.rows"
									:key="`weekDate-${index}`"
									class="mt-2 w-full"
								>
									<RangeCalendarCell
										v-for="weekDate in weekDates"
										:key="weekDate.toString()"
										:date="weekDate"
									>
										<RangeCalendarCellTrigger :day="weekDate" :month="firstMonth.value" />
									</RangeCalendarCell>
								</RangeCalendarGridRow>
							</RangeCalendarGridBody>
						</RangeCalendarGrid>
					</div>

					<!-- Second Month -->
					<div class="flex flex-col gap-4">
						<div class="flex items-center justify-between">
							<button
								:class="
									cn(
										buttonVariants({ variant: 'outline' }),
										'h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100'
									)
								"
								@click="updateMonth('second', -1)"
							>
								<ChevronLeft class="h-4 w-4" />
							</button>
							<div class="text-sm font-medium">
								{{ capitalize(formatter.fullMonthAndYear(toDate(secondMonth.value))) }}
							</div>
							<button
								:class="
									cn(
										buttonVariants({ variant: 'outline' }),
										'h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100'
									)
								"
								@click="updateMonth('second', 1)"
							>
								<ChevronRight class="h-4 w-4" />
							</button>
						</div>
						<RangeCalendarGrid>
							<RangeCalendarGridHead>
								<RangeCalendarGridRow>
									<RangeCalendarHeadCell v-for="day in weekDays" :key="day" class="w-full">
										{{ day }}
									</RangeCalendarHeadCell>
								</RangeCalendarGridRow>
							</RangeCalendarGridHead>
							<RangeCalendarGridBody>
								<RangeCalendarGridRow
									v-for="(weekDates, index) in secondMonth.rows"
									:key="`weekDate-${index}`"
									class="mt-2 w-full"
								>
									<RangeCalendarCell
										v-for="weekDate in weekDates"
										:key="weekDate.toString()"
										:date="weekDate"
									>
										<RangeCalendarCellTrigger :day="weekDate" :month="secondMonth.value" />
									</RangeCalendarCell>
								</RangeCalendarGridRow>
							</RangeCalendarGridBody>
						</RangeCalendarGrid>
					</div>
				</div>
			</RangeCalendarRoot>
		</PopoverContent>
	</Popover>
</template>
