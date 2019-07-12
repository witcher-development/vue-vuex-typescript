import { Module } from 'vuex';
import { EditorState, Settings, Text } from './types';
import { RootState } from '../types';

import api from '@/api';

const namespaced: boolean = true;

export const editor: Module<EditorState, RootState> = {
	namespaced,
	state: {
		settings: {
			defaultColor: [0, 0, 0],
			defaultStyle: 'normal',
		},
		texts: [],
	},
	mutations: {
		SET_SETTINGS(state, settings: Settings) {
			state.settings = settings;
		},
		SET_TEXTS(state, texts: Text[]) {
			state.texts = texts;
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
		setSettings({ commit }, settings: Settings): void {
			api.post('/editor/settings', { settings })
				.then(res => {
					commit('SET_SETTINGS', settings);
				})
				.catch(err => {
					commit('SET_ERRORS', [err.response.data.error], {root: true});
					throw new Error(err);
				});
		},
		getTexts({ commit }): void {
			api.get('/editor/texts')
				.then(res => {
					commit('SET_TEXTS', res.data);
				})
				.catch(err => {
					commit('SET_ERRORS', [err.response.data.error], {root: true});
					throw new Error(err);
				});
		},
		setText({ commit }, text: Text): Promise<boolean> {
			return api.post('/editor/texts', { text })
				.then(res => {
					commit('SET_TEXTS', res.data);
					return true;
				})
				.catch(err => {
					commit('SET_ERRORS', [err.response.data.error], {root: true});
					throw new Error(err);
				});
		},
	},
	getters: {
		settings: state => state.settings,
		texts: state => state.texts,
	},
};
