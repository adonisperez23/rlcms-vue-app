import { reactive,ref } from 'vue'
import { defineStore } from 'pinia'
import type { Usuario,Pedido } from "../types/interfaces.js"

export const useSesionUsuario = defineStore('lista-pedidos', () => {
//Variables para manejar el estado de la sesion
  const estadoSesion = ref<boolean>(false)

  function abrirSesion():void {
    estadoSesion.value = !estadoSesion.value
  }
// Variables que contienen la informacion del usuario en toda la app
  let informacionUsuario = reactive<Usuario>({
    id:0,
    nombre:'',
    telefono:'',
    email:'',
    clave:'',
    esAdmin:false
  })

  function obtenerInformacionUsuario(usuario:Usuario):void {
    informacionUsuario.id = usuario.id
    informacionUsuario.nombre = usuario.nombre
    informacionUsuario.telefono = usuario.telefono
    informacionUsuario.email = usuario.email
    informacionUsuario.clave = usuario.clave
    informacionUsuario.esAdmin = usuario.esAdmin
  }

  function resetSesion():void {

    informacionUsuario.id = 0
    informacionUsuario.nombre = ''
    informacionUsuario.telefono = ''
    informacionUsuario.email = ''
    informacionUsuario.clave = ''
    informacionUsuario.esAdmin = false

    estadoSesion.value = false
  }

  //Variable que contiene todos los pedidos realizados por el cliente
  const listaPedidos = reactive<Pedido[]>([])

  function eliminarPedido(indice:number):void {
    listaPedidos.splice(indice,1)
  }

  function vaciarLista():void {
    listaPedidos.length = 0
  }

  function agregarPedido(pedido:Pedido) {
    if(listaPedidos.some(ped => (ped.nombreProducto === pedido.nombreProducto) && (ped.descripcion === pedido.descripcion))){ //verifica si existe dentro de la lista un pedido igual al seleccionado

      let pedidoEncontrado:Pedido|undefined;
      let index:number;

      pedidoEncontrado = listaPedidos.find(ped => (ped.nombreProducto === pedido.nombreProducto) && (ped.descripcion === pedido.descripcion)) //obtiene el producto dentro de la lista igual al seleccionado por el usuario
      if(pedidoEncontrado !== undefined){
        index = listaPedidos.indexOf(pedidoEncontrado) // obtiene el indice del producto dentro de la lista de pedidos
        pedido.cantidad += pedidoEncontrado.cantidad // Se suman las cantidades del producto dentro de la lista y el producto que ha sido igual al producto seleccionado por el cliente
        listaPedidos.splice(index,1) // elimina el producto dentro de la lista
        listaPedidos.push(pedido)// agrega el producto con las cantidades sumadas anteriormente
      }

    } else {
      listaPedidos.push(pedido) // si no hay coicidencia de productos dentro de la lista, se agrega un nuevo producto
    }
  }
  const estadoLocalComercial = ref<boolean>(false)

  function abrirLocalComercial():void {
    estadoLocalComercial.value = false
  }

  function cerrarLocalComercial():void {
    estadoLocalComercial.value = true
  }



  return {
    estadoLocalComercial,
    abrirLocalComercial,
    cerrarLocalComercial,
    listaPedidos,
    vaciarLista,
    eliminarPedido,
    agregarPedido,
    estadoSesion,
    informacionUsuario,
    abrirSesion,
    obtenerInformacionUsuario,
    resetSesion }
})
