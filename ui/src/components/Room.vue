<template>
  <q-card class="room bg-red-3">
    <q-list>
      <q-item clickable>
        <q-item-section avatar>
          <q-icon class="bombarder" color="blue-grey-8" name="custom" />
        </q-item-section>

        <q-item-section>
          <q-item-label>Bombardeador</q-item-label>
          <q-item-label caption>10 / 10</q-item-label>
        </q-item-section>
      </q-item>
    </q-list>
  </q-card>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({
  name: "Room",
})
export default class Room extends Vue {}
</script>
<style lang="scss" scoped>
.room {
  height: 100%;
  width: 100%;
}
.bombarder:before {
  content: url("../assets/bombarder.svg");
}
</style>
