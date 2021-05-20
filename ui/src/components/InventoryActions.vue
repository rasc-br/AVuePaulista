<template>
  <div class="q-pa-md inventory-actions">
    <div class="row icon-row flex flex-center top-icon">
      <q-btn
        class="icon-actions"
        round
        push
        color="deep-purple-9"
        text-color="white"
        icon="build"
      >
        <q-tooltip
          transition-show="flip-right"
          transition-hide="flip-left"
          content-class="bg-deep-purple-9"
          content-style="font-size: 16px"
          anchor="top middle"
          self="bottom middle"
          :offset="[10, 10]"
          :delay="1000"
        >
          Use
        </q-tooltip>
      </q-btn>
    </div>
    <div class="row icon-row flex flex-center bottom-icon">
      <q-btn
        class="icon-actions"
        round
        push
        color="green-10"
        text-color="white"
        icon="play_for_work"
      >
        <q-tooltip
          transition-show="flip-right"
          transition-hide="flip-left"
          content-class="bg-green-10"
          content-style="font-size: 16px"
          anchor="bottom middle"
          self="top middle"
          :offset="[10, 10]"
          :delay="1000"
        >
          Drop
        </q-tooltip>
      </q-btn>
    </div>
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
.inventory-actions {
  width: 100%;
}
.icon-actions {
  font-size: 1.5em;
}
.icon-row {
  margin: 10px;
  padding: 35px 0 35px 0;
}
</style>
