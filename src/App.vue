<template>
  <div class="h-100">
    <component :is="layout">
      <router-view/>
    </component>
  </div>
</template>

<script>
import AuthLayout from './layouts/AuthLayout'
import MainLayout from './layouts/MainLayout'

export default {
  name: 'App',
  components: {
    AuthLayout,
    MainLayout
  },
  computed: {
    layout () {
      return (this.$route.meta.layout || 'auth-layout')
    }
  }
}
</script>

<style lang="scss" module>
  body {
    margin: 0;
    padding: 0;
  }
</style>
