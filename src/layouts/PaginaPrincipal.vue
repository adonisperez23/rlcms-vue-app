<template>

  <v-layout>
   <PerfilUsuario v-if="sesion.estadoSesion"/>
   <v-app-bar>
      <template v-slot:prepend>

        <v-btn to="/home" variant="text">
          Home
        </v-btn>
        <v-btn to="/menu" variant="text">
          Menu
        </v-btn>
        <v-btn to="/lista-pedidos" v-show="sesion.estadoSesion" variant="text" >
          Pedidos ({{cantidadProductos}})
        </v-btn>
        <v-btn :to="{name:'Operaciones con productos'}" variant="text" >
          operaciones con productos
        </v-btn>
        <v-btn :to="{name:'Lista de productos'}" variant="text" >
          lista de productos
        </v-btn>
        <v-btn :to="{name:'Lista de Facturas'}" variant="text" >
          lista de facturas
        </v-btn>
        <v-btn :to="{name:'Lista de fotos'}" variant="text" >
          lista de fotos
        </v-btn>

      </template>

      <template #append>
        <v-btn to="/signin" v-show="!sesion.estadoSesion" variant="text">
          Registrarse
        </v-btn>
        <v-btn to="/login" v-show="!sesion.estadoSesion" variant="text" >
          Login
        </v-btn>
      </template>

   </v-app-bar>

   <v-main>
     <div class="text-h4">
       {{tituloPagina}}
     </div>
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
</style>
