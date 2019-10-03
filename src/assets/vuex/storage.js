import Vue from 'vue';
import Vuex from 'vuex';
import Axios from 'axios';
// import User from "./modules/user";

Vue.use(Vuex, Axios);
import {Socket , Presence} from 'phoenix'
import Auth from '../auth'
import { f7Gauge } from 'framework7-vue';

export default new Vuex.Store({
  // strict: true,
  state: {
    user: JSON.parse(localStorage.getItem('user')) || '',
    token: localStorage.getItem('id_token') || null,

    socket: null,
    channel: null,
    currentConversation: null,
    AllContacts: [],

    OnlineUsers:[],

    conversations: [],

    contactLoader: false,
    conversationLoader: false
  },
  getters: {
    getSocket: state => {
      return state.socket
    },
    getCurrentUser: state => {
      return state.user
    },
    getUser: state => {
      return state.user
    }
  },
  actions: {
    setCurrentUser: async function(context, action){

      await context.commit('SET_CURRENT_USER', {user: action.user})

      let presences = {}
      
      let socket = await new Socket("wss://"+Auth.URL+"/socket", {params: {token: localStorage.getItem('token')}})

      await context.commit('SET_SOCKET', {socket})
      
      let channel = socket.channel("users:join", {})
      let presence = new Presence(channel)
      
      function renderOnlineUsers(presence) {
        let response = ""
        presence.list((id, {metas: [first, ...rest]}) => {
          let count = rest.length + 1
          response += `ID:${id} (conexion: ${count}) `
        })
        // IMPRIME LOS USUARIOS CONECTADOS
        // console.log(presence.list());
        console.log(response)
      }
      
      socket.connect()
  
      presence.onSync(() => renderOnlineUsers(presence))
  
      // channel.join()
        // .receive("ok", resp => { console.log("Joined successfully", resp) })
        // .receive("error", resp => { console.log("Unable to join", resp) })

      if (channel.state != 'joined') {
        channel.join().receive('ok', (response) => {
          window.socket = socket
          window.channelDiscussion = {}
          console.log(response);
          
        })
      } else {
        this.$router.push("{name: 'logout'}")
        console.log("Something went wrong");
        return;
      }
    },
    LOGIN: function({commit}, payload){
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
            window.userToken = data.token
            localStorage.setItem('token', data.token)
            localStorage.setItem('user', JSON.stringify(data))
            // ejecutamos la mutacion
            commit('LOGIN', data)
            console.log(data);
            resolve(true)
            location.reload()
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
    SET_SOCKET: (state, {socket}) => {
      state.socket = socket
    },
    SET_CURRENT_USER: function (state, { user }) {
      state.User = user
    },
    LOGIN(state, payload) {
      // almacenamos los datos de la sesion en user
      state.user = JSON.stringify(payload)
    }
  }
  // modules: {
  //   user: User
  // }
})