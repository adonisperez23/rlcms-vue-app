<template>
  <v-container>
    <v-row justify="start" >

      <InfoMenu
        v-for="(producto,index) in listaProductos"
        :key="producto.id"
        v-bind="producto" />
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
  import InfoMenu from "../components/menu/InfoMenu.vue"
  import { ref , reactive , onMounted } from 'vue'
  import axios,{AxiosError} from 'axios'
  import {Respuesta} from "../types/interfaces"
  import FotoMenu from './FotoMenu.vue'
  import listaProductos from '../assets/productos.json'


  onMounted(()=>{
    // axios.get(import.meta.env.VITE_API_LISTA_DE_PRODUCTOS)
    //   .then((res:Respuesta)=>{
    //       listaProductos.value = res.data
    //       console.log("lista Productos", res.data,listaProductos.value)
    //   })
    //   .catch((err:AxiosError)=>{
    //     console.log("error",err.response.data.error)
    //   })
  })

</script>

<style scoped>
</style>
