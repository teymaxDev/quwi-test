import { ApiRoutes } from './services.interface'
import type { ApiMethods } from '~/plugins/axios'
import {
  AppInit,
  AuthItems,
  Company,
  Project,
  User,
  UserSettings,
  UserSettingsGlobal
} from '~/types'

export type UserPayloadLookup = {
  login: {
    email: string;
    password: string;
  }
}

type InitResponse = {
  user: User;
  user_settings_global: UserSettingsGlobal;
  user_settings: UserSettings;
  companies: Company[];
  auth_items: AuthItems;
  chats_count_unread: number;
  hidden_projects: Project[];
  ip: string;
}

type LoginResponse = {
  token: null | string;
  app_init: AppInit;
  already_join_project: null | boolean | unknown;
}

const userService = (api: ApiMethods, path: `${ApiRoutes.user}`) => ({
  init () {
    return api.get<InitResponse>(`${path}/init`)
  },
  login (payload: UserPayloadLookup['login']) {
    return api.post<LoginResponse>(`${path}/login`, payload)
  },
  logout () {
    return api.post<void>(`${path}/logout`, {
      anywhere: true
    })
  }
})

export type UserService = ReturnType<typeof userService>

export default userService
