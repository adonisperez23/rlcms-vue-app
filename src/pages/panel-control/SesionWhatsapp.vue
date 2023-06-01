<template >
  <v-container>
    <v-row justify="center" v-if="errorAlCargarImagen">
      <v-col cols="6" align="center" >
         <h2 class="text-left">Lo sentimos, No se ha podido cargar la imagen QR para iniciar sesion whatsapp-web, Cargue nuevamente la pagina</h2>
         <v-icon
         color="red"
         size="200"
         >
         mdi-alert-circle
        </v-icon>
      </v-col>
    </v-row>
    <v-row v-else justify="center">
      <v-col cols="6">
        <h2>Inicie session de whatsapp para habilitar los mensajes desde la app</h2>
        <v-img

        aspect-ratio="16/9"
        cover
        src="http://localhost:3000/sesion/qr.png"
        @error="()=> errorAlCargarImagen = true"
        ></v-img>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import {ref} from 'vue'

const errorAlCargarImagen = ref<boolean>(false)


</script>

<style scoped>
</style>
