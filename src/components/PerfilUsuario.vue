<template >
  <v-navigation-drawer
        expand-on-hover
        rail
        location="right"
      >
        <template v-slot:prepend>
          <v-list-item
            lines="two"
            prepend-avatar="https://randomuser.me/api/portraits/women/81.jpg"
            :title="sesion.informacionUsuario.nombre"
            :subtitle="sesion.informacionUsuario.email"
          ></v-list-item>
        </template>

        <v-divider></v-divider>

        <v-list density="compact" nav>
          <v-list-item prepend-icon="mdi-home-city" title="Home" value="home"></v-list-item>
          <v-list-item to="/informacion-usuario" prepend-icon="mdi-account" title="Mi cuenta" value="account"></v-list-item>
          <v-list-item @click="salir" prepend-icon="mdi-account-group-outline" title="Salir" value="Salir"></v-list-item>
        </v-list>
      </v-navigation-drawer>
</template>

<script setup lang="ts">
import {useRouter} from "vue-router"
import {useSesionUsuario} from "../stores/sesionUsuario"

const router = useRouter()
const sesion = useSesionUsuario()

const salir = ()=>{
  sesion.resetSesion()
  router.push('/menu')
  localStorage.clear()
}
</script>

<style  scoped>
</style>
