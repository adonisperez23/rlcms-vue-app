import { createRouter, createWebHistory } from 'vue-router'
import AutenticarUsuario from '../pages/AutenticarUsuario.vue'
import RegistroUsuario from '../pages/RegistroUsuario.vue'
import Menu from '../pages/Menu.vue'
import PaginaPrincipal from '../layouts/PaginaPrincipal.vue'
import Pedidos from '../pages/ListaPedidos.vue'
import InfoUsuario from '../pages/InfoUsuario.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
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
        }
      ]
    },
  ]
})

export default router
