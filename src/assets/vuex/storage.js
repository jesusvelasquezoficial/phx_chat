import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: null,
    count : 10
  },
  getters: {
    getUserName: (state) => {
      return state.user
    },
    userLogeado: state => state.user.logeado
  },
  actions: {
    userLogged ({commit}, user) {
      commit('USER_LOGGED', user)
    },
    setUser: ({commit}, user) => {
      commit('SET_USER', user) 
    }
    
  },
  mutations: {
    USER_LOGGED (state, user) {
      state.user = user
    },
    SET_USER (state, user) {
      state.user = user
    },
    increment (state) {
      state.count++
    }
  }
})