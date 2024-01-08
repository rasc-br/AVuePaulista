import { defineStore } from "pinia";
export const useAppStatus = defineStore("appStatus", {
  state: () => ({
    introCompleted: false,
    gameMode: 1,
  }),
  actions: {},
});
