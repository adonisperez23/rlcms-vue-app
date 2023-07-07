<template>
  <v-row justify="center">
    <v-col :cols="colsAlert" class="text-center">
      <v-progress-circular color="green" indeterminate :size="128">{{mensajeBarra}}</v-progress-circular>
      <v-alert
      v-if="!noMostrarAlert"
      class="text-center"
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
import {inject, computed} from "vue"
import type {Ref} from "vue"

const isMobile = inject("isMobile") as Ref

const colsAlert = computed<number>(()=>{
  if(isMobile.value){
    return 8
  } else {
    return 4
  }
})


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
