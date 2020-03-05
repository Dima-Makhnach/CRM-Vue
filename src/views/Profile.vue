<template>
  <div class="row profile h-100">
    <div class="col-lg-4 col-xl-3">
      <div class="card card-container-profile">
        <Loader class="card-container-profile__loader" v-if="loading" />
        <div v-else class="card-body">
          <div class="media align-items-center mb-4">
            <img class="mr-3" :src="user.image" width="80" height="80" :alt="user.name">
            <div class="media-body">
              <h3 class="mb-0">{{user.name}}</h3>
              <p class="text-muted mb-0">{{user.country}}</p>
            </div>
          </div>
          <h4>Обо мне</h4>
          <p class="text-muted">{{user.description}}</p>
          <ul class="card-profile__info">
            <li class="mb-1">
              <strong class="text-dark mr-4">Телефон</strong>
              <span>{{user.phone}}</span>
            </li>
            <li>
              <strong class="text-dark mr-4">Почта</strong>
              <span>{{user.email}}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="col-lg-8 col-xl-9">
      <div class="card">
        <div class="card-body">
          <form @submit.prevent="handlerSubmit" class="form-profile">
            <div class="form-group">
                <textarea
                  class="form-control"
                  name="textarea"
                  id="textarea"
                  v-model.trim="textNote"
                  cols="30"
                  rows="2"
                  :class="{ invalid: ($v.textNote.$dirty && !$v.textNote.required) || ($v.textNote.$dirty && !$v.textNote.minLength) }"
                  placeholder="Написать новую заметку"></textarea>
                <small
                  v-if="$v.textNote.$dirty && !$v.textNote.required"
                  class="text-invalid">Текстовая область не должна быть пустой!</small>
                <small
                  v-if="$v.textNote.$dirty && !$v.textNote.minLength"
                  class="text-invalid">Минимальная длина {{$v.textNote.$params.minLength.min}} символов. Сейчас {{textNote.length}}</small>
            </div>
            <div class="d-flex align-items-center">
              <button class="btn btn-primary px-3">Добавить</button>
            </div>
          </form>
        </div>
      </div>

      <div class="card card-container-profile">
        <Loader class="card-container-profile__loader" v-if="service.loading" />
        <div v-else-if="posts.length" class="card-body">
          <div v-for="post in posts" :key="post.id" class="media media-reply">
            <img
              class="mr-3 circle-rounded"
              :src="user.image"
              width="50"
              height="50"
              :alt="user.name">
            <div class="media-body">
              <div class="d-sm-flex justify-content-between mb-2">
                <h5 class="mb-sm-0">{{user.name}}
                  <small class="text-muted ml-3">{{ new Date(post.time) | date('datetime') }}</small>
                </h5>
              </div>
              <p class="text-content">{{post.text}}</p>
              <button class="button-delete-post" @click.prevent="() => handlerDelete(post.id)" type="button">
                <i class="fas fa-times"></i>
              </button>
            </div>
          </div>
        </div>
        <div v-else class="card-body">
          <div class="media-body">
            <p class="media-body__text">Заметок нет</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { required, minLength } from 'vuelidate/lib/validators'

export default {
  name: 'Profile',
  data () {
    return {
      user: {},
      loading: true,
      error: null,
      textNote: ''
    }
  },
  created () {
    this.getPosts()

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
  beforeDestroy () {
    this.user = {}
    this.error = null
  },
  computed: {
    ...mapGetters('post', ['posts', 'service'])
  },
  validations: {
    textNote: { required, minLength: minLength(50) }
  },
  methods: {
    ...mapActions('user', ['getUser']),
    ...mapActions('post', ['setPost', 'getPosts', 'deletePost']),
    handlerSubmit () {
      this.$v.$touch()

      if (this.$v.$invalid) {
        return
      }

      this.setPost(this.textNote)

      this.$v.$reset()
      this.textNote = ''
    },
    handlerDelete (id) {
      this.deletePost(id)
    }
  }
}
</script>

<style lang="scss" scoped>
  .profile {
    height: 100vh;
  }

  .media-body {
    position: relative;

    &__text {
      margin-bottom: 0;
      height: 100%;
    }
  }

  .login-input .form-group .form-control.invalid {
    border-color: red;
  }

  .text-invalid {
    display: block;
    color: red;
  }

  .button-delete-post {
    position: absolute;
    top: 10px;
    right: 10px;

    background-color: transparent;
    border: 0px;

    cursor: pointer;

    &:hover,
    &:focus {
      outline: 0;
    }
  }

  .text-content {
    margin-bottom: 0;
  }

  .card-container-profile {
    position: relative;

    min-height: 50px;

    &__loader {
      width: 30px;
      height: 30px;
    }
  }
</style>
