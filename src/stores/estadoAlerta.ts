import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import {isAxiosError} from 'axios'
import type {AxiosError,AxiosResponse} from 'axios'
// import type {AxiosError} from 'axios';
// import type {Respuesta} from '../types/interfaces'

export const useEstadoAlerta = defineStore('alerta', () => {
  const mensaje = ref<string>('')
  const icon = ref<string>('$success')
  const color = ref<string>('success')
  const mostrarAlert = ref<boolean>(false)

  function gestionarError(err:unknown):void {
      if(isAxiosError(err)){
        mensaje.value = err.response?.data.error
        icon.value ='$error'
        color.value ='error'
        mostrarAlert.value = true

        setTimeout(() => {
          mostrarAlert.value = false
        }, 3000);
       }
  }

  function gestionarRespuesta(res:AxiosResponse):void {
    mensaje.value = res.data.mensaje
    icon.value ='$success'
    color.value ='success'
    mostrarAlert.value = true

    setTimeout(() => {
      mostrarAlert.value = false
    }, 3000);

  }

  return { mensaje,icon,color,mostrarAlert,gestionarError,gestionarRespuesta }
})
