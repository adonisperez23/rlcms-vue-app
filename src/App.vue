
<template>
  <main class="fondo-completo">
    <router-view/>
  </main>
</template>

<script setup lang="ts">
import {useSesionUsuario} from './stores/sesionUsuario'
import {Usuario} from './types/interfaces'

let usuario:Usuario = {
  id:localStorage.getItem('id'),
  nombre:localStorage.getItem('nombre'),
  telefono:localStorage.getItem('telefono'),
  email:localStorage.getItem('email'),
  claveUno:localStorage.getItem('claveUno'),
  esAdmin:localStorage.getItem('esAdmin')
}
const sesion = useSesionUsuario()

if(usuario.id){
  sesion.abrirSesion()
  sesion.obtenerInformacionUsuario(usuario)
}


</script>
<style scoped>

</style>
