<template>
  <v-container class="my-16 py-16">
    <v-row>
      <v-col class="mt-15">
          <div class="text-center">

            <h2 >BIENVENIDOS A LA APP WEB DEL RESTAURANT lOS CINCO MEJORES SABORES!</h2>
            <h4 >Ven y observa todos nuestros platos del dia y arma tus platos con los contornos que mas desees!</h4>
            <div>
              <v-btn>Quienes somos?</v-btn>
              <v-btn @click="scroll">Lo que encontraras en la App</v-btn>
            </div>
          </div>
      </v-col>
    </v-row>
  </v-container>
  <ResumenApp/>
  <Contacto/>
</template>
<!-- <></> -->

<script setup lang="ts">
import ResumenApp from "../components/home/ResumenApp.vue";
import Contacto from "../components/home/Contacto.vue";


function scroll() {
  let ventana = window.innerHeight
  console.log("ventana",ventana)
  window.scrollTo(0,ventana)
}
</script>

<style lang="css" scoped>
</style>
