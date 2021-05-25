<template>
  <q-card class="room bg-red-3">
    <q-list>
      <div v-for="object in gameObjects" :key="object">
        <q-item clickable>
          <q-item-section avatar>
            <q-icon :class="['side-icon', 'bombarder']" />
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
  &.bombarder {
    content: url("../assets/bombarder.svg");
  }
}
</style>
