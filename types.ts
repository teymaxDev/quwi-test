import { Context } from '@nuxt/types'
import type { Store } from 'vuex'
import type { Services } from '~/services/services.interface'
import type { ApiMethods } from '~/plugins/axios'

interface ExtendedContext extends Context {
  $api: Services;
  $http: ApiMethods;
}

export type StoreContext<S> = Store<S> & ExtendedContext

export type User = {
  id: number;
  name: string;
  nick: string;
  avatar_url: null;
  dta_create: Date;
  timezone_offset: number;
  is_online: number;
  is_chat_email_notification: boolean;
  dta_activity: Date;
  is_active: boolean;
  id_company: number;
  role: string;
  due_penalties: number;
  is_timer_online: number;
  dta_timer_activity: null;
  timer_last: null;
  is_shared_from_me: boolean;
  projects: any[];
  email: string;
  is_telegram_connected: boolean;
  telegram_connect_url: string;
}

export type AuthItems = {
  owner: boolean,
  coder: boolean,
  can_edit_time: boolean,
  disc_space: boolean,
  tracked_timer_month: boolean,
  screens_month: boolean,
  chat: boolean,
  instant_screen: boolean,
  timelapse_video: boolean,
  member_area: boolean,
  trial: boolean,
  is_free: boolean
}

export type ClientSettings = {
  cache_updated: boolean;
  chat_active: boolean;
  comment_video_autoplay: boolean;
  bell_autoopen: boolean;
  redirect_to_ticket: boolean;
  issues_filters: any[];
  events_panel_active: boolean;
  hash: string;
}

export type UserSettings = {
  lang: string;
  mute_until_period: number;
  is_mute_chats: boolean;
  dta_mute_until: null;
  client_settings: ClientSettings;
  cache_updated: boolean;
}

export type UserSettingsGlobal = {
  client_settings: null;
  is_chat_email_notification: boolean;
}

export type Company = {
  id: number;
  uid: string;
  name: string;
  logo_url: string;
  owner_fullname: string;
  dta_create: Date;
  id_user: number;
  timezone: string;
  timezone_offset: number;
  screens_interval: number;
  screens_quality: number;
  updated: number;
  max_file_count: number;
  max_file_size: number;
  is_plan_almost_used: boolean;
  is_my: boolean;
}

export type AppInit = {
  user: User;
  user_settings_global: UserSettingsGlobal;
  user_settings: UserSettings;
  companies: Company[];
  auth_items: AuthItems;
  chats_count_unread: number;
  hidden_projects: any[];
  ip: string;
}

export type UserLogin = {
  token: string;
  app_init: AppInit;
  already_join_project: null;
}

export type Project = {
  id: number;
  name: string;
  uid: string;
  logo_url: string;
  position: number;
  is_active: number;
  tasks_visibility: number;
  is_owner_watcher: boolean;
  dta_user_since: null;
  users: User[];
  spent_sec_all_time: number;
  inv_secret_word: string;
  inv_is_gen_secret_word: boolean;
  inv_tasks_visibility: number;
  inv_sample_text: string;
  inv_welcome_message: string;
}
