<template>
  <div>
    <form class="mt-5 mb-5 login-input" @submit.prevent="handlerSubmit">
      <div class="form-group">
        <label>
          <input
            type="text"
            v-model.trim="email"
            class="form-control"
            :class="{ invalid: ($v.email.$dirty && !$v.email.required) || ($v.email.$dirty && !$v.email.email) }"
            placeholder="Email">
        </label>
        <small
          v-if="$v.email.$dirty && !$v.email.required"
          class="text-invalid">Email don't be empty!</small>
        <small
          v-else-if="$v.email.$dirty && !$v.email.email"
          class="text-invalid">Email value error!</small>
      </div>
      <div class="form-group">
        <label>
          <input
            type="password"
            v-model.trim="password"
            class="form-control"
            :class="{ invalid: ($v.password.$dirty && !$v.password.required) || ($v.password.$dirty && !$v.password.minLength) }"
            placeholder="Password">
        </label>
        <small
          v-if="$v.password.$dirty && !$v.password.required"
          class="text-invalid">Password don't be empty!</small>
        <small
          v-if="$v.password.$dirty && !$v.password.minLength"
          class="text-invalid">Password min length {{$v.password.$params.minLength.min}} characters. Now is {{password.length}}</small>
      </div>
      <button class="btn login-form__btn submit w-100">Sign In</button>
    </form>
    <p class="mt-5 login-form__footer">Dont have account?
      <router-link to="/register" class="text-primary">Register</router-link>
      now
    </p>
    <button @click="logout">logout</button>
  </div>
</template>

<script>
import { email, required, minLength } from 'vuelidate/lib/validators'
import { mapActions } from 'vuex'
import messages from '../../messages/messages'

export default {
  name: 'Login',
  data () {
    return {
      email: '',
      password: '',
      error: null
    }
  },
  mounted () {
    // Check query parameter for toast
    if (this.$route.query.message && messages[this.$route.query.message]) {
      this.$toasted.global.message(messages[this.$route.query.message])
    } else if (this.$route.query.error && messages[this.$route.query.error]) {
      this.$toasted.global.error(messages[this.$route.query.error])
    }
  },
  beforeDestroy () {
    this.error = null
    this.email = ''
    this.password = ''
  },
  validations: {
    email: { required, email },
    password: { required, minLength: minLength(6) }
  },
  methods: {
    ...mapActions('auth', ['login', 'logout']),
    handlerSubmit () {
      if (this.$v.$invalid) {
        this.$v.$touch()
        return
      }

      this.login({
        email: this.email,
        password: this.password
      })
        .then(() => {
          this.$router.push('/')
          this.$v.$reset()
        })
        .catch(err => {
          this.error = err
          this.$toasted.global.error(messages[err.code])
        })
    }
  }
}
</script>

<style lang="scss" scoped>
  .login-input .form-group .form-control.invalid {
    border-color: red;
  }

  .login-input .form-group {
    margin-bottom: 15px;
  }

  .text-invalid {
    display: block;
    color: red;
  }
</style>
