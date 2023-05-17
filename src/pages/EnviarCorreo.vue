<template>
  <v-container>
    <v-sheet width="300" class="mx-auto" color="#fcecd2">

      <v-progress-circular class="ml-16 mb-2 " v-show="!mostrarFormulario" indeterminate :size="117">Cargando...</v-progress-circular>
      <v-alert
      v-show="alert.mostrarAlert"
      :color="alert.color"
      :icon="alert.icon"
      :text="alert.mensaje"
      ></v-alert>
      <v-form v-show="mostrarFormulario" fast-fail @submit.prevent>
        <v-text-field
        v-model="correo"
        label="Email"
        :rules="useValidarEmail"
        ></v-text-field>
        <v-btn :disabled="correo.length < 1 " @click="enviarCorreo" block class="mt-2">Enviar correo</v-btn>
      </v-form>

    </v-sheet>
  </v-container>
</template>

<script setup lang="ts">
import {ref} from 'vue'
import {useEstadoAlerta} from "../stores/estadoAlerta"
import {useSesionUsuario} from "../stores/sesionUsuario"
import {useValidarEmail} from "../composables/validadores"
import axios,{AxiosError} from "axios"
import {Respuesta} from "../types/interfaces"

const mostrarFormulario=ref<boolean>(true)

const correo = ref<string>('')

const alert = useEstadoAlerta()

function enviarCorreo():void {
  axios.post(import.meta.env.VITE_API_ENVIAR_CORREO_RECUPERACION, {email:correo.value})
    .then((res:Respuesta)=>{

      mostrarFormulario.value = false

      alert.gestionarRespuesta(res)

      console.log("respuesta", res)

      setTimeout(() => {
        mostrarFormulario.value = true
      }, 3000);
    })
    .catch((err:AxiosError)=>{

      mostrarFormulario.value = false

      alert.gestionarError(err)

      console.log("error",err)

      setTimeout(() => {
        mostrarFormulario.value = true
      }, 3000);
    })
}

</script>

<style lang="css" scoped>
</style>
