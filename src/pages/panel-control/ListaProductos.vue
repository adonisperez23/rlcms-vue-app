<template>
  <v-container>
    <v-sheet v-if="listaProductos.length === 0" rounded :height="250" :width="250">
      <h3>No hay productos registrados</h3>
      <h3 v-if="errorServidor">Ha ocurrido un error al cargar lista de productos</h3>
    </v-sheet>
    <v-table v-else>
      <thead>
        <tr>
          <th class="text-center">
            ID producto
          </th>
          <th class="text-center">
            Nombre del Producto
          </th>
          <th class="text-center">
            Categoria
          </th>
          <th class="text-center">
            Descripcion
          </th>
          <th class="text-center">
            Precio $
          </th>
          <th class="text-center">
            Esta disponible?
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(producto,index) in listaProductos"
          :key="producto.id"
        >
          <td class="text-center">{{ producto.id}}</td>
          <td class="text-center">{{ producto.nombreProducto}}</td>
          <td class="text-center">{{ producto.categoria}}</td>
          <td class="text-center">{{ producto.descripcion}}</td>
          <td class="text-center">{{ producto.precio}} $</td>
          <td class="text-center">{{ producto.disponible ? 'Si' : 'No'}}</td>
          <td>
            <v-chip
              :to="{name:'Operaciones con productos', query:producto}"
              icon="mdi-blinds">
                Editar
            </v-chip>
          </td>
          <td>
            <v-chip
              @click="mostrarAviso(producto.id)"
              icon="mdi-blinds">
                Eliminar
            </v-chip>
          </td>
        </tr>
      </tbody>

    </v-table>
    <Aviso
      dosAcciones
      :mensaje="propsAvisoEliminar.mensaje"
      :dialog="propsAvisoEliminar.activarAviso"
      @accion-si="eliminarProductoId(propsAvisoEliminar.idInfo)"
      @accion-no="propsAvisoEliminar.activarAviso = false"
    />
    <Aviso
      unaAccion
      :mensaje="propsAviso.mensaje"
      :dialog="propsAviso.activarAviso"
      @activar-aviso="propsAviso.activarAviso = false"
    />
  </v-container>
</template>

<script setup lang="ts">
import {ref,reactive} from 'vue'
import axios,{AxiosError} from 'axios'
import {Respuesta,Producto,Modal} from '../../types/interfaces'
import Aviso from '../../components/Aviso.vue'

const listaProductos = ref<Producto[]>([])
const errorServidor = ref<boolean>(false)
const cantidadProductos = listaProductos.length


obtenerProductos()


const propsAvisoEliminar:Modal = reactive({
  activarAviso: false,
  mensaje:"",
  color:"",
  idInfo:undefined
})
const propsAviso:Modal = reactive({
  activarAviso: false,
  mensaje:"",
  color:""
})




function mostrarAviso(idInfo:true):void {
  propsAvisoEliminar.activarAviso = true
  propsAvisoEliminar.idInfo = idInfo
  propsAvisoEliminar.mensaje = 'Estas seguro que quieres eliminar este producto?'
}

function obtenerProductos():void {
  axios.get(import.meta.env.VITE_API_LISTA_DE_PRODUCTOS)
  .then((res:Respuesta)=>{
    console.log("data",res)
    listaProductos.value = res.data
  })
  .catch((err:AxiosError) => {
    errorServidor.value = true
    console.log("error al cargar lista de productos", err)
  })
}

function eliminarProductoId(idProducto:number):void {
  axios.delete(import.meta.env.VITE_API_ELIMINAR_PRODUCTO+idProducto)
    .then((res:Respuesta)=>{
      propsAvisoEliminar.activarAviso = false
      propsAviso.activarAviso = true
      propsAviso.mensaje = res.data.mensaje
      obtenerProductos()
    })
    .catch((err:AxiosError)=>{
      propsAviso.activarAviso = true
      propsAviso.mensaje = err.response.data.error
    })
}

</script>

<style scoped>
</style>
