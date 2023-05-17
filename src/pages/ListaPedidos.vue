<template>
  <v-container>
    <BarraProgresoAviso
      v-if="!mostrarLista"
      mensajeBarra="Cargando . . ."
      mensaje="Mostrando Lista de pedidos ..."
      noMostrarAlert
    />
    <v-row justify="end">
      <v-col v-if="lista.listaPedidos.length === 0">
        <div class="text-h3">
          No hay pedidos realizados en la lista!
        </div>
      </v-col>
      <v-col v-else-if="mostrarLista" cols="12">

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
            <td>{{ producto.nombreProducto }} <br> {{producto.contornosSeleccionados}} </td>
            <td class="text-center">{{ producto.cantidad }}</td>
            <td class="text-center">{{ producto.precio }}</td>
            <td class="text-center">{{ producto.precio * producto.cantidad}}</td>
            <td class="text-center">
              <v-chip
                @click="lista.eliminarPedido(index)"
                icon="mdi-blinds">
                  Eliminar
              </v-chip>
            </td>
          </tr>
        </tbody>

      </v-table>

      </v-col>

      <v-col v-if="lista.listaPedidos.length > 0" cols="4">
        <v-card title="Monto Total:">
          <v-card-text class="text-h4">
            $ {{montoTotal}}
          </v-card-text>
          <v-card-actions>
            <v-btn variant="outlined" @click="enviarPedido" rounded="pill" color="primary">
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

const mostrarLista = ref<boolean>(true)

onMounted(()=>{
  console.log(lista.listaPedidos)
})


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
      mostrarLista.value = false
      alert.gestionarRespuesta(res)

      setTimeout(() => {
        mostrarLista.value = true
      }, 3000);
    })
    .catch((err:AxiosError)=>{
      console.log("error al enviar pedido", err)
      mostrarLista.value = false
      alert.gestionarError(err)

      setTimeout(() => {
        mostrarLista.value = true
      }, 3000);
    })

}

</script>

<style scoped>
</style>
