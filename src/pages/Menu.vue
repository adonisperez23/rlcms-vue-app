<template>
  <v-container>
    <BarraProgresoAviso
      v-if="cargandoLista"
      mensajeBarra="Cargando . . ."
      mensaje="Mostrando Menu ..."
      noMostrarAlert
    />
    <v-row  v-if="listaVacia" justify="center" >
      <v-sheet color="#f9cf57" rounded>
        <h1 >
          No hay menu publicado por los momentos...
        </h1>
      </v-sheet>
      <v-col align="center" cols="6">
        <v-icon
        color="red"
        size="100"
        >
        mdi-server-food-variant-off
      </v-icon>
    </v-col>
    </v-row>
    <v-row v-if="errorDeCarga" justify="center">
      <v-sheet color="#f9cf57" rounded>
        <h1 >
          Ha ocurrido un error al cargar lista de menu...
          <br>
          ¡Posibles problemas con el servidor!
          <br>
          Lo sentimos...
          <br>
        </h1>
      </v-sheet>
      <v-col align="center" cols="6">
        <v-icon
        color="red"
        size="100"
        >
        mdi-server-network-off
      </v-icon>
    </v-col>
    </v-row>
    <v-row v-else justify="start">
      <InfoMenu
      v-for="(producto,index) in listaMenuFiltrada"
      :key="producto.id"
      v-bind="producto"/>
    </v-row>

  </v-container>
</template>

<script setup lang="ts">
import InfoMenu from "../components/menu/InfoMenu.vue"
import { ref , reactive , onMounted, provide } from 'vue'
import axios from 'axios'
import type {AxiosError,AxiosResponse} from 'axios'
import type {Producto} from "../types/interfaces"
import BarraProgresoAviso from '../components/BarraProgresoAviso.vue'
// import listaProductos from '../assets/productos.json'


let listaMenu = ref<Producto[]>([]) // Variable que almacena todos los productos de la base de datos
const cargandoLista =ref<boolean>(true) //Variable que activa la BarraProgresoAviso cuando se hace la llamada a la api
const listaVacia = ref<boolean>(false) // Controla el escrito cuando la lista de productos esta vacia o hay algun error en la llamada
const errorDeCarga = ref<boolean>(false)
let listaMenuFiltrada = reactive<Producto[]>([])  //Variable que almacena solo los productos con categoria Almuerzo y Raciones
// const listaFiltrada = listaMenu.value.filter(producto => producto.categoria === "Almuerzo" || producto.categoria === "Raciones")

ObtenerMenu()

provide('listaMenu', listaMenu) // provee a todos los componentes hijos de la lista de productos luego de realizar la llamada a la api


function ObtenerMenu():void {
  axios.get(import.meta.env.VITE_API_LISTA_DE_PRODUCTOS)
  .then((res:AxiosResponse)=>{
    setTimeout(() => {
      listaMenu.value = res.data
      listaMenuFiltrada = listaMenu.value.filter(producto => (producto.categoria === "Almuerzo" || producto.categoria === "Raciones") && producto.disponible === true)
      estaListaVacia(listaMenu.value)
      cargandoLista.value = false
    }, 2000);
    // console.log("lista Productos", res.data.listaMenu)
  })
  .catch((err:AxiosError)=>{
    setTimeout(() => {
      cargandoLista.value = false
      errorDeCarga.value = true
    }, 2000);
    // console.log("error",err.response.data.error)
  })
}

function estaListaVacia(lista:Producto[]) {
  if(lista.length > 0) return listaVacia.value=false
  return listaVacia.value=true
}

</script>

<style scoped>
</style>
