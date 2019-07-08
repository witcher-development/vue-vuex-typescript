import { Module } from 'vuex';
import { EditorState, Settings } from './types';
import { RootState } from '../types';

import api from '@/api';

const namespaced: boolean = true;

export const editor: Module<EditorState, RootState> = {
  namespaced,
  state: {
    settings: {
      defaultColor: '#fff',
      defaultStyle: 'normal',
    },
    texts: [],
  },
  mutations: {
    SET_SETTINGS(state, settings: Settings) {
      state.settings = settings;
    },
  },
  actions: {
    getSettings({ commit }): void {
      api.get('/editor/settings')
        .then(res => {
          commit('SET_SETTINGS', res.data);
        })
        .catch(err => {
          commit('SET_ERRORS', [err.response.data.error], {root: true});
          throw new Error(err);
        });
    },
  },
  getters: {
    settings: state => state.settings,
  },
};
