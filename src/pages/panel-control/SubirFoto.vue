<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="4">
        <v-progress-circular class="ml-16 mb-2 " v-show="alert.mostrarAlert" indeterminate :size="117">Cargando...</v-progress-circular>
        <v-alert
        v-show="alert.mostrarAlert"
        :color="alert.color"
        :icon="alert.icon"
        :text="alert.mensaje"
        ></v-alert>
        <div v-show="mostrarFormulario" class="text-h5">
        Cargar Imagen adjunta
          <v-text-field readonly label="Nombre del producto" v-model="route.query.nombreProducto"></v-text-field>
          <v-file-input v-model="imagen" label="Cargar Imagen"></v-file-input>
        </div>
        <div v-show="mostrarInfoFoto" class="">
          <v-text-field readonly label="Nombre del producto" v-model="route.query.nombreProducto"></v-text-field>
          <v-text-field readonly label="Nombre del archivo imagen" v-model="infoFoto.nombreFoto"></v-text-field>
          <v-text-field readonly label="Ruta del archivo imagen" v-model="infoFoto.direccionUrl"></v-text-field>
          <v-btn @click="guardarInfoFoto">Guardar informacion de imagen</v-btn>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import {ref,reactive} from 'vue'
import {useRoute,useRouter} from 'vue-router'
import {useEstadoAlerta} from '../../stores/estadoAlerta'
import {Respuesta,Foto} from '../../types/interfaces'
import axios,{AxiosError} from 'axios'

const alert = useEstadoAlerta()
const route = useRoute()

const imagen = ref<undefined>()
const infoFoto = reactive<Foto>({
  nombreFoto:'',
  direccionUrl:'',
  producto:Number(route.query.id)
})

const mostrarFormulario = ref<boolean>(true)
const mostrarInfoFoto = ref<boolean>(false)

function subirFoto():void {
  let data = new FormData()
  data.append('foto',imagen.value[0])
  axios.post(import.meta.env.VITE_API_SUBIR_FOTO, data, {headers:{'Content-type':'multipart/form-data'}})
    .then((res:Respuesta)=>{
      console.log('res',res)
      mostrarFormulario.value = false
      alert.gestionarRespuesta(res)
      infoFoto.nombreFoto = res.data.nombreFoto
      infoFoto.direccionUrl = res.data.direccionUrl
      setTimeout(() => {
        mostrarInfoFoto.value = true
      }, 3000);

    })
    .catch((err:AxiosError)=>{
      console.log('err',err)
      mostrarFormulario.value = false
      alert.gestionarError(err)
      setTimeout(() => {
        mostrarFormulario.value = true
      }, 3000);
    })

}
function guardarInfoFoto() {
  axios.post(import.meta.env.VITE_API_GUARDAR_INFO_FOTO,infoFoto)
    .then((res:Respuesta)=>{
      console.log('res',res)
      mostrarInfoFoto.value = false
      alert.gestionarRespuesta(res)
      setTimeout(() => {
        router.push({name:'Subir Foto'})
      }, 3000);
    })
    .catch((err:AxiosError)=>{
      console.log('err',err)
      mostrarInfoFoto.value = false
      alert.gestionarError(err)
      setTimeout(() => {
        mostrarInfoFoto.value = true
      }, 3000);
    })
}
</script>

<style scoped>
</style>
