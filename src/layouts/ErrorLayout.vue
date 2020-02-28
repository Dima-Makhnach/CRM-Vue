<template>
  <div class="h-100">
    <Preloader/>
    <div class="login-form-bg h-100">
      <div class="container h-100">
        <div class="row justify-content-center h-100">
          <div class="col-xl-6">
            <div class="error-content">
              <div class="card mb-0">
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
import Preloader from '../components/Preloader'

export default {
  name: 'error-layout',
  components: { Preloader }
}
</script>
