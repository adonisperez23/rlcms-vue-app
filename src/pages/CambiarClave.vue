<template>
  <v-container>
    <v-sheet width="300" class="mx-auto">
      <v-progress-circular class="ml-16 mb-2 " v-show="!mostrarFormulario" indeterminate :size="117">Cargando...</v-progress-circular>
      <v-alert
      v-show="alert.mostrarAlert"
      :color="alert.color"
      :icon="alert.icon"
      :text="alert.mensaje"
      ></v-alert>
      <v-form v-show="mostrarFormulario" fast-fail @submit.prevent>

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

        <v-btn :disabled="activarCambiarClave" @click="cambiarClave">Cambiar contraseña</v-btn>
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
import axios,{AxiosError} from "axios"
import {Respuesta,NuevaClave} from "../types/interfaces"

const mostrarFormulario=ref<boolean>(true)
const route = useRoute()
const router= useRouter()
const alert = useEstadoAlerta()
const sesion = useSesionUsuario()

const nuevaClave = reactive<NuevaClave>({
  email:route.params.email,
  passwordUno:'',
  passwordDos:''
})

const activarCambiarClave = computed<boolean>(()=>{
  if(nuevaClave.passwordUno.length >= 5 && nuevaClave.passwordUno === nuevaClave.passwordDos){
    return false
  }
  return true
})

const validarClave = [ value => {

        if(value === nuevaClave.passwordUno) return true

        return 'Su clave debe coincidir'
      }]

const cambiarClave = ():void => {
  console.log("nueva clave", nuevaClave)
  axios.put(import.meta.env.VITE_API_CAMBIAR_CLAVE_USUARIO+route.params.token, nuevaClave)
    .then((res:Resultado) => {
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
