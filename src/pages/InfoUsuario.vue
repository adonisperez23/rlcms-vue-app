<template>
<v-container>
  <v-sheet width="300" class="mx-auto">
    <v-alert
    v-show="alert.mostrarAlert"
    :color="alert.color"
    :icon="alert.icon"
    :text="alert.mensaje"
    ></v-alert>
    <v-form v-show="mostrarFormulario" fast-fail @submit.prevent>
      <div v-show="seleccion === 'Cambiar contraseña' ">
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
      </div>
      <div v-show="seleccion === 'Actualizar datos' ">
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
      </div>
      <v-btn v-show="seleccion === 'Cambiar contraseña'" @click="actualizarDatos">Actualizar</v-btn>
      <div class="d-flex">
        <v-switch
        v-model="seleccion"
        hide-details
        true-value="Cambiar contraseña"
        false-value="Actualizar datos"
        :label="`${seleccion}`"
        ></v-switch>
      </div>
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

const nuevaClave = reactive<NuevaClave>({
  email:sesion.informacionUsuario.email,
  passwordUno:'',
  passwordDos:''
})

const mostrarFormulario = ref<boolean>(true)
const seleccion = ref<string>('Cambiar contraseña')

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

const cambiarClave = ():void => {
  axios.put(import.meta.env.VITE_API_CAMBIAR_CLAVE_USUARIO+localStorage.getItem('token'), nuevaClave)
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
