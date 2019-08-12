import Home_Default from './assets/vue/pages/home.vue';

import Login from './assets/vue/pages/Login.vue';
import Signin from './assets/vue/pages/Signin.vue';
import Home from './assets/vue/pages/home2.vue'; // cambiar a -->' ./assets/vue/pages/home.vue '
import RegistroExitoso from './assets/vue/pages/registro-exitoso.vue'; 
import Contactos from './assets/vue/pages/contactos.vue'; 
import MenuLateral from './assets/vue/pages/menu-lateral.vue'; 

import AboutPage from './assets/vue/pages/about.vue';
import FormPage from './assets/vue/pages/form.vue';
import DynamicRoutePage from './assets/vue/pages/dynamic-route.vue';

import PanelLeftPage from './assets/vue/pages/panel-left.vue';
import ColorThemes from './assets/vue/pages/color-themes.vue';
import Chat from './assets/vue/pages/chat.vue';
import Vuex from './assets/vue/pages/vuex.vue';

import Auth from './assets/auth';

// Guardianes de Autenticacion
const auth = (routeTo, routeFrom, resolve, reject) => {
  if (!Auth.user.authenticated) {
    resolve({ component: Login })
  } else {
    resolve({ 
      // component: Home_Default
      component: Home
    })
  }
}

export default [
  {
    path: '/login/',
    component: Login
  },
  {
    path: '/signin/',
    component: Signin
  },
  {
    path: '/',
    async: auth
  },
  {
    path: '/registro-exitoso/',
    component: RegistroExitoso
  },
  {
    path: '/contactos/',
    component: Contactos
  },
  {
    path: '/menu-lateral/',
    component: MenuLateral
  },
  {
    path: '/about/',
    component: AboutPage
  },
  {
    path: '/form/',
    component: FormPage
  },
  {
    path: '/dynamic-route/blog/:blogId/post/:postId/',
    component: DynamicRoutePage
  },
  {
    path: '/panel-left/',
    component: PanelLeftPage
  },
  {
    path: '/color-themes/',
    component: ColorThemes
  },
  {
    path: '/chat/',
    component: Chat
  },
  {
    path: '/vuex/',
    component: Vuex
  },
];
