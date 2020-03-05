<template>
  <div class="history-container">
    <div v-if="loading" class="row">
      <div class="card">
        <div class="card-body">
          <Loader class="card__loader"/>
        </div>
      </div>
    </div>
    <div v-else-if="records.length" class="row">
      <div class="col-12">
        <div class="card">
          <div class="card-body">
            <h4 class="card-title">История записей</h4>
            <div class="table-responsive">
              <table class="table table-striped table-bordered zero-configuration">
                <thead>
                <tr>
                  <th>#</th>
                  <th>Сумма</th>
                  <th>Дата</th>
                  <th>Описание</th>
                  <th>Тип</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="(record, index) in items" :key="record.id">
                  <td>{{++index}}</td>
                  <td>{{record.amount}}</td>
                  <td>{{new Date(record.date) | date('datetime')}}</td>
                  <td>{{record.description}}</td>
                  <td>{{record.type}}</td>
                </tr>
                </tbody>
                <tfoot>
                <tr>
                  <th>#</th>
                  <th>Сумма</th>
                  <th>Дата</th>
                  <th>Описание</th>
                  <th>Тип</th>
                </tr>
                </tfoot>
              </table>
            </div>
          </div>
        </div>
      </div>
      <div class="col-lg-12">
        <div class="card">
          <div class="card-body">
            <div class="bootstrap-pagination">
              <nav>
                <Paginate
                  v-model="page"
                  :page-count="pageCount"
                  :click-handler="pageChangeHandler"
                  :prev-text="'Назад'"
                  :next-text="'Вперед'"
                  :container-class="'pagination'"
                  :page-class="'page-item'"
                  :prev-class="'page-item'"
                  :next-class="'page-item'"
                  :page-link-class="'page-link'"
                  :prev-link-class="'page-link'"
                  :next-link-class="'page-link'"
                ></Paginate>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="row">
      <div class="card">
        <div class="card-body">
          <h4 class="card-title">Записей пока нет</h4>
          <router-link to="/record">Добавить новую</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Pie } from 'vue-chartjs/src'
import { mapActions, mapState } from 'vuex'

import paginationMixin from '../plugins/pagination.mixin'
import arrFromObj from '../utils/arrFromObj'

export default {
  name: 'History',
  extends: Pie,
  mixins: [paginationMixin],
  data () {
    return {
      records: [],
      loading: true,
      error: null
    }
  },
  async mounted () {
    await this.getCategories()
    await this.getRecords()
      .then(res => {
        if (res.val()) {
          this.records = arrFromObj(res.val())
        }
        this.loading = false
      }).catch(err => {
        this.error = err
        this.loading = false
      })

    await this.setupPagination(
      this.records.map(record => {
        return {
          ...record,
          categoryName: this.categories.find(c => c.id === record.categoryId)
            .title,
          typeClass: record.type === 'income' ? 'green' : 'red',
          typeText: record.type
        }
      })
    )
  },
  computed: {
    ...mapState('category', ['categories'])
  },
  methods: {
    ...mapActions('record', ['getRecords']),
    ...mapActions('category', ['getCategories'])
  }
}
</script>

<style lang="scss" scoped>
  .history-container {
    height: 100vh;
  }

  .pagination {
      margin-bottom: 0;
  }

  .card {
    width: 100%;

    &-body {
      text-align: center;
    }

    &-title {
      text-align: center;
    }

    &__loader {
      width: 30px;
      height: 30px;
    }
  }
</style>
