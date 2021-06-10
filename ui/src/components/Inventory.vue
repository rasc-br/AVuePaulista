<template>
  <q-card class="inventory bg-red-3">
    <q-list>
      <div v-for="item in inventory" :key="item.id">
        <q-item clickable @click.stop="action(item)" class="inventory-object">
          <q-item-section avatar>
            <q-icon
              :class="[
                'side-icon',
                `icon-${item.type == 'character' ? 'char' : 'item'}-${item.id}`,
              ]"
            />
          </q-item-section>
          <q-item-section>
            <q-item-label>{{
              item.type == "character" ? characters[item.id] : items[item.id]
            }}</q-item-label>
          </q-item-section>
        </q-item>
      </div>
    </q-list>
  </q-card>
</template>

<script lang="ts">
import { character, item } from "@/types";
import { Component, Vue } from "vue-property-decorator";

@Component({
  name: "Inventory",
})
export default class Inventory extends Vue {
  private items = process.env.VUE_APP_ITEMS.split(", ");
  private characters = process.env.VUE_APP_CHARACTERS.split(", ");

  get inventory(): item[] {
    return this.$store.state.playerStatus.inventory;
  }

  get currentPosition(): number {
    return this.$store.state.playerStatus.currentPosition;
  }

  get gameObjects(): character[] | item[] {
    const all = this.$store.state.gameObjects.characters.concat(
      this.$store.state.gameObjects.items
    );
    return all.filter((object: character | item) => {
      return object.position === this.currentPosition;
    });
  }

  get lastAction(): string {
    return this.$store.state.status.lastAction.status;
  }

  action(object: character | item): void {
    const validInventoryActions = ["drop", "use"];
    if (
      !validInventoryActions.includes(
        this.$store.state.status.lastAction.action
      )
    ) {
      this.$store.dispatch("addAction", {
        action: "",
        object: {
          id: -1,
          name: "",
          type: "",
        },
        status: "cancel",
      });
      return;
    }
    if (this.lastAction == "start") {
      this.$store.dispatch("addAction", {
        action: this.$store.state.status.lastAction.action,
        object: {
          id: object.id,
          name: object.health
            ? this.characters[object.id]
            : this.items[object.id],
          type: object.health ? "character" : "item",
        },
        status: "end",
      });
    }
  }
}
</script>
<style lang="scss" scoped>
.inventory {
  height: 100%;
  width: 100%;
  margin-left: 20px;
  overflow: auto;
  max-height: 295px;
  .inventory-object {
    cursor: inherit !important;
  }
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
  &.icon-char-5 {
    content: url("../assets/owl2.svg");
  }
}
</style>
