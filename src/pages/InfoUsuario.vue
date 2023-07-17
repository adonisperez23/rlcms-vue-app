<template>
<v-container>
  <BarraProgresoAviso
  v-if="alert.mostrarAlert"
  mostrarAlert
  mensajeBarra="Cargando..."
  :colorAlert="alert.color"
  :iconoAlert="alert.icon"
  :mensajeAlert="alert.mensaje"
  />
  <v-sheet color="#fcecd2" width="300" class="mx-auto text-center">
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
        <v-btn prepend-icon="mdi-update" color="green" type="submit">Actualizar Datos</v-btn>
    </v-form>
  </v-sheet>

</v-container>
</template>

<script setup lang="ts">
import {ref,reactive, onMounted,computed} from "vue"
import axios from 'axios'
import type {AxiosError,AxiosResponse} from 'axios'
import {useValidarEmail,useValidarNombre,useValidarTelefono,useValidarClaveUno} from "../composables/validadores"
import {useSesionUsuario} from "../stores/sesionUsuario"
import type {Usuario,NuevaClave} from "../types/interfaces"
import {useEstadoAlerta} from "../stores/estadoAlerta"
import BarraProgresoAviso from "../components/BarraProgresoAviso.vue"

// onMounted(()=>{
//   console.log("datos actualizar", datosActualizar)
// })

const sesion = useSesionUsuario()
const alert = useEstadoAlerta()

const linea = ref<string>(`${sesion.informacionUsuario.telefono.slice(0,-7)}`)
const numero = ref<string>(`${sesion.informacionUsuario.telefono.slice(6)}`)
const datosActualizar = reactive<Usuario>({
  id:sesion.informacionUsuario.id,
  nombre:sesion.informacionUsuario.nombre,
  email:sesion.informacionUsuario.email,
  telefono:linea.value + numero.value
})

const mostrarFormulario = ref<boolean>(true)

const actualizarDatos = ():void => {
  axios.put(import.meta.env.VITE_API_ACTUALIZAR_USUARIO+datosActualizar.id?.toString(), datosActualizar,
  {headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } })
    .then((res:AxiosResponse) => {
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
