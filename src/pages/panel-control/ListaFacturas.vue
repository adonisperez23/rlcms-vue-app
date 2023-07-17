<template>
  <v-container>
    <BarraProgresoAviso
      v-if="cargandoLista"
      mensajeBarra="Cargando . . ."
      mensaje="Mostrando Lista de facturas ..."
      noMostrarAlert
    />
    <v-row justify="center" v-else>
      <div v-if="listaVacia" class="text-center">
        <v-sheet color="#f9cf57" rounded>
          <h1 >
            No hay facturas generadas por los momentos...
          </h1>
          <v-icon
          color="red"
          size="100"
          >
          mdi-script-text-outline
        </v-icon>
        </v-sheet>
      </div>
      <div v-if="errorServidor" class="text-center">
        <v-sheet color="#f9cf57" rounded>
          <h1 >
            ¡Ha ocurrido un error al cargar lista de facturas!
          </h1>
          <v-icon
          color="red"
          size="100"
          >
          mdi-server-network-off
          </v-icon>
        </v-sheet>
      </div>

      <v-table class="color-fondo" v-else-if="listaFacturas.length > 0">
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
            <v-chip color="blue" prepend-icon="mdi-list-box-outline" @click="mostrarPedido(factura.pedido)">
              Ver Pedidos
            </v-chip>
          </td>
        </tr>
      </tbody>
    </v-table>

    </v-row>
        <Aviso
        unaAccion
        :mensaje="propsAviso.mensaje"
        @activar-aviso="propsAviso.activarAviso=false"
        :dialog="propsAviso.activarAviso">
        <template v-slot:lista>

            <v-table class="color-fondo">
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
          <v-divider></v-divider>
          <h3 class="text-left mt-1">Monto Total: $ {{montoTotal}}</h3>
      </template>
    </Aviso>
  </v-container>
</template>

<script setup lang="ts">
import {ref,reactive,computed} from 'vue'
import axios from 'axios'
import Aviso from '../../components/Aviso.vue'
import BarraProgresoAviso from '../../components/BarraProgresoAviso.vue'
import type {AxiosError,AxiosResponse} from 'axios'
import type {Factura,Modal,PedidoProducto} from '../../types/interfaces'

const listaFacturas = ref<Factura[]>([])
const listaPedidos = ref<PedidoProducto[]>([])
const cargandoLista = ref<boolean>(false)
const listaVacia = ref<boolean>(false)
const errorServidor = ref<boolean>(false)

const propsAviso = reactive<Modal>({
  activarAviso:false,
  mensaje:'Pedido',
})

axios.get(import.meta.env.VITE_API_LISTA_FACTURA,{headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } })
  .then((res:AxiosResponse)=>{
    cargandoLista.value = true
    setTimeout(() => {
      listaFacturas.value = res.data
      cargandoLista.value = false
      estaListaVacia(listaFacturas.value)
    }, 2000);
  })
  .catch((err:AxiosError)=>{
    errorServidor.value = true
    console.log("error al cargar lista de facturas", err)
  })

function mostrarPedido(lista:PedidoProducto[]):void {
  propsAviso.activarAviso = true
  listaPedidos.value = lista
  // console.log("pedidos",lista)
}

function estaListaVacia(lista:Factura[]) {
  if(lista.length > 0) return listaVacia.value=false
  return listaVacia.value=true
}
const montoTotal = computed<number>(()=>{

  let total:number = 0

  listaPedidos.value.forEach(producto => {
    total += producto.cantidad * producto.precio
  });

  return total
})

</script>

<style scoped>
</style>
