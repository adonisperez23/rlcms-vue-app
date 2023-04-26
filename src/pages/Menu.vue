<template>
  <v-container>
    <v-row v-if="cargandoLista" justify="center" class="">
      <v-col cols="2" class="">
        <v-progress-circular
        size="128"
        indeterminate
        color="primary"
        ></v-progress-circular>
        <h3>Cargando Menu...</h3>
      </v-col>
    </v-row>
    <v-row justify="start" >

      <div v-if="listaVacia" class="text-h2">
        No hay menu publicado por los momentos...
      </div>
      <div v-if="errorDeCarga" class="text-h2">
        Ha ocurrido un error al cargar lista de menu...
        <br>
        Posibles problemas con el servidor!
      </div>

        <InfoMenu
        v-else
        v-for="(producto,index) in listaMenu"
        :key="producto.id"
        v-bind="producto"/>

    </v-row>

  </v-container>
</template>

<script setup lang="ts">
import InfoMenu from "../components/menu/InfoMenu.vue"
import { ref , reactive , onMounted, provide } from 'vue'
import axios,{AxiosError} from 'axios'
import {Respuesta,Producto} from "../types/interfaces"
// import listaProductos from '../assets/productos.json'

// const listaMenu = listaProductos.filter(producto => producto.categoria === "Almuerzo" || producto.categoria === "Raciones")

const listaMenu = ref<Producto[]>([])
const cargandoLista =ref<boolean>(false)
const listaVacia = ref<boolean>(false)
const errorDeCarga = ref<boolean>(false)

ObtenerMenu()

provide('listaProductos', listaMenu)

function ObtenerMenu():void {
  axios.get(import.meta.env.VITE_API_LISTA_DE_PRODUCTOS)
  .then((res:Respuesta)=>{
    cargandoLista.value = true
    setTimeout(() => {
      listaMenu.value = res.data
      estaListaVacia(listaMenu.value)
      cargandoLista.value = false
    }, 2000);
    console.log("lista Productos", res.data,listaMenu.value)
  })
  .catch((err:AxiosError)=>{
    errorDeCarga.value = true
    console.log("error",err.response.data.error)
  })
}

function estaListaVacia(lista:Producto[]) {
  if(lista.length > 0) return listaVacia.value=false
  return listaVacia.value=true
}

</script>

<style scoped>
</style>
