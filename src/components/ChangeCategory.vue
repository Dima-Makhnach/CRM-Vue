<template>
  <div class="col-lg-6">
    <div class="card">
      <div class="card-body">
        <h4 class="card-title">Редактировать категорию</h4>
        <div class="basic-form">
          <form @submit.prevent="handlerSubmit">
            <div class="form-group">
              <select @change="changeSelect" class="form-control input-default" ref="select">
                <option value="" selected disabled hidden>Выберите категорию</option>
                <option v-for="cat in categories" :key="cat.id" :value="cat.id">{{cat.name}}</option>
              </select>
            </div>
            <div class="form-group">
              <input
                type="text"
                v-model="name"
                class="form-control input-default"
                :class="{ invalid: ($v.name.$dirty && !$v.name.required) }"
                :disabled="flag"
                placeholder="Название">
            </div>
            <div class="form-group">
              <input
                type="number"
                v-model="limit"
                class="form-control input-default"
                :class="{ invalid: ($v.limit.$dirty && !$v.limit.required) }"
                :disabled="flag"
                placeholder="Лимит">
            </div>
            <div class="form-group button-container">
              <button class="btn btn-dark mb-2">Изменить</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { required } from 'vuelidate/lib/validators'
import { mapActions } from 'vuex'

export default {
  name: 'ChangeCategory',
  props: {
    categories: { required: true, type: Array }
  },
  data () {
    return {
      name: '',
      limit: '',
      category: null,
      flag: true
    }
  },
  validations: {
    name: { required },
    limit: { required }
  },
  methods: {
    ...mapActions('category', ['changeCategory']),
    changeSelect (evt) {
      if (evt.target.value.length) {
        this.category = evt.target.value
        this.flag = false
      }
    },
    handlerSubmit () {
      this.$v.$touch()

      if (this.$v.$invalid) {
        return
      }

      this.changeCategory({
        id: this.category,
        name: this.name,
        limit: this.limit
      }).then(() => {
        this.$v.$reset()
        this.$refs.select.value = ''

        this.category = ''
        this.name = ''
        this.limit = ''
        this.flag = true
      }).catch(() => {
        this.$toasted.global.error('Ошибка изменения категории! Обратитесь к администратору.')
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .login-input .form-group .form-control.invalid {
    border-color: red;
  }
</style>
