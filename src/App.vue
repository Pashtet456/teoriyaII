<template>
  <v-app>
    <v-app-bar
      app
      class="d-flex justify-center"
    >

    <div class="nav">
      <router-link to="/" class="pr-2">Главная</router-link>
      <router-link to="/lab1">Лаба 1</router-link>
    </div>

    </v-app-bar>

    <v-main class="main mt-10">
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>

export default {
  name: 'App',

  data: () => ({
  })
}
</script>

<style scoped>

.main {
  margin: auto;
  width: 1000px;
}

</style>
