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
      <v-col cols="12">
        <v-sheet width="300" class="mx-auto">
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
            <v-btn prepend-icon="mdi-upload" color="green" block  @click="guardarInfoFoto">Guardar informacion de imagen</v-btn>
            <v-btn prepend-icon="mdi-image-album" color="blue" block  @click="nuevaFoto">Buscar nueva foto</v-btn>
            <h3 class="text-center">Instrucciones de uso:</h3>
            <p>1) Adjuntar imagen </p>
            <p>2) Subir imagen al servidor </p>
            <p>3) Guardar informacion de la imagen en la base de datos. Si no se guarda la informacion no se podra visualizar la imagen en el sistema. </p>
            <h3 class="text-center">Nota:</h3>
            <p>Antes de cargar una imagen, verifique primero que el nombre del archivo solo contenga caracteres.
              La carga de la imagen no permite emoticones en su nombre.
            </p>
          </div>
        </v-sheet>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import {ref,reactive} from 'vue'
import {useRoute,useRouter} from 'vue-router'
import {useEstadoAlerta} from '../../stores/estadoAlerta'
import axios from 'axios'
import BarraProgresoAviso from '../../components/BarraProgresoAviso.vue'
import type {Foto} from '../../types/interfaces'
import type {AxiosError,AxiosResponse} from 'axios'

const alert = useEstadoAlerta()
const route = useRoute()
const router = useRouter()

const imagen = ref<File[]>()
const infoFoto = reactive<Foto>({
  nombreFoto:'',
  direccionUrl:'',
  id:Number(route.query.id)
})

const mostrarFormulario = ref<boolean>(true)
const mostrarInfoFoto = ref<boolean>(false)

function subirFoto():void {
  let data = new FormData()
  if(imagen.value !== undefined){
    data.append('foto',imagen.value[0])
  }
  axios.post(import.meta.env.VITE_API_SUBIR_FOTO, data, {headers:{'Content-type':'multipart/form-data',Authorization: `Bearer ${localStorage.getItem('token')}`}})
    .then((res:AxiosResponse)=>{
      // console.log('res',res)
      mostrarFormulario.value = false
      alert.gestionarRespuesta(res)
      infoFoto.nombreFoto = res.data.nombreArchivo
      infoFoto.direccionUrl = res.data.path
      setTimeout(() => {
        guardarInfoFoto()
        // mostrarInfoFoto.value = true // muestra el formulario de datos de imagen para guardar en la base de datos
      }, 3000);

    })
    .catch((err:AxiosError)=>{
      // console.log('err',err)
      mostrarFormulario.value = false
      alert.gestionarError(err)
      setTimeout(() => {
        mostrarFormulario.value = true
      }, 3000);
    })

}
function guardarInfoFoto():void {
  axios.post(import.meta.env.VITE_API_GUARDAR_INFO_FOTO,infoFoto,{headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } })
    .then((res:AxiosResponse)=>{
      // console.log('res',res)
      mostrarInfoFoto.value = false
      alert.gestionarRespuesta(res)
      setTimeout(() => {
        router.push({name:'Lista de fotos'})
      }, 3000);
    })
    .catch((err:AxiosError)=>{
      // console.log('err',err)
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
