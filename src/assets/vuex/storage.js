import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: {
      id: null,
      username: null,
      email: null,
      logeado: false
    },
    count : 10
  },
  getters: {
    getUser: (state) => {
      return state.user
    },
    userLogeado: state => state.user.logeado
  },
  actions: {
    userLogged ({commit}, user) {
      commit('USER_LOGGED', user);
    }
    
  },
  mutations: {
    USER_LOGGED (state, user) {
      state.user = user;
    },
    increment (state) {
      state.count++
    }
  }
})