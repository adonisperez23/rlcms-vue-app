<template>
  <v-container class="mt-10 pt-10">
    <v-row>
      <v-col class="mt-16 pt-16">
          <div class="text-center">

            <h1 >¡BIENVENIDOS A LA APP WEB DEL RESTAURANT lOS CINCO MEJORES SABORES!</h1>
            <h4 >¡VEN Y OBSERVA TODOS NUESTROS PLATOS DEL DIA Y ARMA TUS PLATOS CON LOS CONTORNOS QUE MAS DESEES!</h4>
            <div>
            <v-btn-toggle

             >
              <v-btn href="#resumen" size="x-small" variant="tonal" >Como usar la app</v-btn>
              <v-btn href="#ubicacion" size="x-small" variant="tonal" >Nuestra Ubicacion</v-btn>
              <v-btn href="#contacto" size="x-small" variant="tonal" >Contactos</v-btn>
             </v-btn-toggle>
            </div>
          </div>
      </v-col>
    </v-row>
  </v-container>
  <ResumenApp id="resumen"/>
  <Ubicacion id="ubicacion"/>
  <Contacto id="contacto" />
  <TheFooter/>
</template>

<script setup lang="ts">
import {ref,onMounted} from 'vue'
import ResumenApp from "../components/home/ResumenApp.vue";
import Contacto from "../components/home/Contacto.vue";
import Ubicacion from "../components/home/Ubicacion.vue";
import TheFooter from "../components/home/TheFooter.vue";

onMounted(()=>{
  window.document.querySelector("resumen")
})

const titulo = ref<null>(null)
const resumen= ref<null>(null)
function scroll(altura:number):void {
  window.scrollTo(0,altura)
}
function mostrar() {
  console.log(resumen)
}
</script>

<style lang="css" scoped>
</style>
