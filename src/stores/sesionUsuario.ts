import { reactive,ref } from 'vue'
import { defineStore } from 'pinia'
import type { Usuario,Pedido } from "../types/interfaces.ts"

export const useSesionUsuario = defineStore('lista-pedidos', () => {

  const estadoSesion = ref<boolean>(false)

  let informacionUsuario = reactive<Usuario>({
    id:0,
    nombre:'',
    telefono:'',
    email:'',
    claveUno:'',
    esAdmin:false
  })

  const listaPedidos = reactive<Pedido[]>([])

  function eliminarPedido(indice:number):void {
    listaPedidos.splice(indice,1)
  }

  function abrirSesion():void {
    estadoSesion.value = !estadoSesion.value
  }

  function obtenerInformacionUsuario(usuario:Usuario):void {
    informacionUsuario.id = usuario.id
    informacionUsuario.nombre = usuario.nombre
    informacionUsuario.telefono = usuario.telefono
    informacionUsuario.email = usuario.email
    informacionUsuario.claveUno = usuario.claveUno
    informacionUsuario.esAdmin = usuario.esAdmin
  }

  function resetSesion():void {

    informacionUsuario.id = 0
    informacionUsuario.nombre = ''
    informacionUsuario.telefono = ''
    informacionUsuario.email = ''
    informacionUsuario.claveUno = ''
    informacionUsuario.esAdmin = false

    estadoSesion.value = false
  }

  return {
    listaPedidos,
    eliminarPedido,
    estadoSesion,
    informacionUsuario,
    abrirSesion,
    obtenerInformacionUsuario,
    resetSesion }
})
