import { FROM_DATE_MAP, TO_DATE_MAP } from "../date-utils";

export const FROM_DATE = ['last_year', 'last_month', 'last_week', 'yesterday'] as const;
export type FromDate = typeof FROM_DATE[number];

export const TO_DATE = ['today'] as const;
export type ToDate = typeof TO_DATE[number];

export function validateDateOptions(
  { from, to }: { from: FromDate | Date, to: ToDate | Date }
) {
  let fromDate: Date | undefined;
  let toDate: Date | undefined;

  if (typeof from === 'string' && FROM_DATE.includes(from)) {
    fromDate = FROM_DATE_MAP[from];
  } else if (typeof from === 'string') {
    fromDate = new Date(from)
  } else if (from instanceof Date) {
    fromDate = from;
  }
  if (typeof to === 'string' && TO_DATE.includes(to)) {
    toDate = TO_DATE_MAP[to];
  } else if (typeof to === 'string') {
    toDate = new Date(to);
  } else if (to instanceof Date) {
    toDate = to;
  }

  return { fromDate, toDate };
}