import { TimeInterval } from "./shared/time-interval";
import {
  TIME_INTERVAL_BETWEEN_MAP,
  TIME_INTERAL_ADD_MAP,
  TIME_INTERAL_IS_MAP,
  TIME_INTERVAL_END_OF_MAP,
  TIME_INTERVAL_START_OF_MAP,
  TIME_INTERVAL_FORMAT_MAP
} from "./date-utils";

interface GroupByOptions<T = any> {
  items: T[];
  interval: TimeInterval;
  fromDate?: Date,
  toDate?: Date,
  fn: (item: T) => Promise<string> | string;
}

function getAmountOfInterval(
  { date, dates, interval }:
    { date: Date, dates: Date[], interval: TimeInterval }
): number {
  const isFn = TIME_INTERAL_IS_MAP[interval];
  return dates.filter(bDate => isFn(date, bDate)).length;
}

export interface GroupByResult {
  total: number;
  items: GroupByInterval[];
}

export interface GroupByInterval {
  amount: number;
  totalAmount: number;
  from: Date;
  fromFormatted: string
  to: Date;
  toFormatted: string;
}

export async function groupBy<T = any>({
  items, interval, fn, fromDate, toDate
}: GroupByOptions<T>): Promise<GroupByResult> {
  const dates: Date[] = [];

  const betweenFn = TIME_INTERVAL_BETWEEN_MAP[interval];
  const addFn = TIME_INTERAL_ADD_MAP[interval];
  const startOfFn = TIME_INTERVAL_START_OF_MAP[interval];
  const endOfFn = TIME_INTERVAL_END_OF_MAP[interval];
  const formatFn = TIME_INTERVAL_FORMAT_MAP[interval];

  for (let item of items) {
    const dateString = await fn(item);
    const date = new Date(dateString);
    dates.push(date);
  }

  const sortedDates = dates.sort((a, b) => a > b ? -1 : a < b ? 1 : 0);

  let firstDate: Date = fromDate;
  let lastDate: Date = toDate;
  if (!fromDate) {
    firstDate = startOfFn(dates[sortedDates.length - 1]);
  }
  if (!toDate) {
    lastDate = endOfFn(dates[0]);
  }

  const between = betweenFn(lastDate, firstDate);
  let results: GroupByInterval[] = [];

  let totalAmount = 0;

  for (let index = between; index >= 0; index--) {
    const currentDate = addFn(firstDate, index);
    const startOfCurrentDate = startOfFn(currentDate);
    const endOfCurrentDate = endOfFn(currentDate);
    const fromFormatted = formatFn(startOfCurrentDate);
    const toFormatted = formatFn(endOfCurrentDate);
    const amount = getAmountOfInterval({ date: currentDate, dates: sortedDates, interval })
    totalAmount += amount;
    results.push({
      from: startOfCurrentDate,
      fromFormatted,
      to: endOfCurrentDate,
      toFormatted,
      amount,
      totalAmount,
    });
  }

  const total = results.map(i => i.amount).reduce((a, b) => a + b, 0);
  results = results.map((result => ({ ...result, totalAmount: total - result.totalAmount + result.amount })));
  return { total, items: results };

}