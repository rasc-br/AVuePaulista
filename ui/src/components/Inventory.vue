<template>
  <q-card class="inventory bg-red-3">
    <q-list>
      <q-item clickable>
        <q-item-section avatar>
          <q-icon class="sword" color="blue-grey-8" name="custom" />
        </q-item-section>

        <q-item-section>
          <q-item-label>Sword</q-item-label>
        </q-item-section>
      </q-item>
    </q-list>
  </q-card>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({
  name: "Inventory",
})
export default class Inventory extends Vue {}
</script>
<style lang="scss" scoped>
.inventory {
  height: 100%;
  width: 100%;
  margin-left: 20px;
}
.sword:before {
  content: url("../assets/sword.svg");
}
</style>
