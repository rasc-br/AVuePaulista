<template>
  <div class="q-pa-md room-actions">
    <q-btn
      class="icon-actions"
      round
      push
      color="deep-purple-9"
      text-color="white"
      icon="build"
    />
    <q-btn
      class="icon-actions"
      round
      push
      color="green-10"
      text-color="white"
      icon="play_for_work"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({
  name: "InventoryActions",
})
export default class InventoryActions extends Vue {}
</script>
<style lang="scss" scoped>
.icon-actions {
  font-size: 1.5em;
}
</style>
