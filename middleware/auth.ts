import { Middleware } from '@nuxt/types'

const authMiddleware: Middleware = ({ store, redirect }) => {
  // If the user is not authenticated

  if (!store.getters['user/authenticated']) {
    return redirect('/login')
  }
}

export default authMiddleware
