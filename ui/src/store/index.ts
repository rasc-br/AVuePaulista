import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);
const places = process.env.VUE_APP_PLACES.split(", ");

export default new Vuex.Store({
  state: {
    status: {
      addMinutes: 0,
    },
    playerStatus: {
      currentPosition: 0
    },
    gameObjects: {
      places: places
    }
  },
  mutations: {
    setMinutes(state, minutes: number):void {
      state.status.addMinutes += minutes;
    },
    setCurrentPosition(state, position: number):void {
      state.playerStatus.currentPosition = position;
    },
  },
  actions: {
    addMinutes({commit}, minutes: number) {
      commit('setMinutes', minutes);
    },
    updatePlayerPosition({commit}, position: number) {
      commit('setCurrentPosition', position);
    },
  },
  modules: {},
});
