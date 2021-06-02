import Vue from "vue";
import Vuex, { Store } from "vuex";
import positions from '@/models/positions';
import characters from '@/models/characters';
import items from '@/models/items';
import { action } from "@/types";

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
  return text.charAt(0).toUpperCase() + text.slice(1);
}

export default new Vuex.Store({
  state: {
    status: {
      addMinutes: 0,
      log: ["Welcome to AVue Paulisa 2.0"],
      lastAction: {
        action: "",
        object: {
          id: -1,
          name: "",
          type: "",
        },
        status: "cancel"
      },
      scoreFlags: [""],
    },
    playerStatus: {
      currentPosition: -1,
      possibleMovements: [-1],
      health: 10,
      maxHealth: 10,
      capacity: 8,
      points: 0,
      inventory: [] as {id: number, type: string}[],
      name: "rasc",
    },
    gameObjects: {
      places: process.env.VUE_APP_PLACES.split(", "),
      characters: [{
        id: characters.Bruxa,
        position: positions.TetoMASP,
        health: 15,
        maxHealth: 15,     
      },
      {
        id: characters.Cerebro,
        position: positions.TetoMASP,
        health: 1,
        maxHealth: 1,           
      },
      {
        id: characters.Feiticeiro,
        position: positions.Tunel,
        health: 10,
        maxHealth: 10,           
      }],
      items: [{
        id: items.Livro,
        position: positions.Livraria,
        withPlayer: false,
        weight: 0,
      }],
      currentWords: {
        book: "",
        sorceror: "",
        witchSpoken: "",
      }
    },
    alert: {
      open: false,
      message: ""
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
    setPlayerCapacity(state, capacity: number):void {
      state.playerStatus.capacity = capacity;
    },
    setCharacter(state, payload: {character: number, position: number}):void {
      state.gameObjects.characters.push({
        id: payload.character,
        position: payload.position,
        health: 10,
        maxHealth: 10,          
      });
    },
    setItem(state, payload: {item: number, position: number, weight: number}):void {
      state.gameObjects.items.push({
        id: payload.item,
        position: payload.position,
        withPlayer: false,
        weight: payload.weight          
      });
    },
    addLogEntry(state, log: string):void {
      state.status.log.push(humanizeLog(log));
    },
    removeLogEntry(state):void {
      state.status.log.pop();
    },
    setLastAction(state, payload: action):void {
      state.status.lastAction = payload;
    },
    updateLastLogEntry(state, log: string):void {
      Vue.set(state.status.log, state.status.log.length-1 , `${state.status.log[state.status.log.length-1]} ${log}`);
    },
    updateCharacter(state, payload: {character: number, position: number, health: number}):void {
      Vue.set(state.gameObjects.characters[payload.character], 'position', payload.position);
      Vue.set(state.gameObjects.characters[payload.character], 'health', payload.health);
    },
    updateItem(state, payload: {item: number, position: number, withPlayer: boolean}):void {
      Vue.set(state.gameObjects.items[payload.item], 'position', payload.position);
      Vue.set(state.gameObjects.items[payload.item], 'withPlayer', payload.withPlayer);
    },
    setAlert(state, alert: {open: boolean, message: string}):void {
      state.alert = alert;
    },
    addToInventory(state, object: {id: number, type: string}):void {
      state.playerStatus.inventory.push(object);
    },
    setScore(state, points: number):void {
      state.playerStatus.points += points;
    },
    addFlag(state, flag: string):void {
      state.status.scoreFlags.push(flag);
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
    addItem({commit}, payload: {item: number, position: number, weight: number}) {
      commit('setItem', payload);
    },
    addAction({dispatch}, payload: action) {
      if (JSON.stringify(this.state.status.lastAction) == JSON.stringify(payload) ) return;
      dispatch('updateLog', payload);
      if (payload.status == "end") dispatch('executeAction', payload);
    },
    updateLog({commit}, payload: action) {
      if (payload.status == "end") commit('updateLastLogEntry', payload.object.name);
      if (payload.status == "start") {
        if (this.state.status.lastAction.status == "start") commit('removeLogEntry');
        commit('addLogEntry', payload.action);
      } 
      if (payload.status == "cancel" && this.state.status.lastAction.status=="start") commit('removeLogEntry');
      commit('setLastAction', payload);
    },
    executeAction({dispatch}, payload: action) {
      switch (payload.action) {
        case "take":
          dispatch ("executeTake", payload);
          break;
        default:
          break;
      }
    },
    openAlert({commit},  alert: {open: boolean, message: string}) {
      commit('setAlert', alert);
    },
    updateScore({commit}, payload: {points: number, flag: string, logMessage: string}) {
      if (!this.state.status.scoreFlags.includes(payload.flag)) {
        commit("setScore", payload.points);
        commit("addFlag", payload.flag);
        Vue.nextTick(()=> commit('addLogEntry', `${payload.points} point${payload.points > 1 ? 's' : ''} for ${payload.logMessage}`));
      }
    },
    executeTake({commit, dispatch}, action: action) {
      if (action.object.type == "character") {
        let message = `You can't carry the ${action.object.name}`;
        switch (action.object.id) {
          case characters.Bruxa:
            message = "You cannot carry her";
            dispatch ("openAlert", { open: true, message, subMessage: "Are you insane?!"});
            dispatch("updateScore", {points: 1, flag: "take-witch", logMessage: "bravery"});
            break;
          case characters.Cerebro:
            message = "You cannot take it";
            dispatch ("openAlert", { open: true, message, subMessage: "Nice try, but the witch will never allow you"});
            dispatch("updateScore", {points: 1, flag: "take-brain", logMessage: "at least trying"});
            break;
          case characters.Coruja:
            if (this.state.playerStatus.capacity >= 2) {
              message = `The ${action.object.name} is now in your inventory.`;
              dispatch("openAlert", { open: true, message, subMessage: "Wow, I didn't know you could take the Owl!"});
              commit("addToInventory", { id: characters.Coruja, type: "character" });
              commit("updateCharacter", { character: characters.Coruja, position: -1, health: this.state.gameObjects.characters[characters.Coruja].health});
              commit("setPlayerCapacity", this.state.playerStatus.capacity -= 2);
              dispatch("updateScore", {points: 10, flag: "take-owl", logMessage: "catching the Owl"});
            } else {
              message = `The ${action.object.name} is too heavy for you to carry right now`;
              dispatch ("openAlert", { open: true, message });
            }
            break;
          default:
            dispatch ("openAlert", { open: true, message });
            break;
        }
        commit('updateLastLogEntry', ` - ${message}`);
      } else {
        const itemWeight = this.state.gameObjects.items[action.object.id].weight;
        if (this.state.playerStatus.capacity >= itemWeight) {
          commit("setPlayerCapacity", this.state.playerStatus.capacity -= itemWeight);
          commit ("updateItem", {item: action.object.id, position: -1, withPlayer: true} );
          commit("addToInventory", { id: action.object.id, type: "item" });
        } else {
          dispatch("openAlert", { open: true, message: `The ${action.object.name} is too heavy for you to carry right now` });
          commit('addLogEntry', `The ${action.object.name} is too heavy for you to carry right now`);
        }
      }
    },
  },
  modules: {},
});
