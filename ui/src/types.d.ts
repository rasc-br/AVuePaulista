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

export interface action {
  action: "take" | "shout" | "attack" | "use" | "drop" | "",
  objectName: string,
  objectType: "item" | "character",
  status: "start" | "end" | "cancel",
}