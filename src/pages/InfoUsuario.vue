<template>
<v-container>
  <v-sheet width="300" class="mx-auto">
    <v-alert
    v-show="alert.mostrarAlert"
    :color="alert.color"
    :icon="alert.icon"
    :text="alert.mensaje"
    ></v-alert>
    <v-form v-show="mostrarFormulario" fast-fail @submit.prevent="actualizarDatos">

        <v-text-field
        v-model="sesion.informacionUsuario.nombre"
        :rules="useValidarNombre"
        label="Nombre Completo"
        ></v-text-field>
        <v-text-field
        readonly
        v-model="sesion.informacionUsuario.email"
        :rules="useValidarEmail"
        label="Correo electronico"
        prepend-inner-icon="mdi-email-outline"
        ></v-text-field>
        <v-select
        label="Linea telefonica"
        v-model="linea"
        :items="['+58414', '+58424', '+58426', '+58416', '+58426']"
        ></v-select>
        <v-text-field
        v-model="numero"
        :rules="useValidarTelefono"
        label="Numero de telefono"
        ></v-text-field>
        <v-btn type="submit">Actualizar Datos</v-btn>
    </v-form>
  </v-sheet>
</v-container>
</template>

<script setup lang="ts">
import {ref,reactive, onMounted,computed} from "vue"
import axios, {AxiosError} from 'axios'
import {useValidarEmail,useValidarNombre,useValidarTelefono,useValidarClaveUno} from "../composables/validadores"
import {useSesionUsuario} from "../stores/sesionUsuario"
import {Usuario,Respuesta,NuevaClave} from "../types/interfaces"
import {useEstadoAlerta} from "../stores/estadoAlerta"

onMounted(()=>{
  console.log("datos actualizar", datosActualizar)
})

const sesion = useSesionUsuario()
const alert = useEstadoAlerta()

const linea = ref<string>(`${sesion.informacionUsuario.telefono.slice(0,-7)}`)
const numero = ref<string>(`${sesion.informacionUsuario.telefono.slice(6)}`)
const datosActualizar = reactive<Usuario>({
  id:sesion.informacionUsuario.id.toString(),
  nombre:sesion.informacionUsuario.nombre,
  email:sesion.informacionUsuario.email,
  telefono:linea.value + numero.value
})

const mostrarFormulario = ref<boolean>(true)

const actualizarDatos = ():void => {
  axios.put(import.meta.env.VITE_API_ACTUALIZAR_USUARIO+datosActualizar.id, datosActualizar)
    .then((res:Resultado) => {
      mostrarFormulario.value = false
      alert.gestionarRespuesta(res)
      console.log(res)
      setTimeout(() => {
        mostrarFormulario.value = true
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
