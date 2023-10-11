<template >

  <v-layout>
   <PerfilUsuario v-if="sesion.estadoSesion"/>

   <v-app-bar color="#f9cf57">
      <template v-slot:prepend>
        <v-img
        v-if="!isMobile"
        width="80"
        height="80"
        src="/logo-rest.png"
        >
        </v-img>
        <v-menu
             v-if="isMobile"
             location="bottom"
           >
           <template v-slot:activator="{props}" >
             <v-btn v-bind="props" icon="mdi-menu" variant="text" >
             </v-btn>
           </template>
         <v-list class="text-start" density="compact">
           <v-list-item  to="/home" prepend-icon="mdi-home" title="Home"></v-list-item>
           <v-list-item  to="/menu" prepend-icon="mdi-list-box" title="Menu"></v-list-item>
           <v-list-item :disabled="sesion.estadoLocalComercial" v-if="sesion.estadoSesion" to="/lista-pedidos" prepend-icon="mdi-cart-outline" title="Lista de pedidos">({{cantidadProductos}})</v-list-item>
           <v-list-item  to="/about-us" prepend-icon="mdi-domain" title="Quienes somos"></v-list-item>
         </v-list>
       </v-menu>
        <div v-if="!isMobile">
          <v-btn prepend-icon="mdi-home" to="/home" variant="text" >
            Home
          </v-btn>
          <v-btn prepend-icon="mdi-menu" to="/menu" variant="text">
            Menu
          </v-btn>
          <v-btn :disabled="estadoLocalComercial" prepend-icon="mdi-cart-outline" to="/lista-pedidos" v-show="sesion.estadoSesion" variant="text" >
            Pedidos ({{cantidadProductos}})
          </v-btn>
          <v-btn prepend-icon="mdi-domain" to="/about-us" variant="text" >
            quienes somos
          </v-btn>
        </div>

      </template>
      <template v-if="isMobile">
        <div class="">
          <v-img
          width="80"
          height="80"
          src="/logo-rest.png"
          >
        </v-img>
        </div>
      </template>

      <template #append>
        <v-menu
             v-if="isMobile || width <= 1280 "
             location="bottom"
             temporary
           >
           <template v-slot:activator="{props}" >
             <v-btn :disabled="width > 600 && !sesion.estadoSesion" v-bind="props" icon="mdi-account-multiple-outline" variant="text" >
             </v-btn>
           </template>
           <v-card class="mx-auto" width="250">
             <v-list class="text-start" v-if="!sesion.estadoSesion" density="compact">
               <v-list-item  to="/signin" prepend-icon="mdi-account-group" title="Registrarse"></v-list-item>
               <v-list-item  to="/login" prepend-icon="mdi-login-variant" title="Iniciar sesion"></v-list-item>
             </v-list>
             <v-list-item
             prepend-icon="mdi-account"
             class="text-start"
             v-if="sesion.estadoSesion"
             lines="two"
             :title="sesion.informacionUsuario.nombre"
             :subtitle="sesion.informacionUsuario.email"
             ></v-list-item>
             <v-divider></v-divider>
             <v-list  class="text-start" v-if="sesion.estadoSesion" density="compact" nav>
               <v-list-item to="/mispedidos" prepend-icon="mdi-format-list-checkbox" title="Mis Pedidos"></v-list-item>
               <v-list-item to="/informacion-usuario" prepend-icon="mdi-account-cog" title="Mi cuenta" value="account"></v-list-item>
               <v-list-item @click="salir" prepend-icon="mdi-account-arrow-down" title="Salir" value="Salir"></v-list-item>
             </v-list>
             <v-divider></v-divider>
             <v-list class="text-start" v-if="sesion.informacionUsuario.esAdmin" density="compact" nav>
               <h3 class="ml-9">Administrador</h3>
               <v-list-item to="/operaciones-productos" prepend-icon="mdi-food-fork-drink" title="Crear productos"></v-list-item>
               <v-list-item to="/lista-productos" prepend-icon="mdi-list-box" title="Lista de productos"></v-list-item>
               <v-list-item to="/lista-Facturas" prepend-icon="mdi-clipboard-list-outline" title="Lista de pedidos"></v-list-item>
               <v-list-item to="/lista-fotos" prepend-icon="mdi-image-multiple" title="Lista de fotos"></v-list-item>
               <!-- <v-list-item to="/sesion-whatsapp" prepend-icon="mdi-message-cog" title="Sesion de whatsapp"></v-list-item> -->
             </v-list>
           </v-card>
       </v-menu>
        <div v-if="!isMobile">
          <v-btn prepend-icon="mdi-account-group" to="/signin" v-show="!sesion.estadoSesion" variant="text" >
            Registrarse
          </v-btn>
          <v-btn prepend-icon="mdi-login-variant" to="/login" v-show="!sesion.estadoSesion" variant="text" >
            Iniciar sesion
          </v-btn>
        </div>
      </template>

   </v-app-bar>


   <v-main>
     <v-sheet
     v-if="estadoLocalComercial && sesion.estadoSesion"
     color="yellow-darken-2"
     max-height="120"
      >

      <h4 class="text-center pt-1">
        <v-icon>
        mdi-alert-outline
        </v-icon>
        Lo sentimos, estamos fuera de servicio. Nuestro horario de servicio es de lunes a viernes entre 11:00 am a 4:00 pm y sabado de 11:00 am a 3:00 pm
        <v-icon>
        mdi-alert-outline
        </v-icon>
      </h4>
    </v-sheet>
     <router-view></router-view>
   </v-main>

  </v-layout>

</template>

<script setup lang="ts">
import {useRoute,useRouter } from 'vue-router'
import {computed,ref, inject} from 'vue'
import {useSesionUsuario} from '../stores/sesionUsuario'
import PerfilUsuario from "./PerfilUsuario.vue"
import {storeToRefs} from "pinia"
import type {Pedido} from "../types/interfaces"
import type {Ref} from 'vue'


const route = useRoute()
const router = useRouter()

const isMobile = inject("isMobile") as Ref
const width = inject("widthWindow") as Ref
const drawer = ref<boolean>(false)
const drawerSesion = ref<boolean>(false)

const sesion = useSesionUsuario()
const {estadoLocalComercial} = storeToRefs(sesion)

const cantidadProductos = computed<number>(()=>{
  let totalProductos:number = 0

  if(sesion.listaPedidos.length > 0){
    totalProductos = sesion.listaPedidos.reduce((acum:number,producto:Pedido)=> acum+=producto.cantidad,0)
  }

  return totalProductos
})

const salir = ()=>{
  drawerSesion.value = false
  sesion.resetSesion()
  router.push('/menu')
  localStorage.clear()
}

var controladorHorario = setInterval(()=>{
  let date = new Date()
  let horaActual = date.getHours()
  let diaActual = date.getDay()
  let horaApertura = 11 //11 hora de apertura es a las 11 am
  let horaCierre = 16   //16 hora de cierre es a las 4 pm es decir a las 16
  let diaNolaborable = 0 // dia no laborable domingo; es el 0

  if(diaActual === diaNolaborable){
      sesion.cerrarLocalComercial()
  } else if((horaActual < horaApertura || horaActual >= horaCierre)) {
    sesion.cerrarLocalComercial()
  } else if(horaActual >= horaApertura && horaActual < horaCierre){
    sesion.abrirLocalComercial()
  }

  // console.log("dia hoy", diaActual, estadoLocalComercial.value)
  },1000)



</script>

<style scoped>
.fondo{
  background-color: #f88905;
  display: inline;
}
</style>
