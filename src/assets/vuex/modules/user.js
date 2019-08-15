import { resolve } from "path";
import axios from "axios";

export default {
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
    login: ({commit}, payload) => {
      axios.post('https://192.168.1.3:4001/api/signin', payload).then((res)=>{
        console.log(res);
        console.log(res.json());
        commit('LOGIN',res)
      }).catch((error)=>{
        console.log(error)
        error
      })
    }
  },
  mutations: {
    LOGIN (state, payload) { 
      state.user = payload 
    }
  }
}