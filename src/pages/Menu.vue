<template>
  <v-container>
    <v-row justify="start" >
      <InfoMenu v-for="n in 10"/>
    </v-row>
  </v-container>
</template>

<script setup>
  import InfoMenu from "../components/menu/InfoMenu.vue"
</script>

<style lang="css" scoped>
</style>
