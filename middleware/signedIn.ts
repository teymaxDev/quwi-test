import { Middleware } from '@nuxt/types'

const authMiddleware: Middleware = ({ store, redirect, route }) => {
  // If the user is authenticated & on login page

  if (store.getters['user/authenticated'] && route.name === 'login') {
    return redirect('/')
  }
}

export default authMiddleware
