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
            <p>Descripcion</p>
            <div class="text--primary">
              {{descripcion}} .<br>
            </div>
          </v-card-text>
          <v-card-actions v-show="sesion.estadoSesion">
            <Pedido
            :idProducto="id"
            :precio="precio"
            :menuOpcion="nombreProducto"/>
         </v-card-actions>
      </v-card>
    </v-col>

</template>

<script setup lang="ts">
import FotoMenu from "./FotoMenu.vue"
import Pedido from "../Pedido.vue"
import {useSesionUsuario} from "../../stores/sesionUsuario"

const props = defineProps<{

    id:number,
    nombreProducto:string,
    categoria:string,
    descripcion:string,
    precio:string,
    disponible:boolean,

}>()

const sesion = useSesionUsuario()

</script>

<style scoped>
</style>
