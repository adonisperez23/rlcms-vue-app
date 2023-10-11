<template>
  <v-container class="mt-1 pt-1 fondo-comida mobile">
    <v-row class="mt-16 pt-16">
      <v-col class="mt-6 pt-6">
          <div class="text-center fondo-titulo">

            <h1>¡Bienvenidos a la app web del restaurant los cinco mejores sabores!</h1>
            <h3 >¡Ven y observa todos nuestros platos del dia y arma tus platos con los contornos que mas desees!</h3>
            <div>
            <v-btn-toggle
             >
              <v-btn href="#resumen" size="x-small" variant="flat" >Como usar la app</v-btn>
              <v-btn href="#ubicacion" size="x-small" variant="flat" >Nuestra Ubicacion</v-btn>
              <v-btn href="#contacto" size="x-small" variant="flat" >Contactos</v-btn>
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

</script>

<style scoped>
.fondo-comida {
  background-image: url("/fotos/fotocomida.jpg");
  background-size: 1200px 560px;
  height: 560px;
  border: solid 5px orange;
  border-radius: 5px;
}
.fondo-titulo{
  background-color: #fcecd2;
  opacity: 0.7;
  border: solid 2px orange;
  border-radius: 5px;
}
@media (max-width:400px) {
  .mobile{
    background-image: url("/fotos/mobilefoto.jpg");
    background-size:400px 660px;
    height: 660px;
    border-radius: 5px;
  }
}
</style>
