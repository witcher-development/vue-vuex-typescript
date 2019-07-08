import Vue from 'vue';
import Vuex, { StoreOptions } from 'vuex';
import { RootState } from './types';
import { profile } from './profile/';
import { editor } from './editor/';

Vue.use(Vuex);

const store: StoreOptions<RootState> = {
  state: {
    errors: [],
  },
  mutations: {
    SET_ERRORS(state, errors) {
      state.errors = [...errors];
    },
    CLEAR_ERRORS(state) {
      state.errors = [];
    },
  },
  actions: {
    setErrors({ commit }, errors) {
      commit('SET_ERRORS', errors);
    },
    clearErrors({ commit }) {
      commit('CLEAR_ERRORS');
    },
  },
  getters: {
    errors: state => state.errors,
  },
  modules: {
    profile,
    editor,
  },
};

export default new Vuex.Store<RootState>(store);
