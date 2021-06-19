import Vue from "vue";
import Vuex from "vuex";
import positions from '@/models/positions';
import characters from '@/models/characters';
import items from '@/models/items';
import { action, gameObject } from "@/types";
import helpers from "@/helpers/globalMixins";

Vue.use(Vuex);

const randomBetween: Function = (helpers as any).extendOptions.methods.randomBetween;
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
      witchInvoke: false,
      convertedDemon: false,
      convertedSorcerer: false,
    },
    playerStatus: {
      currentPosition: -1,
      possibleMovements: [-1],
      health: 10,
      maxHealth: 10,
      capacity: 8,
      points: 0,
      inventory: [] as gameObject[],
      name: "rasc",
    },
    gameObjects: {
      places: process.env.VUE_APP_PLACES.split(", "),
      characters: [{
        id: characters.Bruxa,
        position: positions.TetoMASP,
        health: 15,
        maxHealth: 15,
        weight: 0,
      },
      {
        id: characters.Cerebro,
        position: positions.TetoMASP,
        health: 1,
        maxHealth: 1,
        weight: 0,          
      },
      {
        id: characters.Feiticeiro,
        position: positions.Tunel,
        health: 10,
        maxHealth: 10,
        weight: 0,        
      }],
      items: [{
        id: items.Livro,
        position: positions.Livraria,
        withPlayer: false,
        weight: 0,
      }],
      currentWords: {
        book: "",
        sorcerer: "",
        witchSpoken: "",
      }
    },
    alert: {
      open: false,
      message: "",
      subMessage: "",
    },
    shoutDialog: {
      open: false,
      message: ""
    },
    spyglassDialog: {
      open: false,
      message: "",
      positionId: -1
    },
    attackDialog: {
      open: false,
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
    setPlayerCapacity(state, capacity: number):void {
      state.playerStatus.capacity = capacity;
    },
    setCharacter(state, payload: {character: number, position: number, weight?: number}):void {
      state.gameObjects.characters.push({
        id: payload.character,
        position: payload.position,
        health: 10,
        maxHealth: 10,
        weight: payload.weight || 0,
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
    setWord(state, payload: {word: string, type: 'book' | 'sorcerer' | 'witchSpoken'}):void {
      state.gameObjects.currentWords[payload.type] = payload.word;
    },
    setWitchInvoke(state, flag: boolean):void {
      state.status.witchInvoke = flag;
    },
    setDemonConversion(state, flag: boolean):void {
      state.status.convertedDemon = flag;
    },
    setSorcererConversion(state, flag: boolean):void {
      state.status.convertedSorcerer = flag;
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
    updateCharacter(state, payload: {character: number, position?: number, health?: number, weight?: number}):void {
      if (payload.position || payload.position == 0) Vue.set(state.gameObjects.characters[payload.character], 'position', payload.position);
      if (payload.health || payload.health == 0) Vue.set(state.gameObjects.characters[payload.character], 'health', payload.health);
      if (payload.weight || payload.weight == 0) Vue.set(state.gameObjects.characters[payload.character], 'weight', payload.weight);
    },
    updateItem(state, payload: {item: number, position?: number, withPlayer?: boolean, weight?: number}):void {
      if (payload.position || payload.position == 0) Vue.set(state.gameObjects.items[payload.item], 'position', payload.position);
      if (payload.withPlayer === true || payload.withPlayer === false) Vue.set(state.gameObjects.items[payload.item], 'withPlayer', payload.withPlayer);
      if (payload.weight || payload.weight == 0) Vue.set(state.gameObjects.items[payload.item], 'weight', payload.weight);
    },
    setAlert(state, alert: {open: boolean, message: string, subMessage: string}):void {
      state.alert = alert;
    },
    setShout(state, shoutDialog: {open: boolean, message: string}):void {
      state.shoutDialog = shoutDialog;
    },
    setSpyglassVision(state, spyglassDialog: {open: boolean, message: string, positionId: number}):void {
      state.spyglassDialog = spyglassDialog;
    },
    setAttackDialog(state, payload: {open: boolean}):void {
      state.attackDialog = payload;
    },
    addToInventory(state, object: gameObject):void {
      state.playerStatus.inventory.push(object);
    },
    removeFromInventory(state, index: number):void {
      state.playerStatus.inventory.splice(index, 1);
    },
    setScore(state, points: number):void {
      state.playerStatus.points += points;
    },
    updatePlayerHealth(state, newHealth: number): void {
      state.playerStatus.health = newHealth;
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
    addCharacter({commit}, payload: {character: number, position: number, weight?: number}) {
      commit('setCharacter', payload);
    },
    addItem({commit}, payload: {item: number, position: number, weight: number}) {
      commit('setItem', payload);
    },
    addWord({commit}, payload: {word: string, type: 'book' | 'sorcerer' | 'witchSpoken'}) {
      commit('setWord', payload);
    },
    addAction({dispatch}, payload: action) {
      if (JSON.stringify(this.state.status.lastAction) == JSON.stringify(payload) ) return;
      dispatch('updateLog', payload);
      if (payload.status == "end" || payload.action == "shout") dispatch('executeAction', payload);
    },
    updateLog({commit}, payload: action) {
      const lastAction = this.state.status.lastAction;
      if (payload.status == "end") {
        commit('updateLastLogEntry', lastAction.action=="useOn" ? payload.onObject?.name : payload.object.name);
      }
      if (payload.status == "start") {
        if (lastAction.status == "start") commit('removeLogEntry');
        commit('addLogEntry', payload.action);
      } 
      if (payload.status == "cancel" && (lastAction.status=="start" || lastAction.action=="useOn")) commit('removeLogEntry');
      commit('setLastAction', payload);
    },
    executeAction({dispatch}, payload: action) {
      dispatch ("addMinutes", 5);
      switch (payload.action) {
        case "take":
          dispatch ("executeTake", payload);
          break;
        case "shout":
          dispatch("triggerShoutDialog", { open: true, message: "" });
          break;
        case "drop":
          dispatch("executeDrop", payload);
          break;
        case "use":
          dispatch("executeUse", payload);
          break;
        case "useOn":
          dispatch("executeUseOn", payload);
          break;
        case "attack":
          dispatch("executeAttack", payload);
          break;
        default:
          break;
      }
    },
    openAlert({commit},  alert: {open: boolean, message: string}) {
      commit('setAlert', alert);
    },
    openSpyglassDialog({commit},  spyglassDialog: {open: boolean, message: string, positionId: number}) {
      commit('setSpyglassVision', spyglassDialog);
    },
    triggerShoutDialog({commit, dispatch},  shoutDialog: {open: boolean, message: string}) {
      commit('setShout', shoutDialog);
      if (shoutDialog.message) {
        dispatch('updateLog', {status: "end", object: { name: shoutDialog.message }});
        switch(shoutDialog.message) {
          case this.state.gameObjects.currentWords.sorcerer:
            if (this.state.playerStatus.currentPosition == positions.MASP) {
              dispatch ("openAlert", { open: true, message: "You reached the roof!" });
              commit('setCurrentPosition', positions.TetoMASP);
            } else {
              dispatch ("openAlert", { open: true, message: "Nothing happened", subMessage: "Nice shout tho" });
            }
            break;
          case this.state.gameObjects.currentWords.book:
            if (this.state.status.witchInvoke) {
              dispatch ("openAlert", { open: true, message: "The witch seems disturbed..." });
              commit('setDemonConversion', true);
            } else {
              dispatch ("openAlert", { open: true, message: "Nothing happened", subMessage: "Nice shout tho" });
            }
            break;
          case "Raphael Candello is the best!":
            dispatch ("openAlert", { open: true, message: "Thanks!" });
            dispatch("updateScore", {points: 10, flag: "honor-dev", logMessage: "honoring the developer"});
            break;
          default:
            dispatch ("openAlert", { open: true, message: "Nothing happened", subMessage: "Nice shout tho" });
            break;
        }
      }
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
            const owlWeight = this.state.gameObjects.characters[characters.Coruja].weight;
            if (this.state.playerStatus.capacity >= owlWeight) {
              message = `The ${action.object.name} is now in your inventory.`;
              if (!this.state.status.scoreFlags.includes("take-owl")) {
                dispatch("openAlert", { open: true, message, subMessage: "Wow, I didn't know you could take the Owl!"});
              }
              commit("addToInventory", { id: characters.Coruja, name: action.object.name, type: "character" });
              commit("updateCharacter", { character: characters.Coruja, position: -1 });
              commit("setPlayerCapacity", this.state.playerStatus.capacity -= owlWeight);
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
          commit("addToInventory", { id: action.object.id, name: action.object.name, type: "item" });
        } else {
          dispatch("openAlert", { open: true, message: `The ${action.object.name} is too heavy for you to carry right now` });
          commit('addLogEntry', `The ${action.object.name} is too heavy for you to carry right now`);
        }
      }
    },
    executeAttack({commit, dispatch}, action: action) {
      if (action.object.type != "character") {
        dispatch("openAlert", { open: true, message: `You can't attack that!`});
        return;
      }
      commit("setAttackDialog", {open: true});
    },
    executeDrop({commit}, action: action) {
      const itemIndex = this.state.playerStatus.inventory.findIndex((item) => JSON.stringify(item) == JSON.stringify(action.object));
      const owlWeight = this.state.gameObjects.characters[characters.Coruja].weight;
      if (itemIndex != -1) commit("removeFromInventory", itemIndex);
      if (action.object.type == "character") {
        commit("updateCharacter", {
          character: characters.Coruja,
          position: this.state.playerStatus.currentPosition
        });
        commit("setPlayerCapacity", this.state.playerStatus.capacity += owlWeight);
        return;
      }
      const itemWeight = Number(this.state.gameObjects.items[action.object.id].weight);
      commit("setPlayerCapacity", this.state.playerStatus.capacity += itemWeight);
      commit ("updateItem", {item: action.object.id, position: this.state.playerStatus.currentPosition, withPlayer: false} );
    },
    executeUse({commit, dispatch}, action: action) {
      const bookWord = this.state.gameObjects.currentWords.book;
      const characterNames = process.env.VUE_APP_CHARACTERS.split(", ");

      if (action.object.type == "character") {
        dispatch("openAlert", { open: true, message: `You can't use the ${characterNames[action.object.id]} `});
        return;
      }
      switch (action.object.id) {
        case items.Livro:
          dispatch("openAlert", { open: true, message: `...convert the ${characterNames[characters.Demonio]} with ${bookWord}.`});
          dispatch("updateScore", {points: 5, flag: "book-word", logMessage: "reading a nice book"});
          break;
        case items.Hipnodisco:
        case items.Cera:
        case items.KitBomba:
        case items.SetaMortal:
        case items.Luneta:
          commit('updateLastLogEntry', ' on ');
          action.action = "useOn";
          commit('setLastAction', action);
          break;
        case items.KitSaude:
          const maxHealth = this.state.playerStatus.maxHealth;
          if (this.state.playerStatus.health < maxHealth) {
            const recover = randomBetween(0, 2);
            const newHealth = recover + this.state.playerStatus.health;
            commit("updatePlayerHealth", newHealth > maxHealth ? maxHealth : newHealth);
            dispatch("openAlert", { open: true, message: `You recovered ${recover} points of health`});
            if (recover == 2) dispatch("updateScore", {points: 5, flag: "recover-two", logMessage: "having luck on your recovery"});
          } else {
            dispatch("openAlert", { open: true, message: `You are already on full health`});
          }
          break;
        case items.Escudo:
        case items.Espada:
        case items.AsaDelta:
        case items.Mascara:
          dispatch("openAlert", { open: true, message: `You are already using the ${action.object.name} `});
          break;
        default:
          dispatch("openAlert", { open: true, message: `You can't use the ${action.object.name} `});
          break;
      }
    },
    executeUseOn({commit, dispatch}, action: action) {
      let lastAction = this.state.status.lastAction;
      lastAction.action = "use";
      commit('setLastAction', lastAction);
      switch (action.object.id) {
        case items.Hipnodisco:
          if (action.onObject?.type == "character" && action.onObject?.id == characters.Feiticeiro) {
            dispatch("executeHipnotize");
          } else {
            dispatch("openAlert", { open: true, message: `The ${action.object?.name} has no effect...`});
          }
          break;
        case items.Cera:
          if (action.onObject?.type == "character" && this.state.gameObjects.characters[action.onObject?.id].weight != 0) {
            commit("updateCharacter", { character: action.onObject?.id, weight: 0 });
            dispatch("openAlert", { open: true, message: `The ${action.onObject?.name} has no weight anymore!`, subMessage: "How that happened anyway?!" });
            dispatch("updateScore", {points: 5, flag: "use-wax", logMessage: "using the most weird object of the game"});
            return;
          }
          if (action.onObject?.type == "item" && this.state.gameObjects.items[action.onObject?.id].weight != 0) {
            commit ("updateItem", {item: action.onObject?.id, weight: 0 });
            dispatch("openAlert", { open: true, message: `The ${action.onObject?.name} has no weight anymore!`, subMessage: "How that happened anyway?!" });
            dispatch("updateScore", {points: 5, flag: "use-wax", logMessage: "using the most weird object in game"});
            return;
          } 
          dispatch("openAlert", { open: true, message: `The ${action.object?.name} has no effect...`});        
          break;
        case items.KitBomba:
          if (action.onObject?.type == "item" && (action.onObject?.id == items.BombaDeGas || action.onObject?.id == items.Bomba)) {
            dispatch("defuseBomb");
          } else {
            dispatch("openAlert", { open: true, message: `The ${action.object?.name} has no effect...`});
          }
          break;
        case items.SetaMortal:
          if (action.onObject?.type == "character") {
            dispatch("updateScore", {points: 5, flag: "use-death-arrow", logMessage: "using the most deadly object in game"});
            // TODO: Attack with Death Arrow
            console.log("Using seta mortal");
          } else {
            dispatch("openAlert", { open: true, message: `You can't attack ${action.onObject?.name}`});
          }
          break;
        case items.Luneta:
          if (action.onObject?.type == "position") {
            dispatch("openSpyglassDialog", { open: true, message: `You see:`, positionId: action.onObject?.id});
            dispatch("updateScore", {points: 5, flag: "use-spyglass", logMessage: "using the most useless object in game"});
          } else {
            dispatch("openAlert", { open: true, message: `You must use it in a place`});
          }
          break;
        default:
          dispatch("openAlert", { open: true, message: `The ${action.object?.name} has no effect...`});
      }
    },
    executeHipnotize({commit, dispatch}) {
      console.log("Try to hipnotize the sorcerer");
    },
    defuseBomb({commit, dispatch}) {
      console.log("Try to defuse a bomb");
    },
    causeDamage({commit, dispatch}, payload: { characterId: number, damage: number }) {
      const characterNames = process.env.VUE_APP_CHARACTERS.split(", ");
      const currentCharacterName = characterNames[payload.characterId];
      commit('addLogEntry', `The ${currentCharacterName} lost ${payload.damage} of health`);
      if (payload.damage == 3) dispatch("updateScore", {points: 20, flag: "max-damage", logMessage: "using 100% of your power!"});
      const newHealth: number = this.state.gameObjects.characters[payload.characterId].health - payload.damage;
      commit('updateCharacter', { character: payload.characterId, health: newHealth < 0 ? 0 : newHealth });
    },
  },
  modules: {},
});
