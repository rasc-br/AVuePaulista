<template>
  <q-page :class="['bg-red-2', actionClick]" key="game-page" @click="gameClick">
    <div class="row movements-logo-clock">
      <div class="col-6 flex"><Movements /></div>
      <div class="col-2 flex">
        <div class="col-12 flex flex-center q-pa-md avlogo">Add Logo Here</div>
      </div>
      <div class="col-4 flex flex-center">
        <div><Clock /></div>
      </div>
    </div>
    <br />
    <div class="row">
      <div class="col-2 flex flex-center"><RoomActions /></div>
      <div class="col-4 flex flex-center"><Room /></div>
      <div class="col-4 flex flex-center"><Inventory /></div>
      <div class="col-2 flex flex-center"><InventoryActions /></div>
    </div>
    <div class="row">
      <div class="col-6 flex flex-center"><PlayerStatus /></div>
      <div class="col-6 flex flex-center"><Status /></div>
    </div>
  </q-page>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Clock from "@/components/Clock.vue";
import Movements from "@/components/Movements.vue";
import RoomActions from "@/components/RoomActions.vue";
import InventoryActions from "@/components/InventoryActions.vue";
import Room from "@/components/Room.vue";
import Inventory from "@/components/Inventory.vue";
import Status from "@/components/Status.vue";
import PlayerStatus from "@/components/PlayerStatus.vue";
import characters from "@/models/characters";

@Component({
  name: "Game",
  components: {
    Clock,
    Movements,
    RoomActions,
    InventoryActions,
    Room,
    Inventory,
    Status,
    PlayerStatus,
  },
})
export default class Game extends Vue {
  private places = process.env.VUE_APP_PLACES.split(", ");

  get actionClick(): string {
    return this.$store.state.status.lastAction.action;
  }

  populateGame(): void {
    // Add Characters
    this.$store.dispatch("addCharacter", {
      character: characters.Bombardeador,
      position: this.randomBetween(0, this.places.length - 3),
    });
    this.$store.dispatch("addCharacter", {
      character: characters.Aguia,
      position: this.randomBetween(0, this.places.length - 2),
    });
    this.$store.dispatch("addCharacter", {
      character: characters.Coruja,
      position: this.randomBetween(0, this.places.length - 2),
    });
    // Add Items
    for (let i = 1; i <= 10; i++) {
      this.$store.dispatch("addItem", {
        item: i,
        position: this.randomBetween(0, this.places.length - 3),
      });
    }
  }
  gameClick(): void {
    this.$store.dispatch("addAction", {
      action: "",
      object: "",
      status: "cancel",
    });
  }
  created(): void {
    this.populateGame();
  }
}
</script>

<style lang="scss" scoped>
.avlogo {
  border: 1px solid black;
  margin: 20px;
}
.attack {
  cursor: crosshair !important;
}
</style>
