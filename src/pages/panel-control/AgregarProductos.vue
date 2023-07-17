<template>
  <v-container>
    <BarraProgresoAviso
    v-show="!mostrarFormulario"
    mensajeBarra="Cargando..."
    mostrarAlert
    :colorAlert="alert.color"
    :iconoAlert="alert.icon"
    :mensajeAlert="alert.mensaje"
    />
    <v-sheet width="300" color="#fcecd2"  class="mx-auto">
    <v-form v-show="mostrarFormulario" fast-fail @submit.prevent="registrarProducto">
      <v-text-field
        v-model="producto.nombreProducto"
        :rules="validateProducto"
        label="Nombre del producto"
      ></v-text-field>

      <v-select
        v-model="producto.categoria"
        label="Categoria"
        :items="['Almuerzo','Contorno','Racion']"
      ></v-select>
      <v-text-field
        v-model="producto.descripcion"
        label="Descripcion del producto"
      ></v-text-field>
      <v-text-field
        v-model.number="producto.precio"
        label="Precio"
        type="number"
        :rules="validatePrecio"
      ></v-text-field>
      <v-checkbox v-model="producto.disponible" label="Producto disponible?"></v-checkbox>
      <v-btn color="yellow" prepend-icon="mdi-file-document-edit-outline" v-if="route.query.id" @click="actualizarProducto" block class="mt-2">Editar Producto</v-btn>
      <v-btn color="green" prepend-icon="mdi-content-save-move" v-else-if="producto.nombreProducto.length > 0" type="submit" block class="mt-2">Guardar Producto</v-btn>
      <v-btn color="red" prepend-icon="mdi-eraser" v-show="producto.nombreProducto.length > 0" @click="nuevoProducto" block class="mt-2">Nuevo Producto</v-btn>
      <v-btn color="blue" prepend-icon="mdi-view-list" class="mt-2" :to="{name:'Lista de productos'}" block >Ver lista de productos</v-btn>
    </v-form>
  </v-sheet>
  </v-container>
</template>

<script setup lang="ts">
import {ref,reactive} from 'vue'
import {useRoute,useRouter} from 'vue-router'
import axios from 'axios'
import {useEstadoAlerta} from '../../stores/estadoAlerta'
import BarraProgresoAviso from "../../components/BarraProgresoAviso.vue"
import type {Producto} from '../../types/interfaces'
import type {AxiosError,AxiosResponse} from 'axios'

const route = useRoute()
const router = useRouter()

// console.log("ruta", route.query)


const producto = reactive<Producto>({
  nombreProducto:'',
  categoria:'',
  descripcion:'',
  precio:0,
  disponible:false
})

if(route.query.id){
  if(route.query.nombreProducto !== null && route.query.categoria !== null &&  route.query.descripcion !== null){
    producto.nombreProducto = route.query.nombreProducto.toString()
    producto.categoria = route.query.categoria.toString()
    producto.descripcion = route.query.descripcion.toString()
  }
  producto.precio = Number(route.query.precio)
  producto.disponible = (route.query.disponible === 'true')
}

const mostrarFormulario = ref<boolean>(true)
const alert = useEstadoAlerta()

function nuevoProducto():void {
  producto.nombreProducto = ''
  producto.categoria = ''
  producto.descripcion = ''
  producto.precio = 0
  producto.disponible = false

  router.push("/operaciones-productos")
}

const validatePrecio = [ (value:number) => {
  if(value <=15) return true

  return "Valor del producto muy alto"
},
(value:number) => {
  if(value >=0) return true

  return "Valor del producto no puede ser negativo"
},
(value:number) => {
  let decimal = (value + "").split(".")[1];
  // console.log(decimal.length); // Output: 4
  if(decimal.length <=2) return true

  return "Valor del producto no puede tener mas de dos decimales"
}]

const validateProducto = [ (value:string) => {
  if(value.length > 0) return true

  return "Debe ingresar un nombre para el producto"
}]

function registrarProducto():void {
  axios.post(import.meta.env.VITE_API_REGISTRAR_PRODUCTO, producto,{headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } })
    .then((res:AxiosResponse)=>{
      mostrarFormulario.value = false
      alert.gestionarRespuesta(res)
      setTimeout(() => {
        mostrarFormulario.value = true
      }, 3000)
    })
    .catch((err:AxiosError)=>{
      // console.log("error",err,producto)
      mostrarFormulario.value = false
      alert.gestionarError(err)
      setTimeout(() => {
        mostrarFormulario.value = true
      }, 3000);
    })
}

function actualizarProducto():void {
  axios.put(import.meta.env.VITE_API_ACTUALIZAR_PRODUCTO+route.query.id, producto,{headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } })
    .then((res:AxiosResponse)=>{
      mostrarFormulario.value = false
      alert.gestionarRespuesta(res)
      setTimeout(() => {
        mostrarFormulario.value = true
      }, 3000)
    })
    .catch((err:AxiosError)=>{
      console.log("error",err,producto)
      mostrarFormulario.value = false
      alert.gestionarError(err)
      setTimeout(() => {
        mostrarFormulario.value = true
      }, 3000);
    })
}



</script>

<style scoped>
</style>
