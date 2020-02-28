<template>
  <div class="card-body text-center">
    <h1 class="error-text text-primary">400</h1>
    <h4 class="mt-4"><i class="fa fa-thumbs-down text-danger"></i> Bad Request</h4>
    <p>Your Request resulted in an error.</p>
    <form class="mt-5 mb-5">
      <div class="text-center mb-4 mt-4">
        <router-link to="/register" class="btn btn-primary">Go to Register</router-link>
      </div>
    </form>
    <div class="text-center">
      <p>Copyright © Designed by <a href="https://themeforest.net/user/digitalheaps">Digitalheaps</a>, Developed by <a href="https://themeforest.net/user/quixlab">Quixlab</a> 2018</p>
      <ul class="list-inline">
        <li class="list-inline-item">
          <a href="" target="_blank" class="btn btn-facebook"><i class="fa fa-facebook"></i>
          </a>
        </li>
        <li class="list-inline-item">
          <a href="" target="_blank" class="btn btn-twitter"><i class="fa fa-twitter"></i>
        </a>
        </li>
        <li class="list-inline-item">
          <a href="" target="_blank" class="btn btn-linkedin"><i class="fa fa-linkedin"></i>
        </a>
        </li>
        <li class="list-inline-item">
          <a href="" target="_blank" class="btn btn-google-plus"><i class="fa fa-google-plus"></i>
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: '400'
}
</script>
