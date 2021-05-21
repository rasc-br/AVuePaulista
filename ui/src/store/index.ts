import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    status: {
      addMinutes: 0,
    }
  },
  mutations: {
    setMinutes(state, minutes: number):void {
      state.status.addMinutes += minutes;
    },
  },
  actions: {
    addMinutes({commit}, minutes: number) {
      commit('setMinutes', minutes);
    },
  },
  modules: {},
});
