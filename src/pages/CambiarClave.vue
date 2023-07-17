<template>
  <v-container>
    <BarraProgresoAviso
    v-show="!mostrarFormulario"
    mostrarAlert
    mensajeBarra="Cargando..."
    :colorAlert="alert.color"
    :iconoAlert="alert.icon"
    :mensajeAlert="alert.mensaje"
    />
    <v-sheet v-show="mostrarFormulario" width="300" class="mx-auto">
      <v-form  fast-fail @submit.prevent>
        <v-text-field
        type="password"
        v-model="nuevaClave.passwordUno"
        :rules="useValidarClaveUno"
        label="Contraseña"
        ></v-text-field>
        <v-text-field
        type="password"
        v-model="nuevaClave.passwordDos"
        :rules="validarClave"
        label="Repita la contraseña"
        ></v-text-field>
        <v-btn prepend-icon="mdi-swap-horizontal" color="green" :disabled="activarCambiarClave" @click="cambiarClave">Cambiar contraseña</v-btn>
      </v-form>
    </v-sheet>
  </v-container>
</template>

<script setup lang="ts">
import {ref,reactive,computed} from 'vue'
import {useRoute,useRouter} from 'vue-router'
import {useEstadoAlerta} from "../stores/estadoAlerta"
import {useSesionUsuario} from "../stores/sesionUsuario"
import {useValidarClaveUno} from "../composables/validadores"
import axios from 'axios'
import type {AxiosError,AxiosResponse} from 'axios'
import type {NuevaClave} from "../types/interfaces"
import BarraProgresoAviso from "../components/BarraProgresoAviso.vue"

const mostrarFormulario=ref<boolean>(true)
const route = useRoute()
const router= useRouter()
const alert = useEstadoAlerta()
const sesion = useSesionUsuario()

const nuevaClave = reactive<NuevaClave>({
  email:route.params.email.toString(),
  passwordUno:'',
  passwordDos:''
})

const activarCambiarClave = computed<boolean>(()=>{
  if(nuevaClave.passwordUno.length >= 5 && nuevaClave.passwordUno === nuevaClave.passwordDos){
    return false
  }
  return true
})

const validarClave = [ (value:string) => {

        if(value === nuevaClave.passwordUno) return true

        return 'Su clave debe coincidir'
      }]

const cambiarClave = ():void => {
  // console.log("nueva clave", nuevaClave)
  axios.put(import.meta.env.VITE_API_CAMBIAR_CLAVE_USUARIO+route.params.token, nuevaClave)
    .then((res:AxiosResponse) => {
      mostrarFormulario.value = false
      alert.gestionarRespuesta(res)
      console.log(res)
      setTimeout(() => {
        router.push({name:'Autenticar usuario'})
      }, 3000);
    })
    .catch((err:AxiosError) => {

      mostrarFormulario.value = false
      alert.gestionarError(err)

      setTimeout(() => {
        mostrarFormulario.value = true
      }, 3000);
    })
}
</script>

<style scoped>
</style>
