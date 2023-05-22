<template>
  <v-container>
    <BarraProgresoAviso
      v-if="cargandoLista"
      mensajeBarra="Cargando . . ."
      mensaje="Mostrando lista de productos ..."
      noMostrarAlert
    />
    <v-row v-else>

      <v-sheet v-if="listaVacia" rounded :height="250" :width="250">
        <h3>No hay productos registrados</h3>
      </v-sheet>
      <v-sheet v-if="errorServidor" rounded :height="250" :width="250">
        <h3>Ha ocurrido un error al cargar lista de productos</h3>
      </v-sheet>
      <v-table class="color-fondo" v-else-if="listaProductos.length > 0">
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
            color="green"
            :to="{name:'Operaciones con productos', query:producto}"
            prepend-icon="mdi-file-edit-outline">
            Editar
          </v-chip>
        </td>
        <td>
          <v-chip
          color="red"
          @click="mostrarAviso(producto.id)"
          prepend-icon="mdi-delete-outline">
          Eliminar
        </v-chip>
      </td>
      <td>
        <v-chip
        color="blue"
        :to="{name:'Subir Foto', query:{id:producto.id, nombreProducto:producto.nombreProducto}}"
        prepend-icon="mdi-plus-box-multiple">
        Agregar Foto
      </v-chip>
    </td>
  </tr>
</tbody>

</v-table>
    </v-row>
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
import BarraProgresoAviso from '../../components/BarraProgresoAviso.vue'

const listaProductos = ref<Producto[]>([])
const errorServidor = ref<boolean>(false)
const cantidadProductos = listaProductos.length
const cargandoLista =ref<boolean>(false)
const listaVacia = ref<boolean>(false)


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
    cargandoLista.value = true
    setTimeout(() => {
      listaProductos.value = res.data
      cargandoLista.value = false
      estaListaVacia(listaProductos.value)
    }, 2000);
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

function estaListaVacia(lista:Producto[]) {
  if(lista.length > 0) return listaVacia.value=false
  return listaVacia.value=true
}

</script>

<style scoped>
</style>
