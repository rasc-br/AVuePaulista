import { defineStore } from "pinia";
export const useAppStatus = defineStore("appStatus", {
  state: () => ({
    gameMode: 1,
  }),
  actions: {},
});
