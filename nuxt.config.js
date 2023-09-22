export default {
  head: {
    title: 'quwi-test',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  css: [
    '~/assets/global.css',
    '~/assets/variables.scss'
  ],
  styleResources: {
    scss: ['./assets/*.scss']
  },
  plugins: [
    '~/plugins/axios.ts',
    '~/plugins/api.ts',
    '~/plugins/v-ripple.ts'
  ],
  buildModules: [
    '@nuxt/typescript-build',
    '@nuxtjs/svg'
  ],
  modules: [
    '@nuxtjs/style-resources',
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    'cookie-universal-nuxt'
  ],
  server: {
    port: process.env.PORT || 3000,
  },
  pwa: {
    manifest: {
      lang: 'en'
    }
  },
  build: {
  },
  privateRuntimeConfig: {
    baseURL: process.env.BASE_URL
  },
  publicRuntimeConfig: {
    baseURL: process.env.BASE_URL
  }
}
