<template>
  <v-carousel show-arrows="hover" height="200">
    <template v-for="(foto,index) in listaFotos" :key="index">
      <v-carousel-item v-if="foto.producto[0].nombreProducto === nombreProducto">
          <v-img
           width="300"
           aspect-ratio="16/9"
           cover
           :src="foto.direccionUrl"
          ></v-img>
      </v-carousel-item>
    </template>
  </v-carousel>
</template>

<script setup lang="ts">
import axios,{AxiosError} from "axios"
import {Respuesta} from "../../types/interfaces"
import {ref,onMounted} from "vue"
import listaFotos from '../../assets/fotos.json'

const props = withDefaults(defineProps<{
  nombreProducto:string
}>(), {
  nombreProducto:"Almuerzo"
})



onMounted(()=>{
  // axios.get(import.meta.env.VITE_API_LISTA_DE_FOTOS)
  //   .then((res:Respuesta)=>{
  //     listaFotos.value = res.data
  //     console.log("fotos",res.data)
  //   })

})



</script>

<style scoped>
</style>
