import Axios from 'axios';

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
    LOGIN: async function({commit}, payload){
      console.log(payload);
      
      try {
        await Axios.post('https://192.168.1.3:4001/api/signin', payload)
        .then((response) => {
          console.log(response.data);
          
        })
        .catch((error)=>{
          console.log(error.response)
          
        })
      } catch (error) {
        console.log(error.response);
        
      }
    }
  },
  mutations: {
    LOGIN(state, payload) {
      state.user = payload
    }
  }
}