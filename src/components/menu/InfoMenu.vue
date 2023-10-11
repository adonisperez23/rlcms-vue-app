<template>
    <v-col :cols="deviceDisplay">
        <v-card
          color="#f3d595"
          height="410"
          max-height="450"
          >
          <v-card-text class="pb-0 px-1 pt-1">
            <FotoMenu :nombreProducto="nombreProducto"/>
            <h3 class="pt-1">{{nombreProducto}}</h3>
            <h4 class="money">
              Precio: {{precio}} $
            </h4>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions >
            <div class="d-flex flex-column">
              <v-btn class="mb-1" size="x-small" variant="flat" rounded="pill" color="yellow-darken-2" prepend-icon="mdi-form-select" @click="propsAviso.activarAviso=true">Detalles del plato</v-btn>
              <div v-if="sesion.estadoSesion">
                <Pedido
                :idProducto="id"
                :precio="precio"
                :menuOpcion="nombreProducto"/>
              </div>
            </div>
         </v-card-actions>
      </v-card>
      <Aviso
       :dialog="propsAviso.activarAviso"
       unaAccion
       @activar-aviso="propsAviso.activarAviso=false"
       :mensaje="propsAviso.mensaje"
      >
        <template v-slot:icon>
          <v-icon
          color="green"
          size="100"
          >
          mdi-text-box
         </v-icon>
        </template>
      </Aviso>
    </v-col>

</template>

<script setup lang="ts">
import {reactive,inject,computed,ref} from "vue"
import FotoMenu from "./FotoMenu.vue"
import Pedido from "./Pedido.vue"
import {useSesionUsuario} from "../../stores/sesionUsuario"
import Aviso from "../Aviso.vue"
import type {Modal,Producto} from "../../types/interfaces"
import type {Ref} from "vue"

const isMobile = inject('isMobile') as Ref
const deviceDisplay = computed<number>(()=>{
  if(isMobile.value){
    return 12
  } else {
    return 4
  }
})

const props = defineProps<{
  id?:number,
  nombreProducto:string,
  categoria:string,
  descripcion:string,
  precio:number,
  disponible:boolean
}>()

const propsAviso =reactive<Modal>({
  activarAviso:false,
  mensaje:props.descripcion
})

const sesion = useSesionUsuario()

</script>

<style scoped>
h2,p{
  font-family: poppins-bold;
}
.money{
  color: green;
}
</style>
