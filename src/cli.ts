import { GitlabStats } from './gitlab-stats';
import { Gitlab } from 'gitlab';
import { program } from 'commander';
import { readFileSync } from 'fs';
import { join } from 'path';
import { Parser } from 'json2csv';
import { GrowthOptions } from './shared/growth';

async function bootstrap() {
  const gitlab = new Gitlab({
    token: process.env.GITLAB_TOKEN,
    host: process.env.GITLAB_HOST || 'https://gitlab.com'
  })
  const gitlabStats = new GitlabStats({
    gitlab
  });

  const packageJSON = JSON.parse(readFileSync(join(__dirname, '../package.json'), 'utf8'));

  program
    .version(packageJSON.version)

  const users = program.command('users');

  users
    .command('growth')
    .option('-i, --interval [string]', 'the interval of the result', 'month')
    .option('-f, --from [string]', 'the start date')
    .option('-t, --to [string]', 'the end date')
    .option('-o, --output [string]', 'the output', 'json')
    .action(async (options: (GrowthOptions & { output: 'json' | 'csv' })) => {
      const result = await gitlabStats.Users.growth(options);
      if (options.output === 'json') {
        return console.log(JSON.stringify(result));
      }
      if (options.output === 'csv') {
        const parser = new Parser();
        return console.log(parser.parse(result.items));
      }
    });

  const projects = program.command('projects');
  projects
    .command('growth')
    .option('-i, --interval [string]', 'the interval of the result', 'month')
    .option('-f, --from [string]', 'the start date')
    .option('-t, --to [string]', 'the end date')
    .option('-o, --output [string]', 'the output', 'json')
    .action(async (options: (GrowthOptions & { output: 'json' | 'csv' })) => {
      const result = await gitlabStats.Projects.growth(options);
      if (options.output === 'json') {
        return console.log(JSON.stringify(result));
      }
      if (options.output === 'csv') {
        const parser = new Parser();
        return console.log(parser.parse(result.items));
      }
    });

  const pipelines = program.command('pipelines');
  pipelines
    .command('growth')
    .option('-i, --interval [string]', 'the interval of the result', 'month')
    .option('-f, --from [string]', 'the start date')
    .option('-t, --to [string]', 'the end date')
    .option('-o, --output [string]', 'the output', 'json')
    .action(async (options: (GrowthOptions & { output: 'json' | 'csv' })) => {
      const result = await gitlabStats.Pipelines.growth(options);
      if (options.output === 'json') {
        return console.log(JSON.stringify(result));
      }
      if (options.output === 'csv') {
        const parser = new Parser();
        return console.log(parser.parse(result.items));
      }
    });

  program.parse(process.argv);
}

bootstrap().catch(console.error);
