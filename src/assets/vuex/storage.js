import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  // strict: true,
  state: {
    user: {
      id: 1,
      username: 'Nombre Apellido',
      email: 'Correo@gmail.com'
    }
  },
  getters: {
    getUser: (state) => {
      return state.user
    },
    getUserName: state => state.user.username
  },
  actions: {
     setUser: async function (context, user){
      context.commit('SET_USER', user)
    }
  },
  mutations: {
    SET_USER (state, param) { 
      state.user = param 
    }
  }
})