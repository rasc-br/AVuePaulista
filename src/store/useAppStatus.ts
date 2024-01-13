import { defineStore } from "pinia";
import { GameMode, IntroMode } from "../../types";

export const useAppStatus = defineStore("appStatus", {
  state: () => ({
    introMode: IntroMode.legacy,
    gameMode: GameMode.intro,
  }),
  actions: {},
});
