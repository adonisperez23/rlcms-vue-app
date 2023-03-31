<template>
  <v-container>
    <v-sheet width="300" class="mx-auto">
      <v-form v-show="mostrarFormulario" fast-fail @submit.prevent="autenticarUsuario">
        <v-text-field
        v-model="correo"
        label="Email"
        :rules="useValidarEmail"
        ></v-text-field>

        <v-text-field
        v-model="clave"
        type="password"
        label="Contraseña"
        ></v-text-field>

        <v-btn type="submit" block class="mt-2">Login</v-btn>
      </v-form>
      <v-progress-circular class="ml-16 mb-2 " v-show="!mostrarFormulario" indeterminate :size="117">Cargando...</v-progress-circular>
      <v-alert
      v-show="alert.mostrarAlert"
      :color="alert.color"
      :icon="alert.icon"
      :text="alert.mensaje"
      ></v-alert>
    </v-sheet>
  </v-container>
</template>

<script setup lang="ts">
import {ref} from 'vue';
import { useRouter } from 'vue-router'
import {useValidarEmail} from '../composables/validadores';
import {useEstadoAlerta} from '../stores/estadoAlerta';
import {useSesionUsuario} from '../stores/sesionUsuario'
import {Respuesta} from '../types/interfaces.ts'
import axios, {AxiosError} from 'axios'

// router
const router = useRouter()

const correo = ref<string>('');
const clave = ref<string>('');

// Store
const alert = useEstadoAlerta(); //maneja los estados de alert con componente registro y autenticacion de usuario
const sesion = useSesionUsuario()

const mostrarFormulario = ref<boolean>(true)

const autenticarUsuario = ():void=> {
    axios.post(import.meta.env.VITE_API_AUTENTICAR_USUARIO, datosLogin(correo.value,clave.value))
          .then((res:Respuesta)=>{

            mostrarFormulario.value = false

            alert.gestionarRespuesta(res);

            localStorage.setItem('token',res.data.token)

            sesion.abrirSesion()
            sesion.obtenerInformacionUsuario(res.data.usuario)

            setTimeout(() => {
              router.push('/menu')
            }, 4000);

            console.log("token", localStorage.getItem('token'))
          })
          .catch((err:AxiosError)=>{
            console.log("error",err)
            mostrarFormulario.value = false
            setTimeout(() => {
              mostrarFormulario.value = true
            }, 4000);
            alert.gestionarError(err);
          })

}
function datosLogin(correo:string,clave:string){
  return {
    "email":correo,
     "clave":clave
  }
}

</script>

<style scoped>
</style>
