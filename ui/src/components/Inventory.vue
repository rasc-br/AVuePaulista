<template>
  <q-card class="inventory bg-red-3">
    <q-list>
      <div v-for="item in inventory" :key="item.id">
        <q-item clickable>
          <q-item-section avatar>
            <q-icon :class="['side-icon', `icon-item-${item.id}`]" />
          </q-item-section>
          <q-item-section>
            <q-item-label>{{ items[item.id] }}</q-item-label>
          </q-item-section>
        </q-item>
      </div>
    </q-list>
  </q-card>
</template>

<script lang="ts">
import { item } from "@/types";
import { Component, Vue } from "vue-property-decorator";

@Component({
  name: "Inventory",
})
export default class Inventory extends Vue {
  private items = process.env.VUE_APP_ITEMS.split(", ");

  get inventory(): item[] {
    return this.$store.state.playerStatus.inventory;
  }
}
</script>
<style lang="scss" scoped>
.inventory {
  height: 100%;
  width: 100%;
  margin-left: 20px;
}
.sword {
  padding-left: 7px;
  content: url("../assets/sword.svg");
}
.side-icon {
  padding-left: 7px;
  font-size: 80px !important;
  &.icon-item-0 {
    content: url("../assets/book2.svg");
  }
  &.icon-item-1 {
    content: url("../assets/sword.svg");
  }
  &.icon-item-2 {
    content: url("../assets/hipnodisc2.svg");
  }
  &.icon-item-3 {
    content: url("../assets/shield.svg");
  }
  &.icon-item-4 {
    content: url("../assets/wax2.svg");
  }
  &.icon-item-5 {
    content: url("../assets/hang-glider2.svg");
  }
  &.icon-item-6 {
    content: url("../assets/spyglass2.svg");
  }
  &.icon-item-7 {
    content: url("../assets/kitbomb2.svg");
  }
  &.icon-item-8 {
    content: url("../assets/first-aid-kit.svg");
  }
  &.icon-item-9 {
    content: url("../assets/gasmask2.svg");
  }
  &.icon-item-10 {
    content: url("../assets/seta.svg");
  }
}
</style>
