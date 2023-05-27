<template >

  <v-layout>
   <PerfilUsuario v-if="sesion.estadoSesion"/>
   <v-app-bar color="#f9cf57">
      <template v-slot:prepend>
        <v-img
        width="80"
        height="80"
        src="/logo-rest.png"
        >
        </v-img>
        <v-btn prepend-icon="mdi-home" to="/home" variant="text" >
          Home
        </v-btn>
        <v-btn prepend-icon="mdi-menu" to="/menu" variant="text">
          Menu
        </v-btn>
        <v-btn prepend-icon="mdi-cart-outline" to="/lista-pedidos" v-show="sesion.estadoSesion" variant="text" >
          Pedidos ({{cantidadProductos}})
        </v-btn>
        <v-btn prepend-icon="mdi-domain" to="/about-us" variant="text" >
          quienes somos
        </v-btn>

      </template>

      <template #append>
        <v-btn prepend-icon="mdi-account-group" to="/signin" v-show="!sesion.estadoSesion" variant="text" >
          Registrarse
        </v-btn>
        <v-btn prepend-icon="mdi-login-variant" to="/login" v-show="!sesion.estadoSesion" variant="text" >
          Iniciar sesion
        </v-btn>
      </template>

   </v-app-bar>

   <v-main>
     <!-- <h1 class="fondo">
       {{tituloPagina}}
     </h1> -->
     <router-view></router-view>
   </v-main>

  </v-layout>

</template>

<script setup lang="ts">
import {useRoute } from 'vue-router'
import {computed} from 'vue'
import {useSesionUsuario} from '../stores/sesionUsuario'
import PerfilUsuario from "./PerfilUsuario.vue"

const route = useRoute()

const sesion = useSesionUsuario()

const tituloPagina = computed(()=>{
  return route.name
})

const cantidadProductos = computed<number>(()=>{
  let totalProductos:number = 0

  if(sesion.listaPedidos.length > 0){
    totalProductos = sesion.listaPedidos.reduce((acum,producto)=> acum+=producto.cantidad,0)
  }

  return totalProductos
})


</script>

<style scoped>
.fondo{
  background-color: #f88905;
  display: inline;
}
</style>
