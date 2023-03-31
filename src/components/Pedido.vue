<template>
  <div class="text-center">
    <v-btn
      color="primary"
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
                v-model="contornosSeleccionados"
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
  menuOpcion: string,
  precio:string,
}>()

const pedido:Pedido = reactive({
  nombreProducto:props.menuOpcion,
  precio:props.precio,
  cantidad:1,
  contornosSeleccionados:''
})

const propsAviso:Modal = reactive({
  activarAviso: false,
  mensaje:"",
  color:""
})

const lista = useSesionUsuario()

const contornosDisponibles = computed<number>(()=>{
  switch (contornosSeleccionados.value.length) {
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

const contornosSeleccionados = ref<string[]>([]) // aqui se guardan los contornos que el cliente selecciona

const listaProductos = inject('listaProductos') // productos.json

const listaContornos = listaProductos.filter(producto => producto.categoria === 'Contorno') // filtro para obtener de la lista solo los productos con categoria contorno

const contornos = listaContornos.map(contorno => contorno.nombreProducto) // devuelve arreglo con solo los contornos disponibles

const dialog = ref<boolean>(false) // variable que controla el display del componente Pedido.vue

const resetearSeleccion = ():void =>{  //resetea los valores de los contornos seleccionados por el cliente
  contornosSeleccionados.value = []
}

const concatenarContornosSeleccionados = computed<string>(()=>{ // cadena de caracteres de los contornos seleccionados por el cliente
  let unionContornos:string = ''
  contornosSeleccionados.value.forEach(contorno => {
    unionContornos += (contorno + ' ')
  })
  pedido.contornosSeleccionados = unionContornos // toma la concatenacion de los productos y los devuelve en el objeto de pedido
  return unionContornos
})

const guardarEnListaPedidos = (pedido:Pedido):void =>{
  lista.listaPedidos.push(pedido)

  propsAviso.activarAviso = true
  propsAviso.mensaje = "El pedido ha sido enviado a la lista de pedidos"

}

</script>

<style scoped>
</style>
