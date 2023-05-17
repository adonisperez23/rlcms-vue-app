<template>
  <v-container class="my-16 py-16">
    <v-row>
      <v-col class="my-16 py-16">
          <div class="text-center">

            <h1 >¡BIENVENIDOS A LA APP WEB DEL RESTAURANT lOS CINCO MEJORES SABORES!</h1>
            <h4 >VEN Y OBSERVA TODOS NUESTROS PLATOS DEL DIA Y ARMA TUS PLATOS CON LOS CONTORNOS QUE MAS DESEES!</h4>
            <div>
              <v-btn to="/about-us" variant="text" color="black">¿Quienes somos?</v-btn>
              <v-btn @click="scroll" variant="text" color="black">Lo que encontraras en la App</v-btn>
            </div>
          </div>
      </v-col>
    </v-row>
  </v-container>
  <ResumenApp/>
  <Ubicacion/>
  <Contacto/>
  <TheFooter/>
</template>

<script setup lang="ts">
import ResumenApp from "../components/home/ResumenApp.vue";
import Contacto from "../components/home/Contacto.vue";
import Ubicacion from "../components/home/Ubicacion.vue";
import TheFooter from "../components/home/TheFooter.vue";


function scroll() {
  let ventana = window.innerHeight
  console.log("ventana",ventana)
  window.scrollTo(0,ventana)
}
</script>

<style lang="css" scoped>
</style>
