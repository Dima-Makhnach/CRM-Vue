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
import ErrorLayout from './layouts/ErrorLayout'

export default {
  name: 'App',
  components: {
    AuthLayout,
    MainLayout,
    ErrorLayout
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
