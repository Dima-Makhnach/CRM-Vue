<template>
    <div class="row">
      <Loader v-if="loading" />
      <PlanningPieChart v-else-if="categories.length" :categories="categories" />
      <div v-else class="card">
        <div class="card-body">
          <h4 class="card-title">Категорий пока нет</h4>
          <router-link to="/categories">Добавить новую</router-link>
        </div>
      </div>
    </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import PlanningPieChart from '../charts/PlanningPieChart'

export default {
  name: 'Planning',
  components: {
    PlanningPieChart
  },
  created () {
    this.getCategories()
  },
  computed: {
    ...mapState('category', ['categories', 'loading'])
  },
  methods: {
    ...mapActions('category', ['getCategories'])
  }
}
</script>

<style lang="scss" scoped>
  .card {
    width: 100%;

    & .card-body {
      text-align: center;
    }
  }
</style>
