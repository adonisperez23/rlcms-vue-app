<template>
  <v-row justify="center">
    <v-col cols="4" class="text-center">
      <v-progress-circular color="green" indeterminate :size="128">{{mensajeBarra}}</v-progress-circular>
      <v-alert
      v-if="!noMostrarAlert"
      class="text-left"
      v-show="mostrarAlert"
      :color="colorAlert"
      :icon="iconoAlert"
      :text="mensajeAlert"
      ></v-alert>
      <h3 v-else>{{mensaje}}</h3>
    </v-col>
  </v-row>
</template>

<script setup lang="ts">


const props = defineProps<{
  mensajeBarra:string,
  mostrarAlert?:boolean,
  colorAlert?:string,
  iconoAlert?:string,
  mensajeAlert?:string,
  noMostrarAlert?:boolean,
  mensaje?:string,

}>()

</script>

<style scoped>
</style>
