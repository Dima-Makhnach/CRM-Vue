<template>
  <div class="header">
    <div class="header-content clearfix">
      <div @click.prevent="$emit('toggleMenu')" class="nav-control">
        <div class="hamburger" :class="{ 'is-active': !value }">
          <span class="toggle-icon">
            <i class="icon-menu"></i>
          </span>
        </div>
      </div>
      <div class="header-left">
        <div class="input-group icons">
          <div class="input-group-prepend">
            <span class="input-group-text bg-transparent border-0 pr-2 pr-sm-3" id="basic-addon2">
              <i class="mdi mdi-timetable"></i>
              <span class="header-time">{{date | date('datetime')}}</span>
            </span>
          </div>
        </div>
      </div>
      <div class="header-right">
        <ul class="clearfix">
          <li class="icons dropdown">
            <div class="user-img c-pointer position-relative" data-toggle="dropdown">
              <img :src="user.image" height="40" width="40" :alt="user.name">
            </div>
            <div class="drop-down dropdown-profile animated fadeIn dropdown-menu">
              <div class="dropdown-content-body">
                <ul>
                  <li><p>{{user.name}}</p></li>
                  <li>
                    <router-link to="/profile">
                      <i class="icon-user"></i>
                      <span>Профиль</span>
                    </router-link>
                  </li>
<!--                  <li>-->
<!--                    <router-link to="email/inbox">-->
<!--                      <i class="icon-envelope-open"></i>-->
<!--                      <span>Inbox</span>-->
<!--                    </router-link>-->
<!--                  </li>-->
                  <hr class="my-2">
                  <li>
                    <a href="" @click.prevent="handlerLogout">
                      <i class="icon-key"></i>
                      <span>Logout</span></a>
                  </li>
                </ul>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import messages from '../messages/messages'

export default {
  name: 'Header',
  props: ['value'],
  data () {
    return {
      user: {},
      interval: null,
      date: new Date(),
      error: null,
      loading: true
    }
  },
  created () {
    this.getUser()
      .then(res => {
        this.user = res.val()
        this.loading = false
      })
      .catch(err => {
        this.error = err
        this.loading = false
      })
  },
  mounted () {
    this.interval = setInterval(() => {
      this.date = new Date()
    }, 1000)
  },
  beforeDestroy () {
    clearInterval(this.interval)
  },
  methods: {
    ...mapActions('auth', ['logout']),
    ...mapActions('user', ['getUser']),
    handlerLogout () {
      try {
        this.logout()
        this.$router.push('/login?message=logout')
      } catch (e) {
        this.$toasted.global.error(messages['logout-error'])
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .header-time {
    display: inline-block;
    margin-left: 5px;

    font-size: 14px;
  }

  input[type=search].form-control.custom-search {
    width: 60%;
  }
</style>
