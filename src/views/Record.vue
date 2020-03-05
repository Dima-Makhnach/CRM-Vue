<template>
  <div class="row record">
    <div v-if="categories.length" v-cloak class="col-lg-12">
      <div class="card">
        <div class="card-body">
          <h4 class="card-title">Создать заметку</h4>
          <div class="basic-form">
            <form @submit.prevent="handlerSubmit">
              <div class="form-group">
                <label for="choose-category">Выберите категорию:</label>
                <select @change="handlerChangeSelect" id="choose-category" v-model="categoryId" class="form-control input-default">
                  <option v-for="cat in categories" :key="cat.id" :value="cat.id">{{cat.name}}</option>
                </select>
              </div>
              <fieldset class="form-group">
                <div class="row">
                  <label class="col-form-label col-sm-2 pt-0">Назначение</label>
                  <div class="col-sm-10">
                    <div class="form-check">
                      <input class="form-check-input" v-model="type" :disabled="flag" type="radio" id="record-revenue" name="gridRadios" value="income">
                      <label class="form-check-label" for="record-revenue">Доходы</label>
                    </div>
                    <div class="form-check">
                      <input class="form-check-input" v-model="type" :disabled="flag" type="radio" id="expenses" name="gridRadios" value="outcome">
                      <label class="form-check-label" for="expenses">Расходы</label>
                    </div>
                  </div>
                </div>
              </fieldset>
              <div class="form-group">
                <label for="record-summ">Сумма</label>
                <input type="number" id="record-summ" v-model.number="amount" :disabled="flag" class="form-control input-default">
              </div>
              <div class="form-group">
                <label for="record-about">Описание</label>
                <input type="text" id="record-about" v-model="description" :disabled="flag" class="form-control input-default">
              </div>
              <div class="form-group button-container">
                <button class="btn btn-dark mb-2">Создать</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    <div v-if="!categories.length" class="col-lg-12">
      <div class="card">
        <div class="card-body card-body-empty">
          <h4 class="card-title">Для добавления записи необходимы категории, а их нет!</h4>
          <router-link to="/categories">Добавить категорию</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  name: 'Record',
  data () {
    return {
      type: 'outcome',
      amount: 100,
      description: '',
      categoryId: null,
      flag: true
    }
  },
  created () {
    this.getCategories()
  },
  computed: {
    ...mapState('category', ['categories'])
  },
  methods: {
    ...mapActions('category', ['getCategories']),
    ...mapActions('record', ['addRecord']),
    handlerSubmit () {
      if (this.amount > 0 && this.description.length && this.categoryId) {
        this.addRecord({
          type: this.type,
          amount: this.amount,
          description: this.description,
          categoryId: this.categoryId
        }).then(() => this.$toasted.global.message('Запись успешно создана!'))

        this.description = ''
      } else {
        this.$toasted.global.error('Ошибка отправки, поля не заполнены!')
      }
    },
    handlerChangeSelect (evt) {
      if (evt.target.value) this.flag = false
    }
  }
}
</script>

<style lang="scss" scoped>
  [v-cloak] {
    display: none;
  }

  .record {
    height: 100vh;

    & .button-container {
      margin-bottom: 0;
    }

    & .card-body-empty {
      text-align: center;
    }
  }
</style>
