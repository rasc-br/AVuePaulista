<template>
  <div class="q-pa-md room-actions">
    <q-btn
      class="icon-actions"
      round
      push
      color="red-10"
      text-color="white"
      icon="sports_mma"
    />
    <q-btn
      class="icon-actions"
      round
      push
      color="blue-9"
      text-color="white"
      icon="announcement"
    />
    <q-btn
      class="icon-actions"
      round
      push
      color="green-9"
      text-color="white"
      icon="back_hand"
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
<style lang="scss" scoped>
.icon-actions {
  font-size: 1.5em;
}
</style>
