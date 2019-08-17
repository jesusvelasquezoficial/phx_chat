import Vue from 'vue';
import Vuex from 'vuex';
import Axios from 'axios';
// import User from "./modules/user";

Vue.use(Vuex, Axios);

export default new Vuex.Store({
  // strict: true,
  state: {
    user: JSON.parse(localStorage.getItem('user')) || null,
    token: localStorage.getItem('id_token') || null
  },
  getters: {
    getUser: state => {
      return state.user
    }
  },
  actions: {
    LOGIN({commit}, payload){
      // retornamos una promesa
      return new Promise((resolve, reject )=> {
        Axios.post('login', payload).then( (response) => {
          if (response.status === 201) {
            // almacenamos los datos JSON de la sesion
            let data = response.data.data
            
            localStorage.setItem('id_token', data.id)
            localStorage.setItem('v_username', data.username)
            localStorage.setItem('v_email', data.email)
    
            // AQUI VA EL TOKEN NO EL ID (ESTO VIENE DE PHOENIX SERVER)
            window.userToken = data.id
            localStorage.setItem('token', data.id)
            localStorage.setItem('user', JSON.stringify(data))
            // ejecutamos la mutacion
            commit('LOGIN', data)
            console.log(data);
            resolve(true)
            // location.reload()
          }else{
            // devolvemos error JSON
            reject(response.data.errors)
          }
        })
        // devolvemos el error inesperado SERVER
        .catch(e => reject(e))
      })
    }
  },
  mutations: {
    LOGIN(state, payload) {
      // almacenamos los datos de la sesion en user
      state.user = JSON.stringify(payload)
    }
  }
  // modules: {
  //   user: User
  // }
})