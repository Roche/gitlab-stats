export const TIME_INTERVAL = ['year', 'month', 'week', 'day'] as const;
export type TimeInterval = typeof TIME_INTERVAL[number];
