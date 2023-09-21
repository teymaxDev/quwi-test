<template>
  <div class="app" :authenticated="authenticated">
    <AppBar />
    <div class="main">
      <Nuxt />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapGetters } from 'vuex'
// @ts-ignore
import AppBar from '~/components/layout/AppBar.vue'

export default Vue.extend({
  components: {
    AppBar
  },
  computed: {
    ...mapGetters({
      authenticated: 'user/authenticated'
    })
  }
})
</script>

<style lang="scss">
.app[authenticated="true"] {
  background-color: #f3f3f3;
}
.main {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  max-width: 1200px;
  box-sizing: border-box;
  margin: 0 auto;
  padding: 100px 15px 15px;
  .container {
    flex-grow: 1;
  }
}
</style>
