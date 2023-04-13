<template>
  <v-container >
    <div v-if="errorServidor" class="text-h3">
      Ha ocurrido un error al cargar lista de facturas
    </div>
    <div v-else-if="listaFacturas.length === 0" class="text-h3">
      No hay facturas generadas por los momentos...
    </div>
    <v-table v-else>
      <thead>
        <tr>
          <th class="text-center">
            ID Factura
          </th>
          <th class="text-center">
            Fecha y Hora
          </th>
          <th class="text-center">
            Usuario
          </th>
          <th class="text-center">
            Coreo Electronico
          </th>
          <th class="text-center">
            Telefono
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(factura, index) in listaFacturas"
          :key="index"
        >
          <td class="text-center">{{ factura.id }}</td>
          <td class="text-center">{{ $filters.dateFormat(factura.fechaHora) }}</td>
          <td class="text-center">{{ factura.usuario.nombre }}</td>
          <td class="text-center">{{ factura.usuario.email}}</td>
          <td class="text-center">{{ factura.usuario.telefono}}</td>
          <td class="text-center">
            <v-chip @click="mostrarPedido(factura.pedido)">
              Ver Pedidos
            </v-chip>
          </td>
        </tr>
      </tbody>
    </v-table>
        <Aviso
        unaAccion
        :mensaje="propsAviso.mensaje"
        @activar-aviso="propsAviso.activarAviso=false"
        :dialog="propsAviso.activarAviso">
        <template v-slot:lista>

            <v-table>
              <thead>
                <tr>
                  <th class="text-center">
                    Id Pedido
                  </th>
                  <th class="text-center">
                    Nombre del producto
                  </th>
                  <th class="text-center">
                    Descripcion
                  </th>
                  <th class="text-center">
                    Precio
                  </th>
                  <th class="text-center">
                    Cantidad
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr
                v-for="(pedido, index) in listaPedidos"
                :key="index"
                >
                <td class="text-center">
                  {{pedido.id}}
                </td>
                <td class="text-center">
                  {{pedido.producto.nombreProducto}}
                </td>
                <td class="text-center">
                  {{pedido.descripcion}}
                </td>
                <td class="text-center">
                  {{pedido.precio}}
                </td>
                <td class="text-center">
                  {{pedido.cantidad}}
                </td>
              </tr>
            </tbody>
          </v-table>

      </template>
    </Aviso>
  </v-container>
</template>

<script setup lang="ts">
import {ref,reactive} from 'vue'
import axios, {AxiosError} from 'axios'
import {Respuesta,Factura,Modal,Pedido} from '../../types/interfaces'
import Aviso from '../../components/Aviso.vue'

const listaFacturas = ref<Factura[]>([])
const errorServidor = ref<boolean>(false)
const listaPedidos = ref<Pedido[]>([])

const propsAviso = reactive<Modal>({
  activarAviso:false,
  mensaje:'Pedido',
})

axios.get(import.meta.env.VITE_API_LISTA_FACTURA)
  .then((res:Respuesta)=>{
    listaFacturas.value = res.data
  })
  .catch((err:AxiosError)=>{
    errorServidor.value = true
    console.log("error al cargar lista de facturas", err)
  })

function mostrarPedido(lista:Pedido[]):void {
  propsAviso.activarAviso = true
  listaPedidos.value = lista
  console.log("pedidos",lista)
}

</script>

<style scoped>
</style>
