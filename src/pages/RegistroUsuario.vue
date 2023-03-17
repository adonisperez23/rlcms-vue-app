<template>
 <div class="d-flex justify-center mt-16">
   <v-sheet width="300" class="mx-auto">
    <v-form fast-fail @submit.prevent="registrarUsuario">
      <v-text-field
        v-model="nombre"
        :rules="validarNombre"
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
        :rules="validarTelefono"
        label="Numero de telefono"
      ></v-text-field>
      <v-text-field
       type="password"
        v-model="claveUno"
        :rules="validarClaveUno"
        label="Contraseña"
      ></v-text-field>
      <v-text-field
        type="password"
        v-model="claveDos"
        :rules="validarClave"
        label="Repita la contraseña"
      ></v-text-field>

      <v-btn :disabled="activarBoton" type="submit" block class="mt-2 mb-2">Registrarme</v-btn>
      <v-alert
        v-show="alert.mostrarAlert"
        :color="alert.color"
        :icon="alert.icon"
        :text="alert.mensaje"
      ></v-alert>
    </v-form>
  </v-sheet>
 </div>
</template>

<script setup lang="ts">
import {ref, computed} from 'vue'
import axios , {AxiosError} from 'axios'
import {Usuario,Respuesta} from "../types/interfaces.ts"
import {useValidarEmail} from "../composables/validadores"
import {useEstadoAlerta} from '../stores/estadoAlerta'



const alert = useEstadoAlerta()

const nombre = ref('')
const email = ref('')
const linea = ref('')
const telefono = ref('')
const claveUno = ref('')
const claveDos = ref('')

const activarBoton = computed<boolean>(()=>{
  if(nombre.value.length > 0 && email.value.length > 5 && claveUno.value.length >= 5 && claveDos.value === claveUno.value && telefono.value.length === 7 && linea.value.length === 6) return false

  return true
})

const validarNombre = [ value => {

      if(value.length >= 3) return true

      return 'Su nombre debe contener mas de 2 caracteres'

    },

    value => {

      if (/^([a-zA-Z]+\s?){4}?$/.test(value) || value.length === 3) return true

      return 'Verifique que no tenga numeros, simbolos o que excesos de caracteres'

    },

    value =>{

    if (value.length <= 50) return true

    return 'Ha superado el limite de caracteres'

}]
const validarTelefono =[ value => {

      if(value.length === 7) return true

      return 'El numero de telefono no es valido'

}]
const validarClaveUno = [value => {

          if (value.length >= 5) return true

          return 'Su clave debe contener mas de 5 caracteres'

        }]

const validarClave = [ value => {

        if(value === claveUno.value) return true

        return 'Su clave debe coincidir'
      }]

const registrarUsuario = () =>{

  axios.post(import.meta.env.VITE_API_REGISTRAR_USUARIO, datosRegistro(nombre.value,email.value,linea.value, telefono.value, claveUno.value) )
    .then((respuesta:Respuesta)=>{

      alert.gestionarRespuesta(respuesta)

    })
    .catch((error:AxiosError)=>{

      alert.gestionarError(error)

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
