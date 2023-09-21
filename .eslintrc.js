module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  extends: [
    '@nuxtjs/eslint-config-typescript',
    'plugin:nuxt/recommended'
  ],
  rules: {
    'vue/multi-word-component-names': 'off',
    'vue/no-reserved-component-names': 'off'
  }
}
