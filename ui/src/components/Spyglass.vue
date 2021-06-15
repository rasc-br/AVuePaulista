<template>
  <div class="spyglass-view">
    <q-list>
      <div v-for="object in gameObjects" :key="`${object.id}${object.health}`">
        <q-item class="spyglass-object">
          <q-item-section avatar>
            <q-icon
              :class="[
                'side-icon',
                object.health
                  ? `icon-char-${object.id}`
                  : `icon-item-${object.id}`,
              ]"
            />
          </q-item-section>
          <q-item-section v-if="object.health">
            <q-item-label>{{ characters[object.id] }}</q-item-label>
            <q-item-label caption
              >{{ object.health }} / {{ object.maxHealth }}</q-item-label
            >
          </q-item-section>
          <q-item-section v-else>
            <q-item-label>{{ items[object.id] }}</q-item-label>
          </q-item-section>
        </q-item>
      </div>
    </q-list>
  </div>
</template>

<script lang="ts">
import { character, item } from "@/types";
import { Component, Prop, Vue } from "vue-property-decorator";

@Component({
  name: "Spyglass",
})
export default class Spyglass extends Vue {
  @Prop({ required: true }) readonly positionId!: number;

  private characters = process.env.VUE_APP_CHARACTERS.split(", ");
  private items = process.env.VUE_APP_ITEMS.split(", ");

  get gameObjects(): character[] | item[] {
    const all = this.$store.state.gameObjects.characters.concat(
      this.$store.state.gameObjects.items
    );
    return all.filter((object: character | item) => {
      return object.position === this.positionId;
    });
  }
}
</script>
<style lang="scss" scoped>
.spyglass-view {
  padding: 15px 0 0 100px;
  .spyglass-object {
    cursor: inherit !important;
  }
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
