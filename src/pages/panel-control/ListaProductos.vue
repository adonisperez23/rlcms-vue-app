<template>
  <v-container>
    <BarraProgresoAviso
      v-if="cargandoLista"
      mensajeBarra="Cargando . . ."
      mensaje="Mostrando lista de productos ..."
      noMostrarAlert
    />
    <v-row v-else>

      <v-col align="center" v-if="listaVacia">
        <v-sheet color="#f9cf57" rounded>
          <h1>No hay productos registrados</h1>
          <v-icon
          color="red"
          size="100"
          >
          mdi-server-food-variant-off
          </v-icon>
        </v-sheet>
      </v-col>
      <v-col align="center" v-if="errorServidor">
        <v-sheet color="#f9cf57" rounded>
          <h1>¡Ha ocurrido un error al cargar lista de productos!</h1>
          <v-icon
          color="red"
          size="100"
          >
          mdi-server-network-off
          </v-icon>
        </v-sheet>
      </v-col>
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
          @click="verificarProductoMostrarAviso(producto.id)"
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
      :unaAccion="estaProductoRelacionado"
      :dosAcciones="!estaProductoRelacionado"
      :mensaje="propsAvisoEliminar.mensaje"
      :dialog="propsAvisoEliminar.activarAviso"
      @accion-si="eliminarProductoId(propsAvisoEliminar.idInfo)"
      @accion-no="propsAvisoEliminar.activarAviso = false"
      @activar-aviso="propsAvisoEliminar.activarAviso = false"
    >
      <template v-slot:icon>
        <v-icon
        color="red"
        size="100"
        >
        mdi-alert-remove
       </v-icon>
      </template>
    </Aviso>
    <Aviso
      unaAccion
      :mensaje="propsAviso.mensaje"
      :dialog="propsAviso.activarAviso"
      @activar-aviso="propsAviso.activarAviso = false"
    >
      <template v-slot:icon>
        <v-icon
        color="green"
        size="100"
        >
        mdi-check-circle
       </v-icon>
      </template>
    </Aviso>
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
const estaProductoRelacionado = ref<boolean>(false)


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

function verificarProductoMostrarAviso(productoId:number):void {
  axios.get(import.meta.env.VITE_API_VERIFICAR_PRODUCTO+productoId)
  .then((res:Respuesta)=>{
    console.log("Verificando producto..",res)
    estaProductoRelacionado.value = res.data.mensaje

    if(estaProductoRelacionado.value){
      console.log("mensaje",estaProductoRelacionado.value)
      propsAvisoEliminar.mensaje = 'No puede eliminar este producto. Este producto esta asociado con otra informacion del sistema'
    } else {
      propsAvisoEliminar.mensaje = '¿Estas seguro que quieres eliminar este producto?'
    }

    propsAvisoEliminar.activarAviso = true
    propsAvisoEliminar.idInfo = productoId
  })
  .catch((err:AxiosError) => {
    console.log("Error al verificar producto", err)
  })



}

function estaListaVacia(lista:Producto[]) {
  if(lista.length > 0) return listaVacia.value=false
  return listaVacia.value=true
}

</script>

<style scoped>
</style>
