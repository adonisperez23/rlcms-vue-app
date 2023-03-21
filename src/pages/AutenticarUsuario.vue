<template>
  <v-sheet width="300" class="mx-auto">
    <v-form fast-fail @submit.prevent="autenticarUsuario">
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
      <v-alert
        v-show="alert.mostrarAlert"
        :color="alert.color"
        :icon="alert.icon"
        :text="alert.mensaje"
      ></v-alert>
    </v-form>
  </v-sheet>
</template>

<script setup lang="ts">
import {ref} from 'vue';
import {usePostAxios} from '../composables/axios.post';
import {useValidarEmail} from '../composables/validadores';
import {useEstadoAlerta} from '../stores/estadoAlerta';
import axios, {AxiosError} from 'axios'

interface Respuesta {
  data:string,
  status:number,
  headers:string,
}

const correo = ref<string>('');
const clave = ref<string>('');
const alert = useEstadoAlerta();

const autenticarUsuario = ():void=> {

    axios.post(import.meta.env.VITE_API_AUTENTICAR_USUARIO, datosLogin(correo.value,clave.value))
          .then((res:Respuesta)=>{
            alert.gestionarRespuesta(res);
            localStorage.setItem('token',res.data.token)
            console.log("token", localStorage.getItem('token'))
            console.log(res)
          })
          .catch((err:AxiosError)=>{
            alert.gestionarError(err);
          })

 // axios.post(import.meta.env.VITE_API_AUTENTICAR_USUARIO,{"email":correo.value,"clave":clave.value})
 // .then((res:Respuesta)=>{console.log("respuesta buena",res)})
 // .catch((err:AxiosError)=>{ console.log("respuesta mala", err)})
 // console.log("data",data)
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
