import { createRouter, createWebHistory,createWebHashHistory } from 'vue-router'
import AutenticarUsuario from '../pages/AutenticarUsuario.vue'
import RegistroUsuario from '../pages/RegistroUsuario.vue'
import Menu from '../pages/Menu.vue'
import PaginaPrincipal from '../layouts/PaginaPrincipal.vue'
import Pedidos from '../pages/ListaPedidos.vue'
import InfoUsuario from '../pages/InfoUsuario.vue'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Pagina principal',
      component: PaginaPrincipal,
      children:[
        {
          path: '/signin',
          name: 'Registro usuario',
          component: RegistroUsuario
        },
        {
          path: '/login',
          name: 'Autenticar usuario',
          component: AutenticarUsuario
        },
        {
          path: '/menu',
          name: 'Menu',
          component: Menu
        },
        {
          path: '/lista-pedidos',
          name: 'Lista Pedidos',
          component: Pedidos
        },
        {
          path: '/informacion-usuario',
          name: 'Informacion de Usuario',
          component: InfoUsuario,
        },
        {
          path: '/enviar-correo',
          name: 'Enviar correo',
          component: ()=>import('../pages/EnviarCorreo.vue'),
        },
        {
          path: '/cambiar-clave/:email/:token',
          name: 'Cambiar clave',
          component: ()=>import('../pages/CambiarClave.vue'),
        },
        {
          path:'/operaciones-productos',
          name:'Operaciones con productos',
          component:()=>import('../pages/panel-control/AgregarProductos.vue')
        },
        {
          path:'/lista-productos',
          name:'Lista de productos',
          component:()=>import('../pages/panel-control/ListaProductos.vue')
        },
        {
          path:'/lista-Facturas',
          name:'Lista de Facturas',
          component:()=>import('../pages/panel-control/ListaFacturas.vue')
        }
      ]
    },
  ]
})

export default router
