<template>
 <v-container>
   <v-sheet width="300" class="mx-auto">
     <v-form v-show="mostrarFormulario" fast-fail @submit.prevent="registrarUsuario">
       <v-text-field
       v-model="nombre"
       :rules="useValidarNombre"
       label="Nombre Completo"
       ></v-text-field>
       <v-text-field
       v-model="email"
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
       v-model="telefono"
       :rules="useValidarTelefono"
       label="Numero de telefono"
       ></v-text-field>
       <v-text-field
       type="password"
       v-model="claveUno"
       :rules="useValidarClaveUno"
       label="Contraseña"
       ></v-text-field>
       <v-text-field
       type="password"
       v-model="claveDos"
       :rules="validarClave"
       label="Repita la contraseña"
       ></v-text-field>

       <v-btn :disabled="activarBoton" type="submit" block class="mt-2 mb-2">Registrarme</v-btn>
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
import {ref, computed} from 'vue'
import { useRouter } from 'vue-router'
import axios , {AxiosError} from 'axios'
import {Usuario,Respuesta} from "../types/interfaces"
import {useValidarEmail,useValidarNombre,useValidarTelefono} from "../composables/validadores"
import {useEstadoAlerta} from '../stores/estadoAlerta'

const router = useRouter()

const alert = useEstadoAlerta()

const mostrarFormulario = ref<boolean>(true)

const nombre = ref<string>('')
const email = ref<string>('')
const linea = ref<string>('')
const telefono = ref<string>('')
const claveUno = ref<string>('')
const claveDos = ref<string>('')

const activarBoton = computed<boolean>(()=>{
  if(nombre.value.length > 0 && email.value.length > 5 && claveUno.value.length >= 5 && claveDos.value === claveUno.value && telefono.value.length === 7 && linea.value.length === 6) return false

  return true
})


const validarClave = [ value => {

        if(value === claveUno.value) return true

        return 'Su clave debe coincidir'
      }]

const registrarUsuario = () =>{

  axios.post(import.meta.env.VITE_API_REGISTRAR_USUARIO, datosRegistro(nombre.value,email.value,linea.value, telefono.value, claveUno.value) )
    .then((respuesta:Respuesta)=>{

      alert.gestionarRespuesta(respuesta)

      mostrarFormulario.value = false

      setTimeout(() => {
        router.push('/login')
      }, 5000);

    })
    .catch((error:AxiosError)=>{

      mostrarFormulario.value = false

      alert.gestionarError(error)

      setTimeout(() => {
        mostrarFormulario.value = true
      }, 4000);

    })
}


function datosRegistro(nombre:string,email:string, linea:string, telefono:string, claveUno:string):Usuario {

  return {
    "nombre" : nombre,
    "email" : email,
    "telefono": linea + telefono,
    "clave" : claveUno,
  }

}


</script>

<style scoped>
</style>
