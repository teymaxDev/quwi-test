import { ActionTree, MutationTree, GetterTree } from 'vuex'
import { UserPayloadLookup } from '~/services/user'
import { AuthItems, StoreContext, User } from '~/types'
import { removeCookie, setCookie } from '~/utils/helpers'

type UserState = {
  user: User | null;
  auth: AuthItems | null;
  token: string | null;
}

type Ctx = StoreContext<UserState>

export const state = (): UserState => ({
  user: null,
  auth: null,
  token: null
})

export type State = ReturnType<typeof state>

export const mutations: MutationTree<State> = {
  INIT: (state, { user, auth }) => {
    state.user = user
    state.auth = auth
  },
  SET_TOKEN: (state, token: string) => {
    state.token = token
  },
  LOGIN: (state, { user, auth }) => {
    state.user = user
    state.auth = auth
  },
  LOGOUT: (state) => {
    state.user = null
    state.auth = null
    state.token = null
  }
}

export const getters: GetterTree<State, State> = {
  authenticated: state => !!state.token
}

export const actions: ActionTree<State, State> = {
  async init ({ commit }) {
    const { data: { user, auth_items: auth } } = await (this as Ctx).$api.user.init()
    commit('INIT', {
      user,
      auth
    })
  },
  async login ({ commit, dispatch }, payload: UserPayloadLookup['login']) {
    const { data: { app_init: app, token } } = await (this as Ctx).$api.user.login(payload)

    dispatch('setToken', token)
    commit('LOGIN', {
      user: app.user,
      auth: app.auth_items
    })
  },
  logout ({ commit, dispatch }) {
    commit('LOGOUT')
    dispatch('setToken', null)
    ;(this as Ctx).$api.user.logout()
  },
  setToken ({ commit }, token) {
    if (token) {
      setCookie((this as any).$cookies, 'jwt', token)
    } else {
      removeCookie((this as any).$cookies, 'jwt')
    }
    commit('SET_TOKEN', token)
  }
}
