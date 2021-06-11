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
  weight?: number,
}

export interface item {
  id: number,
  position: number,
  withPlayer: boolean,
  health?: number,
  weight?: number,
}

export interface action {
  action: "take" | "shout" | "attack" | "use" | "drop" | "useOn" | "",
  object: gameObject,
  onObject?: gameObject,
  status: "start" | "end" | "cancel",
}

export interface gameObject {
  id: number,
  name: string,
  type: "item" | "character",
}

export interface playerStatus {
  currentPosition: number,
  possibleMovements: number[],
  health: number,
  maxHealth: number,
  capacity: number,
  points: number,
  inventory: number[],
  name: string,
}