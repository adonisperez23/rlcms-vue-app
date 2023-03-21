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
          <v-card-actions>
            <Pedido
            :precio="precio"
            :menuOpcion="nombreProducto"/>
         </v-card-actions>
      </v-card>
    </v-col>

</template>

<script setup lang="ts">
import FotoMenu from "./FotoMenu.vue"
import Pedido from "../Pedido.vue"

const props = defineProps<{

    id:number,
    nombreProducto:string,
    categoria:string,
    descripcion:string,
    precio:string,
    disponible:boolean,

}>()

</script>

<style scoped>
</style>
