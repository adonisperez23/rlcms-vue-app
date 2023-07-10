
<template>
  <main class="fondo-completo">
    <router-view/>
  </main>
</template>

<script setup lang="ts">
import {provide} from 'vue'
import {useSesionUsuario} from './stores/sesionUsuario'
import type {Usuario} from './types/interfaces'
import { useDisplay } from 'vuetify'

const {xs,width} = useDisplay()

provide('isMobile', xs)
provide('widthWindow', width)
const sesion = useSesionUsuario()

if(localStorage.length > 0){
  let usuario:Usuario = {
    id:Number(localStorage.getItem('id')) ,
    nombre:localStorage.getItem('nombre') as string,
    telefono:localStorage.getItem('telefono') as string,
    email:localStorage.getItem('email') as string,
    clave:localStorage.getItem('clave') as string,
    esAdmin:(localStorage.getItem('esAdmin') === "true")
  }
  if(usuario.id){
    sesion.abrirSesion()
    sesion.obtenerInformacionUsuario(usuario)
  }
}





</script>
<style scoped>

</style>
