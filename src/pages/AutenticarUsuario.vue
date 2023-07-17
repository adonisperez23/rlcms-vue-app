<template>
  <v-container>
    <BarraProgresoAviso
      v-show="!mostrarFormulario"
      mensajeBarra="Cargando . . ."
      :mostrarAlert="alert.mostrarAlert"
      :colorAlert="alert.color"
      :iconoAlert="alert.icon"
      :mensajeAlert="alert.mensaje"
    />
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

        <v-btn append-icon="mdi-button-pointer" :disabled="activarBoton" color="green" type="submit" block class="mt-2">Login</v-btn>
        <v-btn append-icon="mdi-account-edit-outline" color="blue" :to="{name:'Enviar correo'}" block class="mt-2">¿Olvido su contraseña?</v-btn>
      </v-form>
    </v-sheet>


  </v-container>
</template>

<script setup lang="ts">
import {ref, computed} from 'vue';
import { useRouter } from 'vue-router'
import {useValidarEmail} from '../composables/validadores';
import {useEstadoAlerta} from '../stores/estadoAlerta';
import {useSesionUsuario} from '../stores/sesionUsuario'
import type {Usuario} from '../types/interfaces'
import axios from 'axios'
import type {AxiosError,AxiosResponse} from 'axios'
import BarraProgresoAviso from '../components/BarraProgresoAviso.vue'

// router
const router = useRouter()

const correo = ref<string>('');
const clave = ref<string>('');

// Store
const alert = useEstadoAlerta(); //maneja los estados de alert con componente registro y autenticacion de usuario
const sesion = useSesionUsuario()

const activarBoton = computed<boolean>(()=>{
  if(correo.value.length > 0 && clave.value.length >0) return false
  return true
})
const mostrarFormulario = ref<boolean>(true) //Variable que controla el momento en que el formulario se debe mostrar

const autenticarUsuario = ():void=> {
    axios.post(import.meta.env.VITE_API_AUTENTICAR_USUARIO, datosLogin(correo.value,clave.value))
          .then((res:AxiosResponse)=>{

            mostrarFormulario.value = false

            alert.gestionarRespuesta(res);

            localStorage.setItem('token',res.data.token)

            sesion.abrirSesion()
            sesion.obtenerInformacionUsuario(res.data.usuario)

            setDataInLocalStorage(res.data.usuario)

            setTimeout(() => {
              router.push('/menu')
            }, 4000);

            // console.log("token", localStorage.getItem('token'),localStorage.getItem('esAdmin'))
          })
          .catch((err:AxiosError)=>{
            // console.log("error",err)
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
function setDataInLocalStorage(usuario:Usuario):void {
  localStorage.setItem('nombre',usuario.nombre)
  localStorage.setItem('telefono',usuario.telefono)
  localStorage.setItem('email',usuario.email)
  if(usuario.esAdmin !== undefined && usuario.id !== undefined && usuario.clave !== undefined){
    localStorage.setItem('clave',usuario.clave.toString())
    localStorage.setItem('id',usuario.id.toString())
    localStorage.setItem('esAdmin',usuario.esAdmin.toString())
  }
}

</script>

<style scoped>
</style>
