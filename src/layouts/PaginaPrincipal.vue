<template>
  <header>

  </header>
  <body>
    <div class="">
      <h1>Pagina Principal</h1>
      <router-link to="/signin">Registrar Usuario</router-link>
      <router-link to="/login">Autenticar usuario</router-link>
      <router-link to="/menu">Menu</router-link>

      <router-view/>
    </div>
  </body>
  <footer>
  </footer>
</template>

<script setup>

</script>

<style scoped>
</style>
