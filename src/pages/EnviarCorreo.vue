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
        v-model="correo"
        label="Email"
        :rules="useValidarEmail"
        ></v-text-field>
        <v-btn prepend-icon="mdi-email-fast-outline" color="green" :disabled="correo.length < 1 " @click="enviarCorreo" block class="mt-2">Enviar correo</v-btn>
      </v-form>
    </v-sheet>
  </v-container>
</template>

<script setup lang="ts">
import {ref} from 'vue'
import {useEstadoAlerta} from "../stores/estadoAlerta"
import {useSesionUsuario} from "../stores/sesionUsuario"
import {useValidarEmail} from "../composables/validadores"
import axios from 'axios'
import type {AxiosError,AxiosResponse} from 'axios'
import BarraProgresoAviso from "../components/BarraProgresoAviso.vue"

const mostrarFormulario=ref<boolean>(true)

const correo = ref<string>('')

const alert = useEstadoAlerta()

function enviarCorreo():void {
  axios.post(import.meta.env.VITE_API_ENVIAR_CORREO_RECUPERACION, {email:correo.value})
    .then((res:AxiosResponse)=>{

      mostrarFormulario.value = false

      alert.gestionarRespuesta(res)

      // console.log("respuesta", res)

      setTimeout(() => {
        mostrarFormulario.value = true
      }, 3000);
    })
    .catch((err:AxiosError)=>{

      mostrarFormulario.value = false

      alert.gestionarError(err)

      // console.log("error",err)

      setTimeout(() => {
        mostrarFormulario.value = true
      }, 3000);
    })
}

</script>

<style lang="css" scoped>
</style>
