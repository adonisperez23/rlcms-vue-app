<template >
  <v-card color="#f3d595" height="290" max-height="400">
    <v-card-item class="pb-0 pt-1 px-1">
      <v-img
        class="borde-imagen"
        width="300"
        height="200"
        aspect-ratio="16/9"
        cover
        :src="srcFoto"
      ></v-img>
    </v-card-item>
    <v-card-text class="pb-2 px-1 text-center">
        <h6>{{nombreFoto}}</h6>
    </v-card-text>
    <div class="text-center">
      <v-btn size="x-small" class="mt-0 " variant="outlined" color="red" append-icon="mdi-eraser" @click="propsAvisoEliminar.activarAviso = true">Borrar Imagen</v-btn>
    </div>


  </v-card>
  <Aviso
    dosAcciones
    :dialog="propsAvisoEliminar.activarAviso"
    :mensaje="propsAvisoEliminar.mensaje"
    @accion-si="borrarImagen"
    @accion-no="propsAvisoEliminar.activarAviso = false"
  >
    <template v-slot:imagen>
      <v-container>
        <v-row justify="center">
          <v-col cols="9">
            <v-img
            class="borde-imagen"
            width="350"
            aspect-ratio="16/9"
            cover
            :src="srcFoto"
            ></v-img>
          </v-col>
        </v-row>
        {{nombreFoto}}
      </v-container>

    </template>
  </Aviso>
  <Aviso
    unaAccion
    :dialog="propsAviso.activarAviso"
    :mensaje="propsAviso.mensaje"
    @activar-aviso="propsAviso.activarAviso = false; emit('foto-eliminada')"
  >
    <template v-slot:icon>
      <v-icon
      color="green"
      size="100"
      >
      mdi-book-check
     </v-icon>
    </template>
  </Aviso>
</template>

<script setup lang="ts">
import {ref,reactive} from 'vue'
import axios from 'axios'
import Aviso from './Aviso.vue'
import type {AxiosError,AxiosResponse} from 'axios'
import type {Modal} from '../types/interfaces'

const emit = defineEmits<{
  (e:'foto-eliminada'):void
}>()

const props = defineProps<{
  idFoto?:number,
  srcFoto:string,
  nombreFoto:string
}>()

const propsAvisoEliminar = reactive<Modal>({
  activarAviso:false,
  mensaje:'Estas seguro que quieres eliminar esta foto de la galeria?'
})

const propsAviso = reactive<Modal>({
  activarAviso:false,
  mensaje:""
})

function borrarImagen():void {
  axios.delete(import.meta.env.VITE_API_BORRAR_FOTO+props.idFoto,{headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } })
    .then((res:AxiosResponse)=>{
      // console.log("foto eliminada con exito",res)
      propsAviso.activarAviso = true
      propsAvisoEliminar.activarAviso = false
      propsAviso.mensaje = res.data.mensaje
    })
    .catch((err:unknown)=>{
      if(axios.isAxiosError(err)){
        // console.log("error al borrar foto",err)
        propsAviso.activarAviso = true
        propsAviso.mensaje = err.response?.data.error
      }
    })
}

</script>

<style lang="css" scoped>
</style>
