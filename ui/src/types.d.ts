import Vue from "vue";
declare module "vue/types/vue" {
  interface Vue {
    randomBetween(min: number, max: number): number;
  }
}