<template>
  <form class="login-form" @submit.prevent.stop="submitHandler">
    <div class="login-form__logo">
      <Logo />
    </div>
    <div class="login-form__field">
      <TextField
        v-model.trim="form.email"
        name="email"
        placeholder="Email"
        type="email"
        :error="errors.email"
        @clear-error="clearErrors"
      />
    </div>
    <div class="login-form__field">
      <TextField
        v-model.trim="form.password"
        name="password"
        placeholder="Password"
        type="password"
        :error="errors.password"
        @clear-error="clearErrors"
      />
    </div>
    <div class="login-form__submit">
      <Btn red type="submit" :loading="loading" :disabled="loading || hasErrors">
        Login
      </Btn>
    </div>
  </form>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapActions } from 'vuex'
// @ts-ignore
import Logo from '~/assets/svg/logo.svg?inline'
import TextField from '~/components/TextField.vue'
import Btn from '~/components/Btn.vue'

export default Vue.extend({
  name: 'LoginForm',
  components: {
    Logo,
    TextField,
    Btn
  },
  data: () => ({
    form: {
      email: '',
      password: ''
    },
    errors: {
      email: '',
      password: ''
    },
    loading: false
  }),
  computed: {
    hasErrors (): boolean {
      return Object.values(this.errors).some(v => !!v)
    }
  },
  methods: {
    ...mapActions({
      login: 'user/login'
    }),
    validate () {
      if (!this.form.email) {
        this.errors.email = 'Email cannot be blank'
        return false
      }
      if (!this.form.password) {
        this.errors.email = 'Password cannot be blank'
        return false
      }
      return true
    },
    clearErrors () {
      this.errors = {
        email: '',
        password: ''
      }
    },
    async submitHandler () {
      const isValid = this.validate()
      if (!isValid) {
        return
      }
      try {
        this.loading = true
        await this.login(this.form)
        this.$router.push({ name: 'index' })
      } catch (err: unknown) {
        this.errors.email = err as unknown as string
        // eslint-disable-next-line no-console
        console.trace(err)
      } finally {
        this.loading = false
      }
    }
  }
})
</script>

<style lang="scss">
.login-form {
  padding: 35px 40px 50px;
  background: #fff;
  border: 1px solid rgba(0, 0, 0, 0.11);
  box-shadow: 0 0 12px rgba(0, 0, 0, 0.25);
  border-radius: 15px;
  width: 360px;
  margin: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  &__logo {
    margin-bottom: 40px;
  }
  &__field,
  &__submit {
    flex-grow: 1;
    width: 100%;
    .btn {
      width: 100%;
    }
  }
  &__field {
    margin-bottom: 20px;
  }
  &__submit {
    margin-top: 10px;
  }
  svg {
    width: 75px;
    height: 37px;
    color: $primary-text;
  }
}
</style>
