<template>
  <v-container>
    <BarraProgresoAviso
      v-show="!mostrarLista"
      mensajeBarra="Cargando . . ."
      mensaje="Mostrando Lista de pedidos ..."
      noMostrarAlert
    />
    <BarraProgresoAviso
      v-show="alert.mostrarAlert"
      mostrarAlert
      mensajeBarra="Enviando . . ."
      :mensajeAlert="alert.mensaje"
      :colorAlert="alert.color"
      :iconoAlert="alert.icon"
    />
    <v-row v-if="mostrarLista && !alert.mostrarAlert" justify="center">
      <v-col cols="8" align="center" v-if="lista.listaPedidos.length === 0">
        <v-sheet color="#f9cf57" rounded>
          <h1>
            ¡No hay pedidos realizados por los momentos!
          </h1>
          <v-icon
          color="red"
          size="200"
          >
          mdi-cart-off
          </v-icon>
        </v-sheet>
      </v-col>
      <v-col v-else cols="12">
        <v-sheet
        v-if="!isMobile"
        color="yellow-darken-2"
        max-height="120"
        rounded
         >

         <h4 class="text-center pt-1">
           <v-icon>
           mdi-alert-outline
           </v-icon>
           Usted está usando la app-web en una PC de escritorio,
           Debe usar la app-web en el navegador del telefono para poder enviar su pedido.
           Disculpe las molestias.
           <v-icon>
           mdi-alert-outline
           </v-icon>
         </h4>
       </v-sheet>
        <v-table>

          <thead>
            <tr>
              <th class="text-left">
                Producto
              </th>
              <th class="text-center">
                Precio
              </th>
              <th class="text-center">
                Cantidad
              </th>
              <th class="text-center">
                Monto
              </th>
            </tr>
          </thead>

          <tbody>
            <tr
            v-for="(producto,index) in lista.listaPedidos"
            :key="index"
            >
            <td>{{ producto.nombreProducto }} <br> {{producto.descripcion}} </td>
            <td class="text-center">$ {{ producto.precio }}</td>
            <td class="text-center">{{ producto.cantidad }}</td>
            <td class="text-center">$ {{ producto.precio * producto.cantidad}}</td>
            <td class="text-center">
              <v-chip
                color="red"
                @click="lista.eliminarPedido(index)"
                prepend-icon="mdi-eraser">
                  Eliminar
              </v-chip>
            </td>
          </tr>
        </tbody>

      </v-table>

      </v-col>

      <v-row  v-if="lista.listaPedidos.length > 0" justify="start">
        <v-col  :cols="colsMonto">
          <v-card width="200" color="yellow-lighten-4" title="Monto Total:">
            <v-card-text class="text-h4">
              $ {{montoTotal}}
            </v-card-text>

              <v-btn v-show="isMobile" class="ml-1" size="x-small" append-icon="mdi-send-circle-outline" variant="outlined" @click="enviarPedido" rounded="pill" color="blue">
                Enviar Pedido
              </v-btn>

              <v-btn  v-show="isMobile" class="ml-1" size="x-small" append-icon="mdi-send-circle-outline" variant="outlined" @click="armarNuevoPedido" rounded="pill" color="green">
                Armar nuevo pedido
              </v-btn>

          </v-card>
        </v-col>
      </v-row>
    </v-row>

  </v-container>
</template>

<script setup lang="ts">
import {onMounted,computed,ref,inject} from 'vue'
import type {Ref} from 'vue'
import axios from 'axios'
import type {AxiosError,AxiosResponse} from 'axios'
// import {Respuesta} from '../types/interfaces'
import {useSesionUsuario} from "../stores/sesionUsuario"
import {useEstadoAlerta} from "../stores/estadoAlerta"
import BarraProgresoAviso from '../components/BarraProgresoAviso.vue'
import {useRouter} from "vue-router"

const lista = useSesionUsuario()
const alert = useEstadoAlerta()

const router = useRouter()

const mostrarLista = ref<boolean>(false)

const isMobile = inject('isMobile') as Ref
const colsMonto = computed<number>(()=>{
  if(isMobile.value){
    return 6
  } else {
    return 4
  }
})

onMounted(()=>{
  console.log(lista.listaPedidos)
})
setTimeout(() => {
  mostrarLista.value = true
}, 3000);


const montoTotal = computed<number>(()=>{

  let total:number = 0

  lista.listaPedidos.forEach(producto => {
    total += producto.cantidad * producto.precio
  });

  return total
})

function enviarPedido():void {
  axios.post(import.meta.env.VITE_API_GENERAR_FACTURA,
    {usuario:lista.informacionUsuario.id,listaPedidos:lista.listaPedidos},
    {headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } })
    .then((res:AxiosResponse)=>{
      // console.log("pedido",res)
      alert.gestionarRespuesta(res)
      setTimeout(() => {
        armarEnlancePedido(res.data.mensajeEncoded)
      }, 3000);
    })
    .catch((err:AxiosError)=>{
      // console.log("error al enviar pedido", err)
      alert.gestionarError(err)
    })

}

function armarEnlancePedido(mensaje:string) {
  window.open(`https://api.whatsapp.com/send?phone=584249683161&text=${mensaje}+`)
}

function armarNuevoPedido():void {
  router.push('/menu')
  setTimeout(() => {
    lista.vaciarLista()
  }, 2000);
}

</script>

<style scoped>
</style>
