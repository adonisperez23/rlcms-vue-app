<template>
    <v-col cols="3">
        <v-card
          color="#f3d595"
          >
          <v-card-text class="pb-0 px-1 pt-1">
            <FotoMenu :nombreProducto="nombreProducto"/>
            <h2>{{nombreProducto}}</h2>
            <h3>
              Precio {{precio}} $
            </h3>
          </v-card-text>
          <v-card-actions >
            <div class="d-flex flex-column">
              <v-btn class="mb-1" variant="flat" color="yellow-darken-2" prepend-icon="mdi-form-select" @click="propsAviso.activarAviso=true">Detalles del plato</v-btn>
              <div v-show="sesion.estadoSesion">
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
h2,p{
  font-family: poppins-bold;
}
</style>
