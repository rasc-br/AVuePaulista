<template>
  <div class="attack-view">
    <q-card class="attacker-card">
      <q-card-section class="centralized">
        <q-icon :class="['object-icon', `icon-char-${attacker.id}`]" />
      </q-card-section>
      <q-card-section class="centralized">
        <div class="text-h6">{{ attacker.name }}</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        uses something against...
      </q-card-section>
    </q-card>

    <q-card class="middle-card"> ATTACKS </q-card>

    <q-card class="defender-card">
      <q-card-section class="centralized">
        <q-icon :class="['object-icon', `icon-char-${defender.id}`]" />
      </q-card-section>
      <q-card-section class="centralized">
        <div class="text-h6">{{ defender.name }}</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        uses something against...
      </q-card-section>
    </q-card>
  </div>
</template>

<script lang="ts">
import { action, gameObject } from "@/types";
import { Component, Vue } from "vue-property-decorator";

@Component({
  name: "Attack",
})
export default class Attack extends Vue {
  private characters = process.env.VUE_APP_CHARACTERS.split(", ");
  private items = process.env.VUE_APP_ITEMS.split(", ");
  private player: gameObject = {
    id: -1,
    name: this.$store.state.playerStatus.name,
    type: "character",
  };
  get lastAction(): action {
    return this.$store.state.status.lastAction;
  }
  get attacker(): gameObject {
    return this.lastAction.onObject ? this.lastAction.object : this.player;
  }
  get defender(): gameObject {
    return this.lastAction.onObject
      ? this.lastAction.onObject
      : this.lastAction.object;
  }
}
</script>
<style lang="scss" scoped>
.attack-view {
  display: flex;
  cursor: inherit !important;

  .centralized {
    display: flex;
    justify-content: center;
  }

  .middle-card {
    height: 40px;
    padding: 10px;
    margin: 0 10px;
  }
}

.object-icon {
  font-size: 80px !important;
  &.icon-char--1 {
    content: url("../assets/masked.svg");
  }
  &.icon-char-0 {
    content: url("../assets/witch2.svg");
  }
  &.icon-char-1 {
    content: url("../assets/brain2.svg");
  }
  &.icon-char-2 {
    content: url("../assets/sorcerer.svg");
  }
  &.icon-char-3 {
    content: url("../assets/bomberman2.svg");
  }
  &.icon-char-4 {
    content: url("../assets/eagle2.svg");
  }
  &.icon-char-5 {
    content: url("../assets/owl2.svg");
  }
  &.icon-char-6 {
    content: url("../assets/demon.svg");
  }
  &.icon-item-0 {
    content: url("../assets/book2.svg");
  }
  &.icon-item-1 {
    content: url("../assets/sword.svg");
  }
  &.icon-item-2 {
    content: url("../assets/hipnodisc2.svg");
  }
  &.icon-item-3 {
    content: url("../assets/shield.svg");
  }
  &.icon-item-4 {
    content: url("../assets/wax2.svg");
  }
  &.icon-item-5 {
    content: url("../assets/hang-glider2.svg");
  }
  &.icon-item-6 {
    content: url("../assets/spyglass2.svg");
  }
  &.icon-item-7 {
    content: url("../assets/kitbomb2.svg");
  }
  &.icon-item-8 {
    content: url("../assets/first-aid-kit.svg");
  }
  &.icon-item-9 {
    content: url("../assets/gasmask2.svg");
  }
  &.icon-item-10 {
    content: url("../assets/seta.svg");
  }
  &.icon-item-11 {
    content: url("../assets/bomb.svg");
  }
  &.icon-item-12 {
    content: url("../assets/gasbomb.svg");
  }
}
</style>
