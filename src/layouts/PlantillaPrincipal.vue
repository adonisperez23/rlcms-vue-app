<template >

  <v-layout>
   <PerfilUsuario v-if="sesion.estadoSesion"/>
   <v-app-bar color="#f88905">
      <template v-slot:prepend>
        <v-img
        width="80"
        height="80"
        src="/logo-rest.png"
        >
        </v-img>
        <v-btn to="/home" variant="text" color="black">
          Home
        </v-btn>
        <v-btn to="/menu" variant="text" color="black">
          Menu
        </v-btn>
        <v-btn to="/about-us" variant="text" color="black">
          quienes somos
        </v-btn>
        <v-btn to="/lista-pedidos" v-show="sesion.estadoSesion" variant="text" color="black">
          Pedidos ({{cantidadProductos}})
        </v-btn>

      </template>

      <template #append>
        <v-btn to="/signin" v-show="!sesion.estadoSesion" variant="text" color="black">
          Registrarse
        </v-btn>
        <v-btn to="/login" v-show="!sesion.estadoSesion" variant="text" color="black">
          Login
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
import PerfilUsuario from "../components/PerfilUsuario.vue"

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
