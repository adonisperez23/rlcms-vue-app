import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import {AxiosError} from 'axios';

interface Respuesta {
  data:string,
  status:number,
  headers:string,
}

export const useEstadoAlerta = defineStore('alerta', () => {
  const mensaje = ref('')
  const icon = ref('$success')
  const color = ref('success')
  const mostrarAlert = ref(false)

  function gestionarError(err:AxiosError):void {
    mensaje.value = err.response.data.error
    icon.value ='$error'
    color.value ='error'
    mostrarAlert.value = true

    setTimeout(() => {
      mostrarAlert.value = false
    }, 3000);

  }
  function gestionarRespuesta(res:Respuesta):void {
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
