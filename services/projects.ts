import { ApiRoutes } from './services.interface'
import type { ApiMethods } from '~/plugins/axios'
import type { Project } from '~/types'

export type CreateProjectPayload = {
  name: string;
}

export type UpdateProjectPayload = {
  data: {
    name: string;
  },
  id: string;
}

const projectsService = (api: ApiMethods, path: `${ApiRoutes.projects}`) => ({
  getProjects () {
    return api.get<{ projects: Project[] }>(`${path}`)
  },
  getProjectInfo (id: string) {
    return api.get<{ project: Project }>(`${path}/${id}`)
  },
  createProject (payload: CreateProjectPayload) {
    return api.post<{ project: Project }>(`${path}`, payload)
  },
  updateProject (payload: UpdateProjectPayload) {
    return api.put<{ project: Project }>(`${path}/${payload.id}`, payload.data)
  },
  deleteProject (id: string) {
    return api.delete<void>(`${path}/remove?id=${id}`)
  },
  deleteProjectLogo (id: Project['id']) {
    return api.delete<void>(`${path}/remove-logo?id=${id}`)
  }
})

export type ProjectsService = ReturnType<typeof projectsService>

export default projectsService
