import { defineStore } from "pinia";
import { GameMode } from "../../types";

export const useAppStatus = defineStore("appStatus", {
  state: () => ({
    introCompleted: false,
    gameMode: GameMode.intro,
  }),
  actions: {},
});
