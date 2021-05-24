<template>
  <div class="q-pa-md movements">
    <q-input
      readonly
      rounded
      standout
      class="current-position"
      :label="`Current Position: ${places[currentPosition]}`"
    >
      <template v-slot:prepend>
        <q-icon name="place" />
      </template>
    </q-input>
    <div class="options flex justify-around">
      <div v-for="place in placeOptions" :key="place">
        <q-btn
          align="between"
          rounded
          class="to-go-place"
          @click="movePlayer(place)"
        >
          <q-icon class="explore" left size="2em" name="explore" />
          <div>{{ places[place] }}</div>
        </q-btn>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({
  name: "Movements",
})
export default class Movements extends Vue {
  private places = process.env.VUE_APP_PLACES.split(", ");
  get placeOptions(): string[] {
    return this.$store.state.playerStatus.possibleMovements;
  }
  get currentPosition(): number {
    return this.$store.state.playerStatus.currentPosition;
  }
  created(): void {
    // Game Requirement: Player cannot start on "Céu"(sky) or "Teto do MASP"(End stage)
    const maxPosition = this.places.length - 3;
    this.$store.dispatch(
      "updatePlayerPosition",
      this.randomBetween(0, maxPosition)
    );
  }

  movePlayer(place: number): void {
    this.$store.dispatch("updatePlayerPosition", place);
    this.$store.dispatch("addMinutes", this.randomBetween(10, 20));
  }
}
</script>

<style lang="scss" scoped>
::v-deep .q-field--standout.q-field--readonly .q-field__control::before {
  border: 1px solid rgba(0, 0, 0, 0.24);
}
.q-btn {
  text-transform: none;
}
.movements {
  width: 100%;
}
.current-position {
  max-width: 600px;
  padding-bottom: 20px;
}
.to-go-place {
  background: rgba(0, 0, 0, 0.05);
  margin-bottom: 20px;
}
.explore {
  color: rgba(0, 0, 0, 0.5);
}
.options {
  max-width: 600px;
  min-height: 112px;
}
</style>
