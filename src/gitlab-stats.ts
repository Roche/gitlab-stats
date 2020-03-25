import { Users } from './users';
import { Projects } from './projects';
import { Pipelines } from './pipelines';

export class GitlabStats {
  constructor({ gitlab }) {
    this.Users = new Users(gitlab);
    this.Projects = new Projects(gitlab);
    this.Pipelines = new Pipelines(gitlab);
  }

  public Users: Users;
  public Projects: Projects;
  public Pipelines: Pipelines;
}