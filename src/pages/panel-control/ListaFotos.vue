<template>
  <v-container>
    <BarraProgresoAviso
      v-if="cargandoLista"
      mensajeBarra="Cargando . . ."
      mensaje="Mostrando galeria de fotos de productos ..."
      noMostrarAlert
    />
    <v-row v-else>
      <v-col align="center" v-if="listaVacia" cols="12">
        <v-sheet color="#f9cf57" rounded>
          <h1>No hay fotos agregadas por los momentos...</h1>
          <v-icon
          color="red"
          size="100"
          >
          mdi-server-image-album
         </v-icon>
        </v-sheet>
      </v-col>
      <v-col align="center" v-else-if="errorDeCarga" cols="12">
        <v-sheet color="#f9cf57" rounded>
          <h1>¡Ha ocurrido un error al cargar fotos desde servidor!</h1>
          <v-icon
          color="red"
          size="100"
          >
          mdi-server-network-off
        </v-icon>
        </v-sheet>
      </v-col>
      <v-col v-else v-for="foto in listaFotos" :key="foto.id" :cols="colsFoto">
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
import {ref,inject,computed} from 'vue'
import type {Ref} from 'vue'
import axios from 'axios'
import BarraProgresoAviso from '../../components/BarraProgresoAviso.vue'
import type {AxiosError,AxiosResponse} from 'axios'
import type {Foto} from '../../types/interfaces'

const isMobile = inject("isMobile") as Ref
const listaFotos = ref<Foto[]>([])
const cargandoLista =ref<boolean>(false)
const listaVacia = ref<boolean>(false)
const errorDeCarga = ref<boolean>(false)

const colsFoto = computed<number>(()=>{
  if(isMobile.value){
    return 6
  } else {
    return 3
  }
})

ObtenerListaFotos()

function ObtenerListaFotos() {
  axios.get(import.meta.env.VITE_API_LISTA_DE_FOTOS)
  .then((res:AxiosResponse)=>{
    // console.log('lista fotos', res)
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
