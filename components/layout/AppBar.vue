<template>
  <header class="app-bar" :authenticated="authenticated">
    <nav class="app-bar__nav">
      <NuxtLink to="/" class="logo">
        <Logo />
      </NuxtLink>
      <ul class="nav-links">
        <template v-if="authenticated">
          <li class="nav-link">
            <NuxtLink to="/">
              Projects
            </NuxtLink>
          </li>
          <li class="nav-link" cta @click="logout">
            <a>Logout</a>
          </li>
        </template>
        <li v-else class="nav-link">
          <NuxtLink to="/login">
            Login
          </NuxtLink>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapGetters } from 'vuex'
// @ts-ignore
import Logo from '~/assets/svg/logo.svg?inline'

export default Vue.extend({
  name: 'AppBar',
  components: {
    Logo
  },
  computed: {
    ...mapGetters({
      authenticated: 'user/authenticated'
    })
  },
  methods: {
    async logout () {
      try {
        this.$store.dispatch('user/logout')
        await this.$nextTick()
        this.$router.replace('/login')
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error(err)
      }
    }
  }
})
</script>

<style lang="scss">
.app-bar {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0;
  background: #fff;
  z-index: 1000;
  &__nav {
    width: 1200px;
    height: 100px;
    padding: 0 0 0 15px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: thin solid transparent;
    .logo svg {
      width: 77px;
      height: 37px;
      color: $secondary;
    }
    .nav-links {
      padding: 0;
      list-style-type: none;
      display: flex;
      align-items: center;
      .nav-link {
        margin: 0 20px;
        a {
          font-size: 18px;
          color: $primary-text;
          text-decoration: none;
          transition: all .15s ease-in-out;
        }
      }
      .nav-link:hover a,
      a.nuxt-link-active {
        color: $primary;
        pointer-events: none;
      }
      .nav-link[cta]:hover {
        cursor: pointer;
        color: $primary;
      }
    }
  }
  &[authenticated="true"] {
    .app-bar__nav {
      height: 50px;
    }
    border-bottom: thin solid $gray--light;
  }
}
@media (max-width: 768px) {
  .app-bar .app-bar__nav {
    height: 67px;
  }
}
</style>
