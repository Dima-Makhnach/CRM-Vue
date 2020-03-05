<template>
  <div class="card-body pt-5">
    <div class="text-center">
      <h4>Регистрация</h4>
    </div>
    <form class="mt-5 mb-5 login-input" @submit.prevent="handlerSubmit">
      <div class="form-group">
        <label>
          <input
            type="text"
            v-model.trim="name"
            class="form-control"
            :class="{ invalid: $v.name.$dirty && !$v.name.required }"
            placeholder="Name">
        </label>
        <small
          v-if="$v.name.$dirty && !$v.name.required"
          class="text-invalid">Имя не должно быть пустым!</small>
      </div>
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
          class="text-invalid">Поле почта не должно быть пустым!</small>
        <small
          v-else-if="$v.email.$dirty && !$v.email.email"
          class="text-invalid">Формат почты не верен!</small>
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
          class="text-invalid">Пароль не должен быть пустой!</small>
        <small
          v-if="$v.password.$dirty && !$v.password.minLength"
          class="text-invalid">Минимальная длина пароля {{$v.password.$params.minLength.min}} символов. Сейчас {{password.length}}</small>
      </div>
      <button class="btn login-form__btn submit w-100">Зарегестрироваться</button>
    </form>
    <p class="mt-5 login-form__footer">Есть ауккаунт?
      <router-link to="/login" class="text-primary">Войти</router-link>
    </p>
  </div>
</template>

<script>
import { email, required, minLength } from 'vuelidate/lib/validators'
import { mapActions } from 'vuex'
import messages from '../../messages/messages'

export default {
  name: 'Register',
  data () {
    return {
      email: '',
      password: '',
      name: '',
      error: null
    }
  },
  mounted () {
  },
  beforeDestroy () {
    this.email = ''
    this.password = ''
    this.name = ''
    this.error = null
  },
  validations: {
    email: { required, email },
    password: { required, minLength: minLength(6) },
    name: { required }
  },
  methods: {
    ...mapActions('auth', ['register']),
    ...mapActions('user', ['addUser']),
    async handlerSubmit () {
      if (this.$v.$invalid) {
        this.$v.$touch()
        return
      }

      try {
        const { user } = await this.register({ name: this.name, email: this.email, password: this.password })
        await this.addUser({ id: user.uid, name: this.name, email: this.email })

        this.$router.push('/')
      } catch (e) {
        this.error = e

        this.$toasted.global.error(messages['register-error'])
      }
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
