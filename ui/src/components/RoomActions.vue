<template>
  <div class="q-pa-md room-actions">
    <q-btn round color="amber" text-color="black" icon="sports_mma" />
    <q-btn round color="amber" text-color="black" icon="announcement" />
    <q-btn
      round
      color="amber"
      text-color="black"
      class="rotate-180"
      icon="play_for_work"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({
  name: "RoomActions",
})
export default class RoomActions extends Vue {}
</script>
