<template >
  <v-navigation-drawer
        expand-on-hover
        rail
        location="right"
        color="#f9cf57"
      >
        <template v-slot:prepend>
          <v-list-item
            prepend-icon="mdi-account"
            lines="two"
            :title="sesion.informacionUsuario.nombre"
            :subtitle="sesion.informacionUsuario.email"
          ></v-list-item>
        </template>

        <v-divider></v-divider>

        <v-list density="compact" nav>
          <v-list-item to="/mispedidos" prepend-icon="mdi-format-list-checkbox" title="Mis Pedidos"></v-list-item>
          <v-list-item to="/informacion-usuario" prepend-icon="mdi-account-cog" title="Mi cuenta" value="account"></v-list-item>
          <v-list-item @click="salir" prepend-icon="mdi-account-arrow-down" title="Salir" value="Salir"></v-list-item>
        </v-list>
        <v-divider></v-divider>
        <v-list v-if="sesion.informacionUsuario.esAdmin" density="compact" nav>
          <h3 class="ml-9">Administrador</h3>
          <v-list-item to="/operaciones-productos" prepend-icon="mdi-food-fork-drink" title="Crear productos"></v-list-item>
          <v-list-item to="/lista-productos" prepend-icon="mdi-list-box" title="Lista de productos"></v-list-item>
          <v-list-item to="/lista-Facturas" prepend-icon="mdi-clipboard-list-outline" title="Lista de pedidos"></v-list-item>
          <v-list-item to="/lista-fotos" prepend-icon="mdi-image-multiple" title="Lista de fotos"></v-list-item>
          <!-- <v-list-item to="/sesion-whatsapp" prepend-icon="mdi-message-cog" title="Sesion de whatsapp"></v-list-item> -->
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
