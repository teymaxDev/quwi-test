import type { ProjectsService } from './projects'
import type { UserService } from './user'

export type Services = {
  projects: ProjectsService;
  user: UserService;
}

export enum ApiRoutes {
  user = '/auth',
  projects = '/projects-manage'
}
