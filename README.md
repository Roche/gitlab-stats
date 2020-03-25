# Gitlab Stats

Gitlab Stats provides more [GitLab](https://gitlab.com/gitlab-org/gitlab/) statistics from the [GitLab API](https://gitlab.com/gitlab-org/gitlab/tree/master/doc/api) services. Gitlab Stats API is making use of the [gitlab](https://github.com/jdalrymple/gitbeaker#readme) NPM package is heavily inspired by its API.

## Install

```bash

# Install as CLI tool
npm i -g gitlab-stats

# Install as node dependency
npm i gitlab-stats

```

## CLI Support

All the CLI commands have the following structure.

```bash

gitlab-stats [service name] [method name] --arg1 --arg2 --arg3

```

Where `service name` is any of the [supported API](#docs) names, `method name` is any of the supported commands on that API service. `--arg1` are any of the arguments you can supply to the function.

```bash

gitlab-stats users growth --interval month --output csv > user-growth.csv

```

In order to use the CLI tool, you will need to have the following environment variables

```bash

GITLAB_TOKEN=<YOUR_TOKEN>

# Optional
GITLAB_HOST=<YOUR_HOSt> # e.g. https://gitlab.website.com

```

This could be set globally or using a .env file in the project folder.

## Node.js / Web support

The functionalities of the CLI can be imported into your Node.js or web project.

```typescript
import { Gitlab } from "gitlab";
import { GitlabStats } from "gitlab-stats";

const gitlab = new Gitlab({
  host: "http://example.com",
  token: "personaltoken"
});

const gitlabStats = new GitlabStats({
  gitlab
});

gitlabStats.Users.growth({ interval: "month" })
  .then(console.log)
  .catch(console.error);
```

## Docs

The APIs which are currently supported are:

- Pipelines
- Users
- Projects
