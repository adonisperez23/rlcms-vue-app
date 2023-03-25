import { reactive } from 'vue'
import { defineStore } from 'pinia'

export const useListaPedidos = defineStore('lista-pedidos', () => {

  const listaPedidos = reactive([])

  function eliminarPedido(indice:number):void {
    listaPedidos.splice(indice,1)
  }

  return { listaPedidos, eliminarPedido }
})
