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
              <i class="icon-speedometer menu-icon"></i>
              <span class="nav-text">{{link.name}}</span>
            </a>
            <ul v-if="link.children" class="collapse" :class="{ in: isActive }" aria-expanded="false">
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
        { path: '/', name: 'Главная', exact: true },
        { path: '/profile', name: 'Профиль' },
        { path: '/detail', name: 'Detail' },
        { path: '/history', name: 'История записей' },
        { path: '/planning', name: 'Планирование' },
        { path: '/record', name: 'Запись' },
        { path: '/calendar', name: 'Календарь' },
        {
          path: '/email',
          name: 'Email',
          children: [
            { path: '/inbox', name: 'Входящие' },
            { path: '/compose', name: 'Написать' },
            { path: '/read', name: 'Сообщение' }
          ]
        },
        {
          path: '/settings',
          name: 'Настройки',
          children: [
            { path: '/user', name: 'Личные данные' },
            { path: '/account', name: 'Настройки аккаунта' }
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
