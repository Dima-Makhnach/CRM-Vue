<template>
  <div class="row justify-content-center">
    <div class="col-lg-12">
      <div class="card">
        <div class="card-body">
          <div class="form-validation">
            <form class="form-valide" @submit.prevent="handlerSubmit">
              <div class="form-group row">
                <label class="col-lg-4 col-form-label" for="val-username">Имя <span class="text-danger">*</span>
                </label>
                <div class="col-lg-6">
                  <input type="text" class="form-control" v-model="name" id="val-username" name="val-username" placeholder="Введите имя..">
                </div>
                <small
                  v-if="$v.name.$dirty && !$v.name.required"
                  class="text-invalid">Имя не должно быть пустым!</small>
                <small
                  v-else-if="$v.name.$dirty && !$v.name.minLength"
                  class="text-invalid">Минимальная длина {{$v.name.$params.minLength.min}}!</small>
              </div>
              <div class="form-group row">
                <label class="col-lg-4 col-form-label" for="val-email">Почта <span class="text-danger">*</span>
                </label>
                <div class="col-lg-6">
                  <input type="text" class="form-control" v-model="email" id="val-email" name="val-email" placeholder="Ваша почта..">
                </div>
                <small
                  v-if="$v.email.$dirty && !$v.email.required"
                  class="text-invalid">Почта не должна быть пустой!</small>
                <small
                  v-else-if="$v.email.$dirty && !$v.email.email"
                  class="text-invalid">Проверьте правильность почты!</small>
              </div>
              <div class="form-group row">
                <label class="col-lg-4 col-form-label" for="val-phoneus">Телефон <span class="text-danger">*</span>
                </label>
                <div class="col-lg-6">
                  <input type="text" class="form-control" v-model="phone" id="val-phoneus" name="val-phoneus" placeholder="8 800 000-00-00">
                </div>
                <small
                  v-if="$v.phone.$dirty && !$v.phone.required"
                  class="text-invalid">Телефон не должен быть пустым!</small>
              </div>
              <div class="form-group row">
                <label class="col-lg-4 col-form-label" for="val-password">Пароль <span class="text-danger">*</span>
                </label>
                <div class="col-lg-6">
                  <input type="password" class="form-control" v-model="password" id="val-password" name="val-password" placeholder="Введите новый пароль..">
                </div>
                <small
                  v-if="$v.password.$dirty && !$v.password.required"
                  class="text-invalid">Поле пароль не должен быть пустым!</small>
              </div>
              <div class="form-group row">
                <label class="col-lg-4 col-form-label" for="val-suggestions">Обо мне <span class="text-danger">*</span>
                </label>
                <div class="col-lg-6">
                  <textarea class="form-control" id="val-suggestions" v-model="description" name="val-suggestions" rows="5" placeholder="Введите информацию о себе"></textarea>
                </div>
                <small
                  v-if="$v.description.$dirty && !$v.description.required"
                  class="text-invalid">Поле о себе не должен быть пустым!</small>
              </div>
              <div class="form-group row">
                <div class="col-lg-8 ml-auto">
                  <button type="submit" class="btn btn-primary">Изменить</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { required, email, minLength } from 'vuelidate/lib/validators'
import { mapActions } from 'vuex'

export default {
  name: 'User',
  data () {
    return {
      name: '',
      email: '',
      phone: '',
      password: '',
      description: '',
      error: null
    }
  },
  created () {
    this.getUser()
      .then(res => {
        const value = res.val()
        if (value) {
          this.name = value.name
          this.email = value.email
          this.phone = value.phone
          this.description = value.description
        }
      })
      .catch(err => (this.error = err))
  },
  validations: {
    name: { required, minLength: minLength(3) },
    email: { required, email },
    phone: { required },
    password: { required, minLength: minLength(6) },
    description: { required }
  },
  methods: {
    ...mapActions('user', ['getUser', 'updateUser']),
    handlerSubmit () {
      if (this.$v.$invalid) {
        this.$v.$touch()
        return
      }

      this.updateUser({
        name: this.name,
        email: this.email,
        phone: this.phone,
        password: this.password,
        description: this.description
      }).then(() => this.$toasted.global.message('Информация успешно обновлена!'))
        .catch(() => this.$toasted.global.error('Ошибка обновления информации. Обратитесь к администратору!'))
    }
  }
}
</script>

<style scoped>

</style>
