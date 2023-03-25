<template>

  <v-layout>

   <v-app-bar>
      <template v-slot:prepend>

        <v-btn variant="text" @click="router.push('/menu')">
          Menu
        </v-btn>
        <v-btn variant="text" @click="router.push('/lista-pedidos')">
          Pedidos
        </v-btn>

      </template>

      <template #append>
        <v-btn variant="text" @click="router.push('/signin')">
          Registrarse
        </v-btn>
        <v-btn variant="text" @click="router.push('/login')">
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
import { useRouter, useRoute } from 'vue-router'
import {computed} from 'vue'

const router = useRouter()
const route = useRoute()

const tituloPagina = computed(()=>{
  return route.name
})


</script>

<style scoped>
</style>
