<template>
  <div class="text-left">
    <v-btn
     variant="flat"
     color="green-accent-3"
     prepend-icon="mdi-pencil-plus"
     @click="dialog = true"
     >
      Pedir
    </v-btn>

    <v-dialog
      v-model="dialog"
      width="auto"
    >
      <v-card width="600">
        <v-card-title>{{menuOpcion}} {{precio}}$</v-card-title>
        <v-card-subtitle>Contornos disponibles a elegir: <strong>{{contornosDisponibles}}</strong></v-card-subtitle>
        <v-card-text class="py-0">
          <v-container>
            <v-row>
              <v-col cols="6" class="pa-0">
                <h6>Indique la cantidad</h6>
                <v-select
                :items="[1,2,3,4,5,6,7,8,9,10]"
                v-model="pedido.cantidad"
                density="compact"
                class="w-25"
                ></v-select>
              </v-col>
              <v-col>
                <h5>Nota:</h5>
                <h6>Producto que no indique sus contornos, seran servidos con arroz, ensalada cocida y tajadas</h6>
              </v-col>
            </v-row>
            <v-divider></v-divider>
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
            <v-divider></v-divider>
            <v-row >
              <v-col class="pb-0">
                <h3>
                  {{pedido.cantidad}} {{menuOpcion}} {{concatenarContornosSeleccionados}}
                </h3>
              </v-col>
            </v-row>

            <Aviso
              unaAccion
              @activar-aviso="cerrarAvisoPedido()"
              :mensaje="propsAviso.mensaje"
              :dialog="propsAviso.activarAviso">
              <template v-slot:icon>
                <v-icon
                color="blue"
                size="x-large"
                class="me-2"
                >
                mdi-playlist-edit
               </v-icon>
              </template>
            </Aviso>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-btn color="red"  @click="dialog = false">Atras</v-btn>
          <v-btn color="blue"  @click="resetearSeleccion">Resetear seleccion</v-btn>
          <v-btn color="green"  @click="guardarEnListaPedidos(pedido)">Guardar pedido</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup lang="ts">
import {ref,reactive, computed, inject, toRaw} from "vue"
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


  let cantidadProductos:number = lista.listaPedidos.reduce((acum,producto)=>{ return acum+producto.cantidad},0) // suma las cantidades de cada producto de la lista
  let totalCantidadProductos:number = cantidadProductos + pedido.cantidad // suma la cantidad de productos en lista mas la cantidad de productos que ha seleccionado el usuario

  if(totalCantidadProductos > 10){ // Verifica si la lista tiene menos de 10 productos, si sobrepasa el limite mostrara al usuario que ha cubierto el limite de productos a pedir
    propsAviso.activarAviso = true
    propsAviso.mensaje = "Usted supera el limite de 10 productos en su lista de pedidos..."
  } else {
     let pedidoOriginal:Pedido = {                  //Elimina la reactividad del pedido
       producto:pedido.producto,                    // y se agrega a la lista un pedido independiente de cambios que se hagan
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
