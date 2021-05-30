import Vue from "vue";
declare module "vue/types/vue" {
  interface Vue {
    randomBetween(min: number, max: number): number;
  }
}

export interface character {
  id: number,
  position: number,
  health: number,
  maxHealth: number,
}

export interface item {
  id: number,
  position: number,
  withPlayer: boolean,
  health?: number,
}