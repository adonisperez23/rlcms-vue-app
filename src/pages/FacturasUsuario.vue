<template>
  <v-container>
    <BarraProgresoAviso
      v-if="cargandoLista"
      mensajeBarra="Cargando . . ."
      mensaje="Mostrando Lista de facturas ..."
      noMostrarAlert
    />
    <v-row justify="center" v-else>
      <v-sheet color="#f9cf57" rounded>
        <h1 v-if="listaVacia" >
          Usted todavia no ha generado pedidos por los momentos...
        </h1>
        <h1 v-if="errorServidor">
          ¡Ha ocurrido un error al cargar lista de facturas!
        </h1>
      </v-sheet>
      <v-col v-else cols="8">
            <v-data-table

            density="compact"
            v-model:items-per-page="itemsPerPage"
            :headers="headersFacturas"
            :items="listaFacturas"
            item-value="name"
            class="elevation-1"
            >
            <template v-slot:item.fechaHora="{ item }">
              {{$filters.dateFormat(item.raw.fechaHora)}}
            </template>
            <template v-slot:item.id="{ item }">
              <div class="ml-8">
                {{item.raw.id}}
              </div>
            </template>

            <template v-slot:item.actions="{ item }">
              <v-icon
              color="blue"
              size="large"
              class="me-2 ml-7"
              @click="mostrarPedido(item.raw.pedido)"
              >
              mdi-cursor-default-click
            </v-icon>
          </template>

        </v-data-table>
      </v-col>
    </v-row>
      <Aviso
      unaAccion
      :mensaje="propsAviso.mensaje"
      @activar-aviso="propsAviso.activarAviso=false"
      :dialog="propsAviso.activarAviso">
        <template v-slot:lista>
          <v-data-table
              density="compact"
              v-model:items-per-page="itemsPerPage"
              :headers="headersPedidos"
              :items="listaPedidos"
              item-value="name2"
              class="elevation-1"
            ></v-data-table>
        </template>
      </Aviso>
  </v-container>
</template>

<script setup lang="ts">
import {ref,reactive} from 'vue'
import Aviso from '../components/Aviso.vue'
import {Factura,Pedido,Modal,Respuesta} from '../types/interfaces'
import axios,{AxiosError} from 'axios'
import BarraProgresoAviso from '../components/BarraProgresoAviso.vue'


interface Header{
  title:string,
  align:string,
  key:string
}
const propsAviso = reactive<Modal>({
  activarAviso:false,
  mensaje:'Pedido',
})

const cargandoLista = ref<boolean>(true)
const listaVacia = ref<boolean>(false)
const errorServidor = ref<boolean>(false)

const itemsPerPage= ref<number>(5)

const headersFacturas = ref <Header[]>([
  {title:'Id Factura',align:'center',key:'id'},
  {title:'Fecha y hora',align:'center',key:'fechaHora'},
  {title:'Ver pedido',align:'center',key:'actions'}
])

const headersPedidos = ref <Header[]>([
  {title:'Id pedido',align:'center',key:'id'},
  {title:'Nombre del producto',align:'center',key:'producto.nombreProducto'},
  {title:'Descripcion',align:'center',key:'descripcion'},
  {title:'Precio',align:'center',key:'precio'},
  {title:'Cantidad',align:'center',key:'cantidad'}
])

const listaFacturas = ref<Factura[]>([])
const listaPedidos = ref<Pedido[]>([])


pedirFacturasUsuario()

function pedirFacturasUsuario():void {
  axios.get(import.meta.env.VITE_API_LISTA_FACTURA_POR_USUARIO+localStorage.getItem('id'))
  .then((res:Respuesta)=>{
    setTimeout(() => {
      listaFacturas.value = res.data
      cargandoLista.value = false
      estaListaVacia(listaFacturas.value)
    }, 2000);
  })
  .catch((err:AxiosError)=>{
    errorServidor.value = true
    console.log("error al cargar lista de facturas", err)
  })
}

function mostrarPedido(lista:Pedido[]):void {
  propsAviso.activarAviso = true
  listaPedidos.value = lista
  console.log("pedidos usuario",lista)
}

function estaListaVacia(lista:Factura[]) {
  if(lista.length > 0) return listaVacia.value=false
  return listaVacia.value=true
}

</script>

<style scoped>

</style>
