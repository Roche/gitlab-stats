import type { Gitlab } from 'gitlab';
import { groupBy } from './sort-utils';
import { GrowthOptions, validateGrowthOptions } from './shared/growth';
import { validateDateOptions } from './shared/date';

export class Pipelines {
  constructor(private readonly gitlab: Gitlab) { }

  async growth({
    interval,
    from,
    to
  }: GrowthOptions) {
    validateGrowthOptions({ interval, from, to })
    const { fromDate, toDate } = validateDateOptions({ from, to });

    const projects = (await this.gitlab.Projects.all()) as any;
    const items: any[] = [];

    for (let project of projects) {
      try {
        const pipelines = (await this.gitlab.Pipelines.all(project.id)) as any;
        items.push(...pipelines);
      } catch (error) {

      }
    }
    return groupBy({
      items,
      interval,
      fromDate,
      toDate,
      fn: item => item.created_at
    })
  }
}