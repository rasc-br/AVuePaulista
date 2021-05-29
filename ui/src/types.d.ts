import Vue from "vue";
declare module "vue/types/vue" {
  interface Vue {
    randomBetween(min: number, max: number): number;
  }
}

export interface character {
  name: number,
  position: number,
  health: number,
  maxHealth: number,
}

export interface item {
  name: number,
  position: number,
  withPlayer: boolean,
  health?: number,
}