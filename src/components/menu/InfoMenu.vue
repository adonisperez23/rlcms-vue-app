<template>
    <v-col cols="3">
        <v-card
          >
          <v-card-text>
            <FotoMenu :nombreProducto="nombreProducto"/>
            <h2>{{nombreProducto}}</h2>
            <p class="text-h6 text--primary">
               {{precio}} $
            </p>
          </v-card-text>
          <v-card-actions >
            <v-btn @click="propsAviso.activarAviso=true">Detalles del plato</v-btn>
            <div v-show="sesion.estadoSesion">
              <Pedido
              :idProducto="id"
              :precio="precio"
              :menuOpcion="nombreProducto"/>
            </div>
         </v-card-actions>
      </v-card>
      <Aviso
       :dialog="propsAviso.activarAviso"
       unaAccion
       @activar-aviso="propsAviso.activarAviso=false"
       :mensaje="propsAviso.mensaje"
      />
    </v-col>

</template>

<script setup lang="ts">
import {reactive} from "vue"
import FotoMenu from "./FotoMenu.vue"
import Pedido from "../Pedido.vue"
import {useSesionUsuario} from "../../stores/sesionUsuario"
import Aviso from "../Aviso.vue"
import {Modal} from "../../types/interfaces"

const props = defineProps<{

    id:number,
    nombreProducto:string,
    categoria:string,
    descripcion:string,
    precio:string,
    disponible:boolean,

}>()

const propsAviso =reactive<Modal>({
  activarAviso:false,
  mensaje:props.descripcion
})

const sesion = useSesionUsuario()

</script>

<style scoped>
</style>
