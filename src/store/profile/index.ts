import { Module } from 'vuex';
import { ProfileState } from './types';
import { RootState } from '../types';

import api from '@/api';

const namespaced: boolean = true;

export const profile: Module<ProfileState, RootState> = {
  namespaced,
  state: {
    token: '',
    isLogged: false,
  },
  mutations: {
    SET_TOKEN(state, token) {
      state.token = token;
      state.isLogged = true;
    },
    UNSET_TOKEN(state) {
      state.token = '';
      state.isLogged = false;
    },
  },
  actions: {
    login({ commit }, { username, password }) {
      return api.post('/login', { username, password })
        .then(res => {
          commit('SET_TOKEN', res.data.token);
          localStorage.setItem('token', res.data.token);
          return res;
        })
        .catch(err => {
          commit('SET_ERRORS', [err.response.data.error], {root: true});
          throw new Error(err);
        });
    },
    logout({ commit }) {
      commit('UNSET_TOKEN');
      localStorage.removeItem('token');
    },
  },
  getters: {
    token: state => state.token,
    isLogged: state => state.isLogged,
  },
};
