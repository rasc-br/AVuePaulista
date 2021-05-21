import { Component, Vue } from "vue-property-decorator";

@Component
export default class Mixin extends Vue {
    randomBetween(min: number, max: number): number {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1) + min);
    }
}