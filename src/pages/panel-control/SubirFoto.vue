<template>
  <v-container>
    <BarraProgresoAviso
    v-if="alert.mostrarAlert"
    mostrarAlert
    mensajeBarra="Cargando..."
    :colorAlert="alert.color"
    :iconoAlert="alert.icon"
    :mensajeAlert="alert.mensaje"
    />
    <v-row v-else justify="center">
      <v-col cols="4">
        <div v-show="mostrarFormulario" class="text-center">
          Cargar Imagen adjunta
          <v-text-field readonly label="Nombre del producto" v-model="route.query.nombreProducto"></v-text-field>
          <v-file-input v-model="imagen" label="Cargar Imagen"></v-file-input>
          <v-btn prepend-icon="mdi-upload" color="green" :disabled=" typeof imagen === 'undefined'" @click="subirFoto">Subir foto</v-btn>
        </div>
        <div v-show="mostrarInfoFoto" class="text-center">
          <v-text-field readonly label="Nombre del producto" v-model="route.query.nombreProducto"></v-text-field>
          <v-text-field readonly label="Nombre del archivo imagen" v-model="infoFoto.nombreFoto"></v-text-field>
          <v-text-field readonly label="Ruta del archivo imagen" v-model="infoFoto.direccionUrl"></v-text-field>
          <v-btn prepend-icon="mdi-upload" color="green" @click="guardarInfoFoto">Guardar informacion de imagen</v-btn>
          <v-btn prepend-icon="mdi-image-album" color="blue" @click="nuevaFoto">Buscar nueva foto</v-btn>
        </div>
      </v-col>
    </v-row>
    <h3>Nota:</h3>
    <p>Antes de cargar una imagen, verifique primero que el nombre del archivo solo contenga caracteres.
     La carga de la imagen no permite emoticones en su nombre.
   </p>
  </v-container>
</template>

<script setup lang="ts">
import {ref,reactive} from 'vue'
import {useRoute,useRouter} from 'vue-router'
import {useEstadoAlerta} from '../../stores/estadoAlerta'
import {Respuesta,Foto} from '../../types/interfaces'
import axios,{AxiosError} from 'axios'
import BarraProgresoAviso from '../../components/BarraProgresoAviso.vue'

const alert = useEstadoAlerta()
const route = useRoute()
const router = useRouter()

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
      infoFoto.nombreFoto = res.data.nombreArchivo
      infoFoto.direccionUrl = res.data.path
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
function guardarInfoFoto():void {
  axios.post(import.meta.env.VITE_API_GUARDAR_INFO_FOTO,infoFoto)
    .then((res:Respuesta)=>{
      console.log('res',res)
      mostrarInfoFoto.value = false
      alert.gestionarRespuesta(res)
      setTimeout(() => {
        router.push({name:'Lista de fotos'})
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

function nuevaFoto():void {
  mostrarFormulario.value = true
  mostrarInfoFoto.value = false
  infoFoto.nombreFoto = ''
  infoFoto.direccionUrl = ''
}
</script>

<style scoped>
</style>
