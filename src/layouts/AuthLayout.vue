<template>
  <div class="login-form-bg h-100">
    <div class="container h-100">
      <div class="row justify-content-center h-100">
        <div class="col-xl-6">
          <div class="form-input-content">
            <div class="card login-form mb-0">
              <div class="card-body pt-5">
                <router-link class="text-center" to="/">
                  <h4>Rosella</h4>
                </router-link>
                <router-view/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'auth-layout',
  components: {}
}
</script>

<style lang="scss" scoped>
</style>
