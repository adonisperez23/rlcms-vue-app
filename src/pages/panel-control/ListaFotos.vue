<template>
  <v-container>
    <v-row v-if="cargandoLista" justify="center" class="">
      <v-col cols="2" class="">
        <v-progress-circular
        size="128"
        indeterminate
        color="primary"
        ></v-progress-circular>
        <h3>Cargando galeria de fotos de productos...</h3>
      </v-col>
    </v-row>
    <v-row v-else>
      <v-col v-if="listaVacia" cols="12">
        <h3>No hay fotos agregadas por los momentos...</h3>
      </v-col>
      <v-col v-else-if="errorDeCarga" cols="12">
        <h3>Ha ocurrido un error al cargar fotos desde el servidor!</h3>
      </v-col>
      <v-col v-else v-for="foto in listaFotos" :key="foto.id" cols="3">
        <FotoProducto
        :idFoto="foto.id"
        :srcFoto="foto.direccionUrl"
        :nombreFoto="foto.nombreFoto"
        @foto-eliminada="ObtenerListaFotos"
        />
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
const cargandoLista =ref<boolean>(false)
const listaVacia = ref<boolean>(false)
const errorDeCarga = ref<boolean>(false)

ObtenerListaFotos()

function ObtenerListaFotos() {
  axios.get(import.meta.env.VITE_API_LISTA_DE_FOTOS)
  .then((res:Respuesta)=>{
    console.log('lista fotos', res)
    cargandoLista.value = true
    setTimeout(() => {
      cargandoLista.value = false
      listaFotos.value = res.data
      estaListaVacia(listaFotos.value)
    }, 2000);
  })
  .catch((err:AxiosError)=>{
    console.log('error al cargar lista fotos',err)
    errorDeCarga.value = true
  })

}
function estaListaVacia(lista:Foto[]) {
  if(lista.length > 0) return listaVacia.value=false
  return listaVacia.value=true
}

</script>

<style scoped>
</style>
