import axios, { AxiosResponse } from 'axios'
import type { Plugin } from '@nuxt/types'
import { getErrorFromResponse, handleErrors } from '~/utils/helpers'

export type ApiMethods = {
  get: <T>(url?: string, query?: Record<string, any>, params?: Record<string, any>) => Promise<AxiosResponse<T>>;
  post: <T>(url?: string, data?: Record<string, any>, params?: Record<string, any>) => Promise<AxiosResponse<T>>;
  put: <T>(url?: string, data?: Record<string, any>, params?: Record<string, any>) => Promise<AxiosResponse<T>>,
  delete: <T>(url?: string, data?: Record<string, any>) => Promise<AxiosResponse<T>>
}

declare module 'vue/types/vue' {
  interface Vue {
    $http: ApiMethods
  }
}

declare module '@nuxt/types' {
  interface Context {
    $http: ApiMethods
  }
}

const searchParamsToString = (params: Record<string, any>, namespace?: string) => {
  let qs = namespace ? '' : '?'
  for (const k in params) {
    if (!({}).hasOwnProperty.call(params, k)) {
      continue
    }
    const val = params[k]
    if (typeof val === 'object') {
      qs += searchParamsToString(val, k)
    } else if (val !== null && typeof val !== 'undefined') {
      qs += (namespace ? `${namespace}[${k}]` : k) + '=' + val + '&'
    }
  }
  namespace || qs.replace(/&$/, '')
  return qs
}

const axiosPlugin: Plugin = ({ store, redirect, error, $config }, inject) => {
  const http = axios.create({
    baseURL: $config.baseURL
  })
  http.interceptors.request.use(
    (config) => {
      config.headers['Client-Device'] = 'desktop'
      const token = store.state.user.token
      if (typeof token === 'string') {
        config.headers.Authorization = `Bearer ${token}`
      }
      if (!process.server) {
        config.headers['Client-Timezone-Name'] = Intl.DateTimeFormat().resolvedOptions().timeZone
      }
      return config
    },
    (err) => {
      return Promise.reject(err)
    }
  )

  http.interceptors.response.use(
    res => res,
    async (err) => {
      const code = +err?.response?.status
      if (!code) {
        return Promise.reject(err)
      }
      err.statusCode = err.response.data ? err.response.status : err.response.status
      err.message = err.response.data ? err.response.message : err.response.statusText
      err.name = err.response.data ? err.response.name : err.response.statusText

      if (!err.response.config.customErrorHandling) {
        switch (code) {
          case 401:
            await store.dispatch('user/logout')
            if (process.server) {
              redirect('/login')
            } else {
              window.location.href = '/login'
            }
            break
          case 403:
          case 404:
          case 500:
            handleErrors(error, err)
            break
        }
      }
      return Promise.reject(err.response?.data ? getErrorFromResponse(err) : err)
    }
  )

  const methods: ApiMethods = {
    get: (url, query, params) => {
      if (query) {
        url += searchParamsToString(query)
      }
      return http.get(url, params)
    },
    post: (url, data, params) => {
      return http.post(url, data, params)
    },
    put: (url, data, params) => {
      return http.put(url, data, params)
    },
    delete: (url, data) => {
      return http.delete(url, data)
    }
  }

  inject('http', methods)
}

export default axiosPlugin
