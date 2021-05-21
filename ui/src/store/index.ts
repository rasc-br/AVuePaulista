import Vue from "vue";
import Vuex from "vuex";
import positions from '@/models/positions';

Vue.use(Vuex);
const places = process.env.VUE_APP_PLACES.split(", ");

const getPossibleMovements = (position: number): number[] => {
  switch (position) {
    case positions.AlSantos:
      return [positions.RuaAugusta, positions.Baixa9Julho];
    case positions.Baixa9Julho:
      return [positions.AlSantos, positions.Tunel, positions.Brigadeiro];
    case positions.Tunel:
      return [positions.Baixa9Julho, positions.Alta9Julho];
    case positions.Alta9Julho:
      return [positions.Tunel, positions.Maio13, positions.MASP];
    case positions.Maio13:
      return [positions.Alta9Julho, positions.Livraria, positions.Brigadeiro];
    case positions.Livraria:
      return [positions.Maio13];
    case positions.AltaPaulista:
      return [positions.Center3, positions.RuaAugusta, positions.BaixaPaulista, positions.MASP];
    case positions.Antena:
      return [positions.ColObjetivo, positions.Ceu];
    case positions.BaixaPaulista:
      return [positions.AltaPaulista, positions.Brigadeiro, positions.ColObjetivo, positions.MASP];
    case positions.Brigadeiro:
      return [positions.Maio13, positions.BaixaPaulista, positions.Baixa9Julho];
    case positions.Center3:
      return [positions.RuaAugusta, positions.AltaPaulista];
    case positions.Ceu:
      return [positions.Antena, positions.TetoMASP];
    case positions.Cinesesc:
      return [positions.RuaAugusta];
    case positions.ColObjetivo:
      return [positions.BaixaPaulista, positions.Antena];
    case positions.MASP:
      return [positions.AltaPaulista, positions.Alta9Julho, positions.BaixaPaulista, positions.TetoMASP];
    case positions.RuaAugusta:
      return [positions.AltaPaulista, positions.Center3, positions.Cinesesc, positions.AlSantos];
    case positions.TetoMASP:
      return [positions.Ceu, positions.MASP];
    default:
      return [-1];
  }
}


export default new Vuex.Store({
  state: {
    status: {
      addMinutes: 0,
    },
    playerStatus: {
      currentPosition: -1,
      possibleMovements: [-1],
    },
    gameObjects: {
      places: places,
    }
  },
  mutations: {
    setMinutes(state, minutes: number):void {
      state.status.addMinutes += minutes;
    },
    setCurrentPosition(state, position: number):void {
      state.playerStatus.currentPosition = position;
    },
    setPossibleMoviments(state, possibleMovements: number[]):void {
      state.playerStatus.possibleMovements = possibleMovements;
    },   
  },
  actions: {
    addMinutes({commit}, minutes: number) {
      commit('setMinutes', minutes);
    },
    updatePlayerPosition({commit}, position: number) {
      commit('setCurrentPosition', position);
      commit('setPossibleMoviments', getPossibleMovements(position));
    },
  },
  modules: {},
});
