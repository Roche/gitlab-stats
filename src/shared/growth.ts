import { TimeInterval, TIME_INTERVAL } from "./time-interval";
import { FromDate, ToDate, FROM_DATE, TO_DATE } from "./date";

export interface GrowthOptions {
  interval: TimeInterval;
  from?: FromDate | Date;
  to?: ToDate | Date;
}


export function validateGrowthOptions({ from, to, interval }: GrowthOptions) {
  if (from && new Date(from).toString() === 'Invalid Date' && typeof from === 'string' && !FROM_DATE.includes(from))
    throw new Error(`Please use either ${FROM_DATE.join(',')} for "from"`);
  if (to && new Date(to).toString() === 'Invalid Date' && typeof to === 'string' && !TO_DATE.includes(to))
    throw new Error(`Please use either ${TO_DATE.join(',')} for "to"`);
  if (!TIME_INTERVAL.includes(interval))
    throw new Error(`Please use either ${TIME_INTERVAL.join(', ')} for "interval"`);
}
