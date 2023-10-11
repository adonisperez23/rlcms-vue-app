<template>
  <div v-if="listaFotosFiltradas.length > 1" class="">
    <v-carousel cycle hide-delimiters show-arrows="hover" height="300">
      <div v-for="foto in listaFotosFiltradas" :key="foto.id" class="">
        <v-carousel-item >
          <v-img
          class="borde-imagen"
          width="400"
          height="300"
          aspect-ratio="16/9"
          cover
          :src="foto.direccionUrl"
          >
          </v-img>
        </v-carousel-item>
      </div>
    </v-carousel>
  </div>
  <div v-else-if="listaFotosFiltradas.length === 1" class="">
    <v-img
    class="borde-imagen"
    width="400"
    height="300"
    aspect-ratio="16/9"
    cover
    :src="listaFotosFiltradas[0].direccionUrl"
    ></v-img>
  </div>
  <v-img
    v-else
    class="borde-imagen"
    width="400"
    height="300"
    aspect-ratio="16/9"
    cover
    src="/fotos/pabellon.jpg"
  >
  </v-img>
</template>

<script setup lang="ts">
import axios from 'axios'
import {ref, onMounted} from "vue"
import type {AxiosError,AxiosResponse} from 'axios'
import type {Foto} from "../../types/interfaces"
// import listaFotos from '../../assets/fotos.json'

const listaFotos = ref<Foto[]>([])
const listaFotosFiltradas = ref<Foto[]>([])

const props = withDefaults(defineProps<{
  nombreProducto:string
}>(), {
  nombreProducto:"Almuerzo"
})


ObtenerFotos()


function ObtenerFotos() {
  axios.get(import.meta.env.VITE_API_LISTA_DE_FOTOS)
    .then((res:AxiosResponse)=>{
      listaFotos.value = res.data
      listaFotosFiltradas.value = listaFotos.value.filter(foto=>foto.producto?.nombreProducto == props.nombreProducto)
      console.log("fotos",res.data)
    })
    .catch((err:AxiosError)=>{
      console.log("error foto",err)
    })

}






</script>

<style scoped>
</style>
