<template>
  <div class="nk-sidebar">
    <div class="nk-nav-scroll">
      <ul class="metismenu" id="metismenu" ref="metismenu">

        <router-link
          v-for="link in links"
          :to="link.path"
          v-slot="{ href, route, navigate, isActive, isExactActive }"
          :key="link.path"
          :exact="link.exact">
          <li class="mega-menu mega-menu-sm" :class="{ active: isActive, 'active-exact': isExactActive }">
            <a
              :href="href"
              :class="{ 'has-arrow': link.children }"
              @click="navigate"
              aria-expanded="false">
              <i class="menu-icon" :class="link.icon" ></i>
              <span class="nav-text">{{link.name}}</span>
            </a>
            <ul v-if="link.children" class="collapse" :class="{ 'in show': isActive }" aria-expanded="false">
              <li v-for="subItem in link.children" :key="subItem.path">
                <router-link :to="link.path + subItem.path" active-class="active">
                  {{subItem.name}}
                </router-link>
              </li>
            </ul>
          </li>
        </router-link>

      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SideBar',
  data () {
    return {
      links: [
        // { path: '/', name: 'Главная', icon: 'fas fa-home', exact: true },
        { path: '/profile', name: 'Профиль', icon: 'fas fa-user' },
        { path: '/history', name: 'История записей', icon: 'fas fa-history' },
        { path: '/planning', name: 'Планирование', icon: 'fas fa-ruler-combined' },
        { path: '/categories', name: 'Категории трат', icon: 'fas fa-book' },
        { path: '/record', name: 'Новая запись', icon: 'fas fa-video' },
        {
          path: '/settings',
          name: 'Настройки',
          icon: 'fas fa-sliders-h',
          children: [
            { path: '/user', name: 'Личные данные' }
          ]
        }
      ]
    }
  },
  mounted () {
  }
}
</script>

<style lang="scss" scoped>
</style>
