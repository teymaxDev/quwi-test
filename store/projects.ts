import { ActionTree, MutationTree } from 'vuex'
import { UpdateProjectPayload, CreateProjectPayload } from './../services/projects'

import { StoreContext } from '~/types'

type Project = Record<string, any>

type State = {
  projects: Project[]
}

type Ctx = StoreContext<State>

export const state = (): State => ({
  projects: []
})
export type ProjectsState = ReturnType<typeof state>

export const mutations: MutationTree<State> = {
  SET_PROJECTS: (state, projects) => {
    state.projects = projects
  },
  ADD_PROJECT: (state, project) => {
    state.projects = [...state.projects, project]
  },
  UPDATE_PROJECT: (state, project) => {
    state.projects = state.projects.map(
      p => p.id === project.id ? project : p
    )
  },
  REMOVE_PROJECT: (state, id) => {
    state.projects = state.projects.filter(p => p.id !== id)
  }
}
export const actions: ActionTree<State, State> = {
  async getProjects ({ commit }) {
    const { data } = await (this as Ctx).$api.projects.getProjects()
    commit('SET_PROJECTS', data.projects)
  },
  async getProjectInfo (_, id: string) {
    return await (this as Ctx).$api.projects.getProjectInfo(id)
  },
  async createProject ({ commit }, payload: CreateProjectPayload) {
    const { data } = await (this as Ctx).$api.projects.createProject(payload)
    commit('ADD_PROJECT', data.project)
  },
  async updateProject ({ commit }, payload: UpdateProjectPayload) {
    const { data } = await (this as Ctx).$api.projects.updateProject(payload)
    commit('UPDATE_PROJECT', data.project)
  },
  async deleteProject ({ commit }, projectId: string) {
    await (this as Ctx).$api.projects.deleteProject(projectId)
    commit('REMOVE_PROJECT', projectId)
  }
}
