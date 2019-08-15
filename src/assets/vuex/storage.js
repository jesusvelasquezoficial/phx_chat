import Vue from 'vue';
import Vuex from 'vuex';
import Axios from 'axios';
// import User from "./modules/user";

Vue.use(Vuex, Axios);

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
    getUser: state => {
      return state.user
    },
    getUserName: (state, getters) => {
      return getters.getUser.username
    }
  },
  actions: {
    async LOGIN({commit}, payload){
      const response = await Axios.post('https://10.0.1.7:4001/api/login', payload)
      .then((data, status) => {
      return data.data
      })
      .catch(e => console.log(e))
      commit('LOGIN', response.data.data)  
    }
  },
  mutations: {
    LOGIN(state, payload) {
      state.user = payload
    }
  }
  // modules: {
  //   user: User
  // }
})