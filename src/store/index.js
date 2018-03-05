import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';
import jwtDecode from 'jwt-decode';
import cognitoAuth from '../cognito';

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
    this.replaceState({}); // Clear old state for new user
  },
  GET_USER (state) {
    cognitoAuth.getIdToken((err, jwtToken) => {
      if (err) {
        console.log("Dashboard: Couldn't get the session:", err, err.stack);
        return;
      }

      this.token = jwtDecode(jwtToken);
      state.currentUser = this.token;
      // state.currentUser = cognitoAuth.getCurrentUser();
    });
  }
};

const actions = {
  login ({ commit }) {
    commit('SET_TRUE');
  },

  logout ({ commit }) {
    commit('SET_FALSE');
  },

  getUser ({ commit }) {
    commit('GET_USER');
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
