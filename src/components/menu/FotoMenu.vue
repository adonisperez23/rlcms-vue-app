<template>
  <div v-if="listaFotosFiltradas.length > 1" class="">
    <v-carousel cycle hide-delimiters show-arrows="hover" height="200">
      <div v-for="foto in listaFotosFiltradas" :key="foto.id" class="">
        <v-carousel-item >
          <v-img
          width="300"
          height="200"
          aspect-ratio="16/9"
          cover
          :src="foto.direccionUrl"
          ></v-img>
        </v-carousel-item>
      </div>
    </v-carousel>
  </div>
  <div v-else-if="listaFotosFiltradas.length === 1" class="">
    <v-img
    width="300"
    height="200"
    aspect-ratio="16/9"
    cover
    :src="listaFotosFiltradas[0].direccionUrl"
    ></v-img>
  </div>
  <v-img
  v-else
  width="300"
  height="200"
  aspect-ratio="16/9"
  cover
  src="/fotos/cochino-contodo.jpg"
  >
  </v-img>
</template>

<script setup lang="ts">
import axios,{AxiosError} from "axios"
import {Respuesta,Foto} from "../../types/interfaces"
import {ref, onMounted} from "vue"
// import listaFotos from '../../assets/fotos.json'

const listaFotos = ref<Foto[]>([])
const listaFotosFiltradas = ref<Foto[]>([])

const props = withDefaults(defineProps<{
  nombreProducto:string
}>(), {
  nombreProducto:"Almuerzo"
})


ObtenerFotos()


function ObtenerFotos(params:type) {
  axios.get(import.meta.env.VITE_API_LISTA_DE_FOTOS)
    .then((res:Respuesta)=>{
      listaFotos.value = res.data
      listaFotosFiltradas.value = listaFotos.value.filter(foto=>foto.producto.nombreProducto == props.nombreProducto)
      console.log("fotos",res.data)
    })
    .catch((err:AxiosError)=>{
      console.log("error foto",err.response.data.error)
    })

}






</script>

<style scoped>
</style>
