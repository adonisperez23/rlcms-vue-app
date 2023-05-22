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
    <v-row v-if="mostrarLista && !alert.mostrarAlert" justify="end">
      <v-col v-if="lista.listaPedidos.length === 0">
        <h3>
          No hay pedidos realizados en la lista!
        </h3>
      </v-col>
      <v-col v-else cols="12">

        <v-table>

          <thead>
            <tr>
              <th class="text-left">
                Producto
              </th>
              <th class="text-center">
                Cantidad
              </th>
              <th class="text-center">
                Precio
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
            <td class="text-center">{{ producto.cantidad }}</td>
            <td class="text-center">$ {{ producto.precio }}</td>
            <td class="text-center">{{ producto.precio * producto.cantidad}}</td>
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

      <v-col v-if="lista.listaPedidos.length > 0" cols="4">
        <v-card color="yellow-lighten-4" title="Monto Total:">
          <v-card-text class="text-h4">
            $ {{montoTotal}}
          </v-card-text>
          <v-card-actions>
            <v-btn append-icon="mdi-send-circle-outline" variant="outlined" @click="enviarPedido" rounded="pill" color="blue">
              Enviar Pedido
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>

    </v-row>

  </v-container>
</template>

<script setup lang="ts">
import {onMounted,computed,ref} from 'vue'
import axios, {AxiosError} from 'axios'
import {Respuesta} from '../types/interfaces'
import {useSesionUsuario} from "../stores/sesionUsuario"
import {useEstadoAlerta} from "../stores/estadoAlerta"
import BarraProgresoAviso from '../components/BarraProgresoAviso.vue'

const lista = useSesionUsuario()
const alert = useEstadoAlerta()

const mostrarLista = ref<boolean>(false)

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
  axios.post(import.meta.env.VITE_API_GENERAR_FACTURA,{usuario:lista.informacionUsuario.id,listaPedidos:lista.listaPedidos})
    .then((res:Respuesta)=>{
      console.log("pedido",res)
      alert.gestionarRespuesta(res)
    })
    .catch((err:AxiosError)=>{
      console.log("error al enviar pedido", err)
      alert.gestionarError(err)
    })

}

</script>

<style scoped>
</style>
