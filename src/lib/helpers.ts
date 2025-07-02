import { CalendarDate } from '@internationalized/date'

export const today = new CalendarDate(
	new Date().getFullYear(),
	new Date().getMonth() + 1,
	new Date().getDate()
)
