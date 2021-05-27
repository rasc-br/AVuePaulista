<template>
  <q-card class="room bg-red-3">
    <q-list>
      <div
        v-for="object in gameObjects"
        :key="`${object.name}${object.health}`"
      >
        <q-item clickable>
          <q-item-section avatar>
            <q-icon
              :class="[
                'side-icon',
                object.health
                  ? `icon-char-${object.name}`
                  : `icon-item-${object.name}`,
              ]"
            />
          </q-item-section>

          <q-item-section v-if="object.health">
            <q-item-label>{{ characters[object.name] }}</q-item-label>
            <q-item-label caption
              >{{ object.health }} / {{ object.maxHealth }}</q-item-label
            >
          </q-item-section>
          <q-item-section v-else>
            <q-item-label>{{ items[object.name] }}</q-item-label>
          </q-item-section>
        </q-item>
      </div>
    </q-list>
  </q-card>
</template>

<script lang="ts">
import { character, item } from "@/types";
import { Component, Vue } from "vue-property-decorator";

@Component({
  name: "Room",
})
export default class Room extends Vue {
  private characters = process.env.VUE_APP_CHARACTERS.split(", ");
  private items = process.env.VUE_APP_ITEMS.split(", ");

  get currentPosition(): number {
    return this.$store.state.playerStatus.currentPosition;
  }

  get gameObjects(): character[] | item[] {
    const all = this.$store.state.gameObjects.characters.concat(
      this.$store.state.gameObjects.items
    );
    return all.filter((object: character | item) => {
      return object.position === this.currentPosition;
    });
  }
}
</script>
<style lang="scss" scoped>
.room {
  height: 100%;
  width: 100%;
}
.side-icon {
  padding-left: 7px;
  font-size: 80px !important;
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
