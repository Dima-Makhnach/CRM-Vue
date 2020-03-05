<template>
  <div class="row categories">
    <CreateCategory/>
    <ChangeCategory v-if="categories.length" :categories="categories" />
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'

import CreateCategory from '../components/CreateCategory'
import ChangeCategory from '../components/ChangeCategory'

export default {
  name: 'Categories',
  components: {
    CreateCategory,
    ChangeCategory
  },
  created () {
    this.getCategories()
  },
  computed: {
    ...mapState('category', ['categories'])
  },
  methods: {
    ...mapActions('category', ['getCategories'])
  }
}
</script>

<style lang="scss" scoped>
  .categories {
    height: 100vh;

    .button-container {
      margin-bottom: 0;
    }
  }
</style>
