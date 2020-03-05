<template>
  <div class="col-lg-6">
    <div class="card">
      <div class="card-body">
        <h4 class="card-title">Создать категорию</h4>
        <div class="basic-form">
          <form class="row" @submit.prevent="handlerCreateCategory">
            <div class="col-6 form-group">
              <input type="text" v-model="name" class="form-control input-default" placeholder="Название">
              <small
                v-if="$v.name.$dirty && !$v.name.required"
                class="text-invalid">Название не должно быть пустым!</small>
            </div>
            <div class="col-6 form-group">
              <input type="number" v-model="limit" class="form-control input-default" placeholder="Лимит">
            </div>
            <div class="col-12 form-group button-container">
              <button class="btn btn-dark mb-2">Создать</button>
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
  name: 'CreateCategory',
  data () {
    return {
      name: '',
      limit: 100
    }
  },
  validations: {
    name: { required },
    limit: { required }
  },
  methods: {
    ...mapActions('category', ['addCategory']),
    handlerCreateCategory () {
      if (this.$v.$invalid) {
        this.$v.$touch()
        return
      }

      this.addCategory({ name: this.name, limit: this.limit })
        .then(() => this.$toasted.global.message('Категория успешно добавлена'))
        .catch(() => this.$toasted.global.error('Ошибка добавления категории'))

      this.name = ''
      this.limit = 100
    }
  }
}
</script>

<style scoped>

</style>
