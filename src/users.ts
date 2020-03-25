import type { Gitlab } from 'gitlab';
import { groupBy } from './sort-utils';
import { GrowthOptions, validateGrowthOptions } from './shared/growth';
import { validateDateOptions } from './shared/date';

export class Users {
  constructor(private readonly gitlab: Gitlab) { }

  async growth({
    interval,
    from,
    to
  }: GrowthOptions) {
    validateGrowthOptions({ interval, from, to })
    const { fromDate, toDate } = validateDateOptions({ from, to });

    const items = (await this.gitlab.Users.all()) as any;
    return groupBy({
      items,
      interval,
      fromDate,
      toDate,
      fn: item => item.created_at
    })
  }
}