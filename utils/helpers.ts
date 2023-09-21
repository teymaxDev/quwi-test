import { NuxtError } from '@nuxt/types'
import type { AxiosError, AxiosResponse } from 'axios'

export interface ErrorResponse extends AxiosResponse {
  first_errors: Record<string, string>
}

export type ApiError = AxiosError<ErrorResponse>

export const getErrorFromResponse = (err: ApiError): string | undefined => {
  if (err?.response?.status && [410, 403].includes(+err.response.status)) {
    return undefined
  }
  if (err.response && err.response.data && err.response.data.first_errors) {
    return Object.values(err.response.data.first_errors)[0]
  } else if (err.message) {
    return err.message
  } else {
    return 'Some error has occurred. Please try again later'
  }
}

export const handleErrors = (invokeError: (e: NuxtError) => NuxtError, e: ApiError) => {
  if (e.response) {
    invokeError({ statusCode: e.response.status, message: getErrorFromResponse(e) })
    throw getErrorFromResponse(e)
  } else if (!process.server) {
    // eslint-disable-next-line no-console
    console.error(e)
  } else {
    invokeError({ message: e.stack })
  }
}

export const cuid = (): string => {
  const dateString = Date.now().toString(36)
  const randomness = Math.random().toString(36).substr(2)
  return dateString + randomness
}

export const getCookie = (cookies: any, name: string) => {
  return cookies.get(name)
}

export const setCookie = (cookies: any, name: string, data: string) => {
  cookies.set(name, data, {
    path: '/',
    maxAge: 60 * 60 * 24 * 7
  })
}

export const removeCookie = (cookies: any, name: string) => {
  cookies.remove(name)
}
