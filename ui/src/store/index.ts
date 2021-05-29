import Vue from "vue";
import Vuex from "vuex";
import positions from '@/models/positions';
import characters from '@/models/characters';
import items from '@/models/items';

Vue.use(Vuex);

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

const humanizeLog = (text: string): string => {
  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
}

export default new Vuex.Store({
  state: {
    status: {
      addMinutes: 0,
      log: ["Welcome to AVue Paulisa 2.0"],
      lastAction: {
        action: "",
        object: "",
        status: "cancel"
      },
    },
    playerStatus: {
      currentPosition: -1,
      possibleMovements: [-1],
      health: 10,
      maxHealth: 10,
      capacity: 15,
      inventory: [],
    },
    gameObjects: {
      places: process.env.VUE_APP_PLACES.split(", "),
      characters: [{
        name: characters.Bruxa,
        position: positions.TetoMASP,
        health: 15,
        maxHealth: 15,     
      },
      {
        name: characters.Cerebro,
        position: positions.TetoMASP,
        health: 1,
        maxHealth: 1,           
      },
      {
        name: characters.Feiticeiro,
        position: positions.Tunel,
        health: 10,
        maxHealth: 10,           
      }],
      items: [{
        name: items.Livro,
        position: positions.Livraria,
        withPlayer: false,
      }],
      currentWords: {
        book: "",
        sorceror: "",
      }
    },
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
    setCharacter(state, payload: {character: number, position: number}):void {
      state.gameObjects.characters.push({
        name: payload.character,
        position: payload.position,
        health: 10,
        maxHealth: 10,          
      });
    },
    setItem(state, payload: {item: number, position: number}):void {
      state.gameObjects.items.push({
        name: payload.item,
        position: payload.position,
        withPlayer: false,          
      });
    },
    addLogEntry(state, log: string):void {
      state.status.log.push(humanizeLog(log));
    },
    removeLogEntry(state):void {
      state.status.log.pop();
    },
    setLastAction(state, payload: {action: string, object: string, status: string}):void {
      state.status.lastAction = payload;
    },
    updateLastLogEntry(state, log: string):void {
      Vue.set(state.status.log, state.status.log.length-1 , humanizeLog(`${state.status.log[state.status.log.length-1]} ${log}`));
    },
    updateCharacter(state, payload: {character: number, position: number, health: number}):void {
      Vue.set(state.gameObjects.characters[payload.character], 'position', payload.position);
      Vue.set(state.gameObjects.characters[payload.character], 'health', payload.health);
    },
    updateItem(state, payload: {item: number, position: number, withPlayer: boolean}):void {
      Vue.set(state.gameObjects.items[payload.item], 'position', payload.position);
      Vue.set(state.gameObjects.items[payload.item], 'withPlayer', payload.withPlayer);
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
    addCharacter({commit}, payload: {character: number, position: number}) {
      commit('setCharacter', payload);
    },
    addItem({commit}, payload: {item: number, position: number}) {
      commit('setItem', payload);
    },
    addAction({dispatch}, payload: {action: string, object: number, status: string}) {
      console.log((JSON.stringify(this.state.status.lastAction) != JSON.stringify(payload)));
      console.log(JSON.stringify(this.state.status.lastAction));
      console.log(JSON.stringify(payload));

      if (JSON.stringify(this.state.status.lastAction) == JSON.stringify(payload) ) return;
      dispatch('updateLog', payload);
    },
    updateLog({commit}, payload: {action: string, object: number, status: string}) {
      debugger;
      if (payload.status == "end") commit('updateLastLogEntry', payload.object);
      if (payload.status == "start") {
        if (this.state.status.lastAction.status == "start") commit('removeLogEntry');
        commit('addLogEntry', payload.action);
      } 
      if (payload.status == "cancel" && this.state.status.lastAction.status=="start") commit('removeLogEntry');
      commit('setLastAction', payload);
    },  
  },
  modules: {},
});
