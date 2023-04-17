<template >
  <v-card>
    <v-card-item>
      <v-img
        :width="300"
        aspect-ratio="16/9"
        cover
        :src="srcFoto"
      ></v-img>
    </v-card-item>
    <v-card-text>
      {{nombreFoto}}
    </v-card-text>
    <v-card-actions>
      <v-btn @click="propsAvisoEliminar.activarAviso = true">Borrar Imagen</v-btn>
    </v-card-actions>

  </v-card>
  <Aviso
    dosAcciones
    :dialog="propsAvisoEliminar.activarAviso"
    :mensaje="propsAvisoEliminar.mensaje"
    @accion-si="borrarImagen"
    @accion-no="propsAvisoEliminar.activarAviso = false"
  >
    <template v-slot:imagen>
      <v-img
      :width="300"
      aspect-ratio="16/9"
      cover
      :src="srcFoto"
      ></v-img>
      {{nombreFoto}}
    </template>
  </Aviso>
  <Aviso
    unaAccion
    :dialog="propsAviso.activarAviso"
    :mensaje="propsAviso.mensaje"
    @activar-aviso="propsAviso.activarAviso = false; emit('foto-eliminada')"
  />
</template>

<script setup lang="ts">
import {ref,reactive} from 'vue'
import axios,{AxiosError} from 'axios'
import Aviso from './Aviso.vue'
import {Modal,Resultado} from '../types/interfaces'

const emit = defineEmits<{
  (e:'foto-eliminada'):void
}>()

const props = defineProps<{
  idFoto:number,
  srcFoto:string,
  nombreFoto:string
}>()

const propsAvisoEliminar = reactive<Modal>({
  activarAviso:false,
  mensaje:'Estas seguro que quieres eliminar esta Foto de la galeria?'
})

const propsAviso = reactive<Modal>({
  activarAviso:false,
  mensaje:""
})

function borrarImagen():void {
  axios.delete(import.meta.env.VITE_API_BORRAR_FOTO+props.idFoto)
    .then((res:Resultado)=>{
      console.log("foto eliminada con exito",res)
      propsAviso.activarAviso = true
      propsAvisoEliminar.activarAviso = false
      propsAviso.mensaje = res.data.mensaje
    })
    .catch((err:AxiosError)=>{
      console.log("error al borrar foto",err)
      propsAviso.activarAviso = true
      propsAviso.mensaje = err.response.data.error
    })
}

</script>

<style lang="css" scoped>
</style>
