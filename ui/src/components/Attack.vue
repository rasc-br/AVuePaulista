<template>
  <div class="attack-view">
    <q-card class="attacker-card">
      <q-card-section class="centralized">
        <q-icon :class="['object-icon', `icon-char-${attacker.id}`]" />
      </q-card-section>

      <q-card-section class="centralized">
        <div class="text-h5">{{ attacker.name }}</div>
      </q-card-section>

      <q-card-section class="q-pt-none text-h6">
        Attack power: {{ attacker.basicAttack }}
      </q-card-section>

      <q-card-section
        v-if="attacker.extraPower.attack"
        class="q-pt-none text-h6"
      >
        {{ attacker.extraPower.attack.name }} +{{
          attacker.extraPower.attack.power
        }}
      </q-card-section>
      <q-card-section
        v-if="lastAction.action == 'use'"
        class="q-pt-none text-h6"
      >
        {{ itemsNames[items.SetaMortal] }} +{{ setaMortalPower }}
      </q-card-section>
    </q-card>

    <q-card class="middle-card"> ATTACKS </q-card>

    <q-card class="defender-card">
      <q-card-section class="centralized">
        <q-icon :class="['object-icon', `icon-char-${defender.id}`]" />
      </q-card-section>

      <q-card-section class="centralized text-h6">
        <div class="text-h5">{{ defender.name }}</div>
      </q-card-section>

      <q-card-section
        v-if="defender.extraPower.defense"
        class="q-pt-none text-h6"
      >
        {{ defender.extraPower.defense.name }} +{{
          defender.extraPower.defense.power
        }}
      </q-card-section>

      <q-card-section class="float-right bottom">
        Lost {{ damage }} of health
      </q-card-section>
    </q-card>
  </div>
</template>

<script lang="ts">
import { action, extraPower, fighter, gameObject, power } from "@/types";
import { Component, Watch, Vue } from "vue-property-decorator";
import items from "@/models/items";

@Component({
  name: "Attack",
})
export default class Attack extends Vue {
  private items = items; // To be used in the template
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
  get damage(): number {
    if (this.lastAction.action == "use") return this.setaMortalPower;

    const attackPower: number =
      (Number(this.attacker.basicAttack) +
        Number(this.attacker.extraPower.attack?.power || 0)) *
      10;
    const defensePower: number =
      Number(this.defender.extraPower.defense?.power || 0) * 10;
    const adjust = (defensePower ? 100 : 50) + attackPower ? 50 : 0;
    const diff: number = attackPower - defensePower - adjust;
    const hit: number = this.randomBetween(diff, 100);
    if (hit > 20 && hit <= 70) return 1;
    if (hit > 70 && hit <= 99) return 2;
    if (hit == 100) return 3;
    return 0;
  }
  get setaMortalPower(): number {
    return this.randomBetween(4, 6);
  }

  @Watch("damage", {
    immediate: true,
  })
  hitTarget(damage: number): void {
    if (damage) {
      this.$store.dispatch("causeDamage", {
        characterId: this.defender.id,
        damage,
      });
    }
  }

  returnExtraPower(characterId: number): extraPower {
    if (characterId == -1) {
      return { attack: this.swordAttack, defense: this.shieldDefense };
    }
    let result: extraPower = { attack: undefined, defense: undefined };

    const percentage: number =
      process.env.VUE_APP_EXTRA_POWER_PERCENTAGE_RATE || 0;
    if (this.randomBetween(1, 100) > percentage) return result;

    if (process.env[`VUE_APP_${characterId}_ATTACK_NAMES`]) {
      const attackNames: string[] =
        process.env[`VUE_APP_${characterId}_ATTACK_NAMES`].split(", ");
      const attackPower: string[] =
        process.env[`VUE_APP_${characterId}_ATTACK_VALUES`].split(", ");
      const randomIndex = this.randomBetween(0, attackNames.length - 1);
      result.attack = {
        id: characterId,
        name: attackNames[randomIndex],
        power: Number(attackPower[randomIndex]),
      };
    }
    if (process.env[`VUE_APP_${characterId}_DEFENSE_NAMES`]) {
      const defenseNames: string[] =
        process.env[`VUE_APP_${characterId}_DEFENSE_NAMES`].split(", ");
      const defensePower: string[] =
        process.env[`VUE_APP_${characterId}_DEFENSE_VALUES`].split(", ");
      const randomIndex = this.randomBetween(0, defenseNames.length - 1);
      result.defense = {
        id: characterId,
        name: defenseNames[randomIndex],
        power: Number(defensePower[randomIndex]),
      };
    }
    return result;
  }
  beforeDestroy(): void {
    if (this.defender.id == -1) {
      if (this.$store.state.playerStatus.health <= 0) {
        this.$store.dispatch("updateGameStatus", "died");
      }
      return;
    }
    const defenderHealth = this.$store.state.gameObjects.characters[this.defender.id].health;
    if (defenderHealth <= 0) {
      this.$store.commit("updateCharacter", {
        character: this.defender.id,
        position: -2,
      });
      this.$store.dispatch("openAlert", {
        open: true,
        message: `The ${this.defender.name} is dead!`,
      });
      this.$store.commit("addLogEntry", `The ${this.defender.name} is dead!`);
      this.$store.dispatch("updateScore", {
        points: 50,
        flag: `kill-${this.defender.name}`,
        logMessage: ` for killing the ${this.defender.name}!`,
      });
    } else if (this.lastAction.action != "counter") {
      const counterAttack = {
        action: "counter",
        object: {
          id: this.defender.id,
          name: this.defender.name,
          type: this.defender.type,
        },
        onObject: {
          id: this.attacker.id,
          name: this.attacker.name,
          type: this.attacker.type,
        },
        status: "end",
      };
      this.$store.dispatch("addLastAction", counterAttack);
      this.$store.dispatch("executeAttack", counterAttack);
    }
  }
}
</script>
<style lang="scss" scoped>
.attack-view {
  display: flex;
  box-shadow: none;
  max-width: none;

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
    width: 340px;
    height: 360px;
    .bottom {
      position: absolute;
      bottom: 40px;
      right: 10px;
    }
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
