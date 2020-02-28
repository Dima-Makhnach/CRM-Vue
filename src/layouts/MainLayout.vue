<template>
  <div id="main-wrapper" v-cloak class="show" :class="{'menu-toggle': !isOpenMenu }">
    <NavHeader/>
    <Header v-model="isOpenMenu" @toggleMenu="isOpenMenu = !isOpenMenu"/>
    <SideBar/>
    <div class="content-body">
      <BreadCrumbs/>
      <div class="container-fluid">
        <router-view/>
      </div>
    </div>
    <Footer/>
  </div>
</template>

<script>
import NavHeader from '../components/NavHeader'
import Header from '../components/Header'
import SideBar from '../components/SideBar'
import Footer from '../components/Footer'
import BreadCrumbs from '../components/BreadCrumbs'

export default {
  name: 'main-layout',
  data () {
    return {
      isOpenMenu: true
    }
  },
  components: {
    NavHeader,
    Header,
    SideBar,
    Footer,
    BreadCrumbs
  }
}
</script>

<style lang="scss" scoped>
  [v-cloak] {
    display: none;
  }
</style>
