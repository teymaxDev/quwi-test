<template>
  <div class="container">
    <LoginForm />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
// @ts-ignore
import LoginForm from '~/components/login/LoginForm.vue'

export default Vue.extend({
  name: 'LoginPage',
  components: {
    LoginForm
  },
  middleware: ['signedIn']
})
</script>
