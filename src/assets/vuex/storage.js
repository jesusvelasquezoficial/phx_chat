import Vue from 'vue';
import Vuex from 'vuex';
import Axios from 'axios';
// import User from "./modules/user";

Vue.use(Vuex, Axios);

export default new Vuex.Store({
  // strict: true,
  state: {
    user: null,
    token: localStorage.getItem('id_token') || null
  },
  getters: {
    getUser: state => {
      return state.token
    },
    getUserName: (state) => {
      console.log(state.user);
      console.log(state.token);
      return state
    }
  },
  actions: {
    LOGIN({commit}, payload){
      Axios.post('https://192.168.1.3:4001/api/login', payload)
      .then((resp, status) => {
        let data = resp.data.data
        localStorage.setItem('id_token', data.id)
        localStorage.setItem('v_username', data.username)
        localStorage.setItem('v_email', data.email)

        // AQUI VA EL TOKEN NO EL ID (ESTO VIENE DE PHOENIX SERVER)
        window.userToken = data.id
        localStorage.setItem('token', data.id)
        commit('LOGIN', data)
        let tok = localStorage.getItem("id_token")
        console.log(data);
        console.log(tok);
        console.log(localStorage.getItem("id_token"))
        
        // location.reload()
        
      })
      .catch(e => console.log(e))
    }
  },
  mutations: {
    LOGIN(state, payload) {
      state.user = payload
      console.log(state.user);
      console.log(state.token);
    }
  }
  // modules: {
  //   user: User
  // }
})