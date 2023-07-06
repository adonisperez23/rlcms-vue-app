import { createRouter, createWebHistory,createWebHashHistory} from 'vue-router'
import type {RouteLocationNormalized}  from 'vue-router'
import AutenticarUsuario from '../pages/AutenticarUsuario.vue'
import RegistroUsuario from '../pages/RegistroUsuario.vue'
import Menu from '../pages/Menu.vue'
import PlantillaPrincipal from '../layouts/PlantillaPrincipal.vue'
import Pedidos from '../pages/ListaPedidos.vue'
import InfoUsuario from '../pages/InfoUsuario.vue'
import Home from '../pages/Home.vue'
import QuienesSomos from '../pages/QuienesSomos.vue'

function esAdminAuthenticado(to:RouteLocationNormalized) {
  if(to.meta.requiereAuthAdmin && localStorage.getItem('esAdmin')) return true

  return {path:"/menu"}
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Plantilla principal',
      component: PlantillaPrincipal,
      redirect: '/home',
      children:[
        // Rutas para todos los usuarios
        {
          path: '/home',
          component:Home,
        },
        {
          path: '/about-us',
          component:QuienesSomos
        },
        {
          path: '/signin',
          name: 'Registrar usuario',
          component: RegistroUsuario
        },
        {
          path: '/login',
          name: 'Iniciar sesion',
          component: AutenticarUsuario
        },
        {
          path: '/menu',
          name: 'Menu',
          component: Menu
        },
        //----------------------------------------------------------------------
        // Rutas Para usuarios registrados y autenticados
        {
          path: '/lista-pedidos',
          name: 'Lista Pedidos',
          component: Pedidos,
          meta:{requiereAuth:true},
        },
        {
          path: '/informacion-usuario',
          name: 'Informacion de Usuario',
          component: InfoUsuario,
          meta:{requiereAuth:true},
        },
        {
          path: '/mispedidos',
          name: 'Pedidos de usuario',
          component: ()=>import('../pages/FacturasUsuario.vue'),
          meta:{requiereAuth:true},
        },
        //----------------------------------------------------------------------
        //Rutas para recuperacion de clave de usaurio
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
        //------------------------------------------------------------
        //Rutas accesibles solo para usuario con permiso de Administrador
        {
          path:'/operaciones-productos',
          name:'Operaciones con productos',
          component:()=>import('../pages/panel-control/AgregarProductos.vue'),
          meta:{requiereAuthAdmin:true},
          beforeEnter:[esAdminAuthenticado]
        },
        {
          path:'/lista-productos',
          name:'Lista de productos',
          component:()=>import('../pages/panel-control/ListaProductos.vue'),
          meta:{requiereAuthAdmin:true},
          beforeEnter:[esAdminAuthenticado]
        },
        {
          path:'/lista-Facturas',
          name:'Lista de Facturas',
          component:()=>import('../pages/panel-control/ListaFacturas.vue'),
          meta:{requiereAuthAdmin:true},
          beforeEnter:[esAdminAuthenticado]
        },
        {
          path:'/subir-foto',
          name:'Subir Foto',
          component:()=>import('../pages/panel-control/SubirFoto.vue'),
          meta:{requiereAuthAdmin:true},
          beforeEnter:[esAdminAuthenticado]
        },
        {
          path:'/lista-fotos',
          name:'Lista de fotos',
          component:()=>import('../pages/panel-control/ListaFotos.vue'),
          meta:{requiereAuthAdmin:true},
          beforeEnter:[esAdminAuthenticado]
        },
        {
          path:'/sesion-whatsapp',
          name:'Configuracion de sesion de mensajeria de whatsapp',
          component:()=>import('../pages/panel-control/SesionWhatsapp.vue'),
          meta:{requiereAuthAdmin:true},
          beforeEnter:[esAdminAuthenticado]
        },
        { path: '/:pathMatch(.*)*', name: 'NotFound', component: ()=>import('../pages/NotFound.vue') },
      ]
    },
  ]
})

export default router
