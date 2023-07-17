<template>
  <v-container class="mt-6 pt-6 mb-16 pb-16" >
    <v-row class="mt-6 pt-6 mb-16 pb-16" justify="center">
      <v-col :cols="cols">
        <h2>¿Donde se encuentra nuestro local fisico?</h2>
        <p><strong>Direccion:</strong><br>
          Avenida orinoco, en frente de Agencias Unidas de Automoviles C.A
        </p>
        <v-img
          class="borde-imagen"
          width="400"
          height="400"
          aspect-ratio="1/1"
          cover
          src="/fotos/fachada-rest.jpg"
        >
        </v-img>
        <v-btn class="mt-3" variant="tonal" color="#f88905" @click="abrirGoogleMaps">
          Ver ubicacion en Google maps
        </v-btn>
      </v-col>
    </v-row>
  </v-container>

</template>

<script setup lang="ts">
import {inject, computed} from 'vue'
import type {Ref} from 'vue'

const mobile = inject('isMobile') as Ref
const cols = computed<string>(()=>{
  if(mobile.value){
    return "12"
  } else {
    return "6"
  }
})

function abrirGoogleMaps() {
  window.open("https://www.google.com/maps/place/Rest.+Los+Cinco+Sabores,+C.A/@9.7380618,-63.1977622,16.67z/data=!4m6!3m5!1s0x8c334756c1aceb53:0x8658c5187bac443e!8m2!3d9.7376674!4d-63.198623!16s%2Fg%2F11c2r43k51?authuser=0")
}
</script>

<style lang="css" scoped>
h2{
  background-color: #f3d595;
  display: inline;
}
</style>
