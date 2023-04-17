<template>
  <v-container>
    <v-row>
      <v-col v-if="listaFotos.length > 0" v-for="foto in listaFotos" :key="foto.id" cols="3">
        <FotoProducto
          :idFoto="foto.id"
          :srcFoto="foto.direccionUrl"
          :nombreFoto="foto.nombreFoto"
          @foto-eliminada="ObtenerListaFotos"
        />
      </v-col>
      <v-col v-else cols="12">
        <h3>No hay fotos agregadas por los momentos...</h3>
      </v-col>
    </v-row>
  </v-container>
</template>
<!-- <></> -->

<script setup lang="ts">
import FotoProducto from '../../components/FotoProducto.vue'
import {ref} from 'vue'
import axios,{AxiosError} from 'axios'
import {Respesta,Foto} from '../../types/interfaces'

const listaFotos = ref<Foto[]>([])

ObtenerListaFotos()

function ObtenerListaFotos() {
  axios.get(import.meta.env.VITE_API_LISTA_DE_FOTOS)
  .then((res:Respuesta)=>{
    console.log('lista fotos', res)
    listaFotos.value = res.data
  })
  .catch((err:AxiosError)=>{
    console.log('error al cargar lista fotos',err)
  })

}


</script>

<style scoped>
</style>
