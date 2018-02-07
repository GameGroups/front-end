import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';

Vue.use(Vuex);

const state = {
  loggedIn: false
};

const mutations = {
  SET_TRUE (state) {
    state.loggedIn = true;
  },
  SET_FALSE (state) {
    state.loggedIn = false;
  }
};

const actions = {
  login ({ commit }) {
    commit('SET_TRUE');
  },

  logout ({ commit }) {
    commit('SET_FALSE');
  }
};

const store = new Vuex.Store({
  state,
  mutations,
  actions,
  plugins: [
    createPersistedState()
  ]
});

export default store;
