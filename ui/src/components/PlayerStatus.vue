<template>
  <q-card class="room bg-deep-orange-3 status">
    <q-list>
      <q-item clickable>
        <q-item-section>
          <q-item-label class="text-h6 text-bold">{{
            player.name
          }}</q-item-label>
        </q-item-section>
        <q-item-section>
          <q-item-label>Score: {{ player.points }}</q-item-label>
        </q-item-section>
      </q-item>
      <q-item clickable>
        <q-item-section>
          <q-item-label
            >Health: {{ player.health }} / {{ player.maxHealth }}</q-item-label
          >
        </q-item-section>
        <q-item-section>
          <q-item-label>Capacity: {{ player.capacity }}</q-item-label>
        </q-item-section>
      </q-item>
    </q-list>
  </q-card>
</template>

<script lang="ts">
import { playerStatus } from "@/types";
import { Component, Vue } from "vue-property-decorator";

@Component({
  name: "PlayerStatus",
})
export default class PlayerStatus extends Vue {
  get player(): playerStatus {
    return this.$store.state.playerStatus;
  }
}
</script>
<style lang="scss" scoped>
.status {
  border: 1px solid black;
  height: 100%;
  width: 100%;
  margin: 20px;
  height: 150px;
}
</style>
