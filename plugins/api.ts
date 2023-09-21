import type { Context } from '@nuxt/types'
import type { ApiMethods } from './axios'
import { ApiRoutes, Services } from '~/services/services.interface'
import User from '~/services/user'
import Projects from '~/services/projects'

type Inject = (key: string, value: any) => void
type ApiPlugin = (ctx: Context & { $api: ApiMethods }, inject: Inject) => Promise<void> | void

declare module 'vue/types/vue' {
  interface Vue {
    $api: Services
  }
}

declare module '@nuxt/types' {
  interface Context {
    $api: Services
  }
}

const apiPlugin: ApiPlugin = (ctx, inject) => {
  inject('api', {
    user: User(ctx.$http, ApiRoutes.user),
    projects: Projects(ctx.$http, ApiRoutes.projects)
  })
}

export default apiPlugin
