import type { ActionTree } from 'vuex'
import { getCookie } from '~/utils/helpers'

export const actions: ActionTree<any, any> = {
  async nuxtServerInit ({ dispatch }, ctx: any) {
    const jwt = getCookie((ctx as any).$cookies, 'jwt')
    dispatch('user/setToken', jwt || null)
    if (jwt) {
      try {
        await dispatch('user/init')
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error(e)
        dispatch('user/setToken', null)
      }
    }
  }
}
