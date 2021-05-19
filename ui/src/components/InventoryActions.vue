<template>
  <div class="q-pa-md room-actions">
    <q-btn round color="amber" text-color="black" icon="build" />
    <q-btn round color="amber" text-color="black" icon="play_for_work" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({
  name: "InventoryActions",
})
export default class InventoryActions extends Vue {}
</script>
