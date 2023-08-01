<template>
  <div class="text-left">
    <v-btn
     :disabled="lista.estadoLocalComercial"
     size="x-small"
     variant="flat"
     color="green-accent-3"
     prepend-icon="mdi-pencil-plus"
     @click="dialog = true"
     rounded="pill"
     >
      Pedir
    </v-btn>

    <v-dialog
      v-model="dialog"
      width="auto"
    >
      <v-card :width="widthDisplay">
        <v-sheet rounded color="yellow-darken-2">
          <v-card-title>{{menuOpcion}} ${{precio}}</v-card-title>
        </v-sheet>
        <v-card-subtitle>Contornos disponibles a elegir: <strong>{{contornosDisponibles}}</strong></v-card-subtitle>
        <v-card-text class="py-0">
          <v-container>
            <v-row>
              <v-col cols="6" class="pa-0">
                <h6>Indique la cantidad</h6>
                <v-select
                :items="[1,2,3,4,5]"
                v-model="pedido.cantidad"
                density="compact"
                class="w-50"
                ></v-select>
                <v-sheet class="w-100 py-0">
                  <h6>Especificacion extra</h6>
                  <v-text-field
                  density="compact"
                  class="mb-5"
                  v-model="especificacionExtra"
                  hide-details="auto"
                  ></v-text-field>
                </v-sheet>
              </v-col>
              <v-col>
                <v-sheet rounded color="yellow-darken-2">
                  <h5>Nota:</h5>
                  <h6>Producto que no indique sus contornos a excepcion del Pabellon criollo y la Pasta a la bologna, seran servidos con arroz, ensalada cocida y tajadas</h6>
                </v-sheet>
              </v-col>
            </v-row>
            <v-divider></v-divider>
            <v-row>
              <v-col class="pa-1" v-for="(contorno, index) in contornos" :key="index" :cols="colsContornos">
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
            <v-divider></v-divider>
            <v-row >
              <v-col class="pb-0">
                <v-sheet rounded color="yellow-darken-2">
                  <h3>
                    {{pedido.cantidad}} {{menuOpcion}} {{concatenarContornosSeleccionados}}
                  </h3>
                </v-sheet>
              </v-col>
            </v-row>

            <Aviso
              unaAccion
              @activar-aviso="cerrarAvisoPedido()"
              :mensaje="propsAviso.mensaje"
              :dialog="propsAviso.activarAviso">
              <template v-slot:icon>
                <v-icon
                color="green"
                size="100"
                >
                mdi-playlist-edit
               </v-icon>
              </template>
            </Aviso>

            <Aviso
              unaAccion
              @activar-aviso="()=>propsAvisoMaxProductos.activarAviso=false"
              :mensaje="propsAvisoMaxProductos.mensaje"
              :dialog="propsAvisoMaxProductos.activarAviso">
              <template v-slot:icon>
                <v-icon
                color="red"
                size="100"
                >
                mdi-cart-remove
               </v-icon>
              </template>
            </Aviso>
          </v-container>
        </v-card-text>
        <v-card-actions color="yellow-darken-2">
          <v-btn size="x-small" prepend-icon="mdi-arrow-left" color="red"  @click="dialog = false">Atras</v-btn>
          <v-btn size="x-small" prepend-icon="mdi-cart-arrow-down" color="green"  @click="guardarEnListaPedidos(pedido)">Guardar pedido</v-btn>
          <v-btn size="x-small" v-show="descripcion.length > 0" prepend-icon="mdi-undo" color="blue"  @click="resetearSeleccion">Resetear</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup lang="ts">
import {ref,reactive, computed, inject} from "vue"
import {useSesionUsuario} from '../../stores/sesionUsuario'
import type {Ref} from "vue"
import type {Pedido,Modal,Producto} from '../../types/interfaces'
import Aviso from "../Aviso.vue"

const props = defineProps<{
  idProducto?:number,
  menuOpcion: string,
  precio:number,
}>()

const pedido:Pedido = reactive({
  id:props.idProducto,
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

const propsAvisoMaxProductos:Modal = reactive({
  activarAviso: false,
  mensaje:"",
  color:""
})


const lista = useSesionUsuario()

const descripcion = ref<string[]>([]) // aqui se guardan los contornos que el cliente selecciona

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

    default: return 0
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


const isMobile = inject("isMobile") as Ref
const widthDisplay = computed<string>(()=>{  //controla el ancho del component card dependiendo del dispositivo
  if(isMobile.value){
    return "350"
  } else{
    return "600"
  }
})
const colsContornos = computed<number>(()=>{ //establece las columnas del componente switch de loss contornos dependiendo del dispositivo
  if(isMobile.value){
    return 6
  } else{
    return 4
  }
})

const especificacionExtra = ref<string>('')


const listaMenu = inject('listaMenu') as Ref// productos.json, mocks para pruebas y cuando se llama a la api la lista de productos
let listaContornos = reactive<Producto[]>([])
let contornos = reactive<string[]>([])


listaContornos = listaMenu.value.filter((producto:Producto) => producto.categoria === 'Contorno' && producto.disponible === true) // filtro para obtener de la lista solo los productos con categoria contorno
contornos = listaContornos.map((contorno:Producto) => contorno.nombreProducto) // devuelve arreglo con solo los contornos disponibles

// console.log("listaProductos",listaMenu)
const dialog = ref<boolean>(false) // variable que controla el display del componente Pedido.vue

const resetearSeleccion = ():void =>{  //resetea los valores de los contornos seleccionados por el cliente
  descripcion.value = []
}

// cadena de caracteres de los contornos seleccionados por el cliente
const concatenarContornosSeleccionados = computed<string>(()=>{
  let unionContornos:string = ''
  descripcion.value.forEach(contorno => {
    unionContornos += (contorno + ' ')
  })
  // toma la concatenacion de los productos y los devuelve en el objeto de pedido
  if(especificacionExtra.value.length >0){
    pedido.descripcion = unionContornos + `(${especificacionExtra.value})`
  } else {
    pedido.descripcion = unionContornos
  }

  return pedido.descripcion
})

const guardarEnListaPedidos = (pedido:Pedido):void =>{


  let cantidadProductos:number = lista.listaPedidos.reduce((acum,producto)=>{ return acum+producto.cantidad},0) // suma las cantidades de cada producto de la lista
  let totalCantidadProductos:number = cantidadProductos + pedido.cantidad // suma la cantidad de productos en lista mas la cantidad de productos que ha seleccionado el usuario

  if(totalCantidadProductos > 10){ // Verifica si la lista tiene menos de 10 productos, si sobrepasa el limite mostrara al usuario que ha cubierto el limite de productos a pedir
    propsAvisoMaxProductos.activarAviso = true
    propsAvisoMaxProductos.mensaje = "Usted supera el limite de 10 productos en su lista de pedidos..."
  } else {
     let pedidoOriginal:Pedido = {                  //Elimina la reactividad del pedido
       id:pedido.id,                    // y se agrega a la lista un pedido independiente de cambios que se hagan
       nombreProducto:pedido.nombreProducto,
       precio:pedido.precio,
       cantidad:pedido.cantidad,
       descripcion:pedido.descripcion
     }
     lista.agregarPedido(pedidoOriginal)
     propsAviso.activarAviso = true
     propsAviso.mensaje = "Su pedido ha sido agregado a la lista!"
    }
}

const cerrarAvisoPedido = ():void=>{
  propsAviso.activarAviso = false
  dialog.value = false
}

</script>

<style scoped>
</style>
