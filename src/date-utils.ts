import { TimeInterval } from "./shared/time-interval";
import {
  differenceInDays,
  differenceInWeeks,
  differenceInMonths,
  differenceInYears,
  addYears,
  addMonths,
  addWeeks,
  addDays,
  isSameYear,
  isSameMonth,
  isSameWeek,
  isSameDay,
  startOfDay,
  startOfYear,
  startOfMonth,
  startOfWeek,
  endOfYear,
  endOfMonth,
  endOfWeek,
  endOfDay,
  startOfYesterday,
  subYears,
  subMonths,
  subWeeks,
  format,
} from 'date-fns';
import { FromDate, ToDate } from "./shared/date";

export const TIME_INTERVAL_BETWEEN_MAP: { [key in TimeInterval]: (startDate: Date, endDate: Date) => number } = {
  year: differenceInYears,
  month: differenceInMonths,
  week: differenceInWeeks,
  day: differenceInDays,
}

export const TIME_INTERAL_ADD_MAP: { [key in TimeInterval]: (date: Date, amount: number) => Date } = {
  year: addYears,
  month: addMonths,
  week: addWeeks,
  day: addDays,
}

export const TIME_INTERAL_IS_MAP: { [key in TimeInterval]: (a: Date, b: Date) => boolean } = {
  year: isSameYear,
  month: isSameMonth,
  week: isSameWeek,
  day: isSameDay,
}

export const TIME_INTERVAL_START_OF_MAP: { [key in TimeInterval]: (a: Date) => Date } = {
  year: startOfYear,
  month: startOfMonth,
  week: startOfWeek,
  day: startOfDay,
}


export const TIME_INTERVAL_END_OF_MAP: { [key in TimeInterval]: (a: Date) => Date } = {
  year: endOfYear,
  month: endOfMonth,
  week: endOfWeek,
  day: endOfDay,
}

export const TIME_INTERVAL_FORMAT_MAP: { [key in TimeInterval]: (a: Date) => string } = {
  year: (date) => format(date, 'yyyy'),
  month: (date) => format(date, 'MMM yy'),
  week: (date) => format(date, 'ww yy'),
  day: (date) => format(date, 'MM/dd/yy'),
}

export const FROM_DATE_MAP: { [key in (FromDate)]: Date } = {
  last_year: subYears(new Date(), 1),
  last_month: subMonths(new Date(), 1),
  last_week: subWeeks(new Date(), 1),
  yesterday: startOfYesterday()
}

export const TO_DATE_MAP: { [key in (ToDate)]: Date } = {
  today: endOfDay(new Date()),
}