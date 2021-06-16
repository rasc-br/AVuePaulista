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
        Attack power: {{ attacker.basicAttack }}
      </q-card-section>

      <q-card-section v-if="attacker.extraPower.attack" class="q-pt-none">
        {{ attacker.extraPower.attack.name }} +{{
          attacker.extraPower.attack.power
        }}
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

      <q-card-section v-if="defender.extraPower.defense" class="q-pt-none">
        {{ defender.extraPower.defense.name }} +{{
          defender.extraPower.defense.power
        }}
      </q-card-section>
    </q-card>
  </div>
</template>

<script lang="ts">
import { action, extraPower, fighter, gameObject, power } from "@/types";
import { Component, Vue } from "vue-property-decorator";
import items from "@/models/items";

@Component({
  name: "Attack",
})
export default class Attack extends Vue {
  private charactersNames = process.env.VUE_APP_CHARACTERS.split(", ");
  private itemsNames = process.env.VUE_APP_ITEMS.split(", ");
  private basicAttacks =
    process.env.VUE_APP_CHARACTERS_BASIC_ATTACK.split(", ");

  get lastAction(): action {
    return this.$store.state.status.lastAction;
  }
  get inventory(): gameObject[] {
    return this.$store.state.playerStatus.inventory;
  }
  get swordAttack(): power | undefined {
    const sword = this.inventory.find((object: gameObject) => {
      return object.id == items.Espada;
    });
    return sword
      ? {
          id: items.Espada,
          name: this.itemsNames[items.Espada],
          power: process.env.VUE_APP_SWORD_ATTACK,
        }
      : undefined;
  }
  get shieldDefense(): power | undefined {
    const shield = this.inventory.find((object: gameObject) => {
      return object.id == items.Escudo;
    });
    return shield
      ? {
          id: items.Escudo,
          name: this.itemsNames[items.Escudo],
          power: process.env.VUE_APP_SHIELD_DEFENSE,
        }
      : undefined;
  }
  get attacker(): fighter {
    if (!this.lastAction.onObject) return this.player;

    const attackerCharacter: fighter = {
      id: this.lastAction.object.id,
      name: this.lastAction.object.name,
      type: "character",
      basicAttack: this.basicAttacks[this.lastAction.object.id],
      extraPower: this.returnExtraPower(this.lastAction.object.id),
    };

    return attackerCharacter;
  }
  get defender(): fighter {
    const first: fighter = {
      id: this.lastAction.object.id,
      name: this.lastAction.object.name,
      type: "character",
      basicAttack: this.basicAttacks[this.lastAction.object.id],
      extraPower: this.returnExtraPower(this.lastAction.object.id),
    };
    const second: fighter | undefined = this.lastAction.onObject
      ? this.lastAction.onObject.id == -1
        ? this.player
        : {
            id: this.lastAction.object.id,
            name: this.lastAction.object.name,
            type: "character",
            basicAttack: this.basicAttacks[this.lastAction.object.id],
            extraPower: this.returnExtraPower(this.lastAction.object.id),
          }
      : undefined;
    return second ? second : first;
  }
  get player(): fighter {
    return {
      id: -1,
      name: this.$store.state.playerStatus.name,
      type: "player",
      basicAttack: process.env.VUE_APP_PLAYER_BASIC_ATTACK,
      extraPower: this.returnExtraPower(-1),
    };
  }

  returnExtraPower(characterId: number): extraPower {
    switch (characterId) {
      case -1:
        return { attack: this.swordAttack, defense: this.shieldDefense };
      default:
        return { attack: undefined, defense: undefined };
    }
  }
}
</script>
<style lang="scss" scoped>
.attack-view {
  display: flex;
  box-shadow: none;

  .centralized {
    display: flex;
    justify-content: center;
  }

  .middle-card {
    height: 40px;
    padding: 10px;
    margin: 0 10px;
  }

  .attacker-card,
  .defender-card {
    min-width: 225px;
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
