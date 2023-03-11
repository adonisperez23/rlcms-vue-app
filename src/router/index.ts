import { createRouter, createWebHistory } from 'vue-router'
import AutenticarUsuario from '../pages/AutenticarUsuario.vue'
import RegistroUsuario from '../pages/RegistroUsuario.vue'
import Menu from '../pages/Menu.vue'
import PaginaPrincipal from '../layouts/PaginaPrincipal.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'pagina-principal',
      component: PaginaPrincipal,
      children:[
        {
          path: '/signin',
          name: 'registro-usuario',
          component: RegistroUsuario
        },
        {
          path: '/login',
          name: 'autenticar-usuario',
          component: AutenticarUsuario
        },
        {
          path: '/menu',
          name: 'menu',
          component: Menu
        }
      ]
    },
  ]
})

export default router
