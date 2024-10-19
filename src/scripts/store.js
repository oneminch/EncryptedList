import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export const store = new Vuex.Store({
	state: {
		headerTitle: "EncryptedList"
	},
	mutations: {
		updateTitle(state, newTitle) {
			state.headerTitle = newTitle;
		}
	}
});
