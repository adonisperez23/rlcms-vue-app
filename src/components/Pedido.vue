<template>
  <div class="text-left">
    <v-btn
     prepend-icon="mdi-pencil-plus"
     @click="dialog = true"
     >
      Pedir
    </v-btn>

    <v-dialog
      v-model="dialog"
      width="auto"
    >
      <v-card>
        <v-card-title>{{menuOpcion}} {{precio}}$</v-card-title>
        <v-card-subtitle>Contornos disponibles a elegir: <strong>{{contornosDisponibles}}</strong></v-card-subtitle>
        <v-card-text>
          <v-container>
            <v-select
            label="Indique la cantidad a pedir"
            :items="[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]"
            v-model="pedido.cantidad"
            density="compact"
            class="w-25"
            ></v-select>
            <v-row>
              <v-col v-for="(contorno, index) in contornos" :key="index" cols="4">
                <v-switch
                v-model="descripcion"
                :label="contorno"
                color="success"
                :value="contorno"
                hide-details
                :disabled="desactivar"
                ></v-switch>
              </v-col>
            </v-row>
            <v-row>
              <div class="text-h5">
                {{pedido.cantidad}} {{menuOpcion}} {{concatenarContornosSeleccionados}}
              </div>
            </v-row>

            <Aviso
              unaAccion
              @activar-aviso="()=>propsAviso.activarAviso = false"
              :mensaje="propsAviso.mensaje"
              :dialog="propsAviso.activarAviso"/>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-btn color="primary"  @click="dialog = false">Atras</v-btn>
          <v-btn color="primary"  @click="resetearSeleccion">Resetear seleccion</v-btn>
          <v-btn color="primary"  @click="guardarEnListaPedidos(pedido)">Guardar pedido</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup lang="ts">
import {ref,reactive, computed, inject} from "vue"
import {useSesionUsuario} from '../stores/sesionUsuario'
import {Pedido,Modal} from '../types/interfaces.ts'
import Aviso from "./Aviso.vue"

const props = defineProps<{
  idProducto:number,
  menuOpcion: string,
  precio:string,
}>()

const pedido:Pedido = reactive({
  producto:props.idProducto,
  nombreProducto:props.menuOpcion,
  precio:Number(props.precio),
  cantidad:1,
  descripcion:''
})

const propsAviso:Modal = reactive({
  activarAviso: false,
  mensaje:"",
  color:""
})

const lista = useSesionUsuario()

const contornosDisponibles = computed<number>(()=>{
  switch (descripcion.value.length) {
    case 0: return 3
      break;
    case 1: return 2
      break;
    case 2: return 1
     break;
    case 3: return 0
    break;
  }
})

const desactivar = computed<boolean>(()=>{
  if(contornosDisponibles.value === 0) {
    return true
  } else {
    return false
  }
})

const descripcion = ref<string[]>([]) // aqui se guardan los contornos que el cliente selecciona

const listaProductos = inject('listaProductos') // productos.json, mocks para pruebas y cuando se llama a la api la lista de productos

const listaContornos = listaProductos.value.filter(producto => producto.categoria === 'Contorno') // filtro para obtener de la lista solo los productos con categoria contorno

const contornos = listaContornos.map(contorno => contorno.nombreProducto) // devuelve arreglo con solo los contornos disponibles

const dialog = ref<boolean>(false) // variable que controla el display del componente Pedido.vue

const resetearSeleccion = ():void =>{  //resetea los valores de los contornos seleccionados por el cliente
  descripcion.value = []
}

const concatenarContornosSeleccionados = computed<string>(()=>{ // cadena de caracteres de los contornos seleccionados por el cliente
  let unionContornos:string = ''
  descripcion.value.forEach(contorno => {
    unionContornos += (contorno + ' ')
  })
  pedido.descripcion = unionContornos // toma la concatenacion de los productos y los devuelve en el objeto de pedido
  return unionContornos
})

const guardarEnListaPedidos = (pedido:Pedido):void =>{

  if(lista.listaPedidos.some(ped => (ped.nombreProducto === pedido.nombreProducto) && (ped.descripcion === pedido.descripcion))){ //verifica si existe dentro de la lista un pedido igual al seleccionado

    let pedidoEncontrado = lista.listaPedidos.find(ped => (ped.nombreProducto === pedido.nombreProducto) && (ped.descripcion === pedido.descripcion)) //obtiene el producto dentro de la lista igual al seleccionado por el usuario
    let index = lista.listaPedidos.indexOf(pedidoEncontrado) // obtiene el indice del producto dentro de la lista de pedidos
    pedido.cantidad += pedidoEncontrado.cantidad // Se suman las cantidades del producto dentro de la lista y el producto que ha sido igual al producto seleccionado por el cliente
    lista.listaPedidos.splice(index,1) // elimina el producto dentro de la lista
    lista.listaPedidos.push(pedido)// agrega el producto con las cantidades sumadas anteriormente

  } else {
    lista.listaPedidos.push(pedido) // si no hay coicidencia de productos dentro de la lista, se agrega un nuevo producto
  }


  propsAviso.activarAviso = true
  propsAviso.mensaje = "El pedido ha sido enviado a la lista de pedidos"

}

</script>

<style scoped>
</style>
