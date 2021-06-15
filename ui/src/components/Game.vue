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
    <!-- DIALOGS -->
    <q-dialog v-model="alert.open">
      <q-card>
        <q-card-section>
          <div class="text-h6 message">{{ alert.message }}</div>
          <q-card-section v-if="alert.subMessage" class="q-pt-none sub-message">
            {{ alert.subMessage }}
          </q-card-section>
        </q-card-section>
      </q-card>
    </q-dialog>
    <q-dialog v-model="shoutDialog.open" persistent>
      <q-card style="min-width: 350px">
        <q-card-section>
          <div class="text-h6">What do you want to shout:</div>
        </q-card-section>
        <q-card-section class="q-pt-none">
          <q-input
            dense
            v-model="shout"
            autofocus
            @keyup.enter="executeShout()"
          />
        </q-card-section>
        <q-card-actions align="right" class="text-primary">
          <q-btn
            flat
            label="Nah..."
            @click="
              () => {
                gameClick();
                shout = '';
              }
            "
            v-close-popup
          />
          <q-btn flat label="Shout!" @click="executeShout()" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <q-dialog v-model="spyglassDialog.open">
      <q-card class="spyglass">
        <q-card-section>
          <div class="text-h6 message">{{ spyglassDialog.message }}</div>
          <Spyglass :positionId="spyglassDialog.positionId" />
        </q-card-section>
      </q-card>
    </q-dialog>
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
import Spyglass from "@/components/Spyglass.vue";

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
    Spyglass,
  },
})
export default class Game extends Vue {
  private places = process.env.VUE_APP_PLACES.split(", ");
  private itemsWeight = process.env.VUE_APP_ITEMS_WEIGHT.split(", ");
  private charactersWeight = process.env.VUE_APP_CHARACTERS_WEIGHT.split(", ");
  private words = process.env.VUE_APP_WORDS.split(", ");
  private shout = "";

  get actionClick(): string {
    const lastAction = this.$store.state.status.lastAction;
    return lastAction.status != "end" ? lastAction.action : "";
  }
  get alert(): { open: boolean; message: string } {
    return this.$store.state.alert;
  }
  get shoutDialog(): { open: boolean; message: string } {
    return this.$store.state.shoutDialog;
  }
  get spyglassDialog(): { open: boolean; message: string } {
    return this.$store.state.spyglassDialog;
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
      weight: Number(this.charactersWeight[characters.Coruja]),
    });
    // Add Items
    for (let i = 1; i <= 10; i++) {
      this.$store.dispatch("addItem", {
        item: i,
        position: this.randomBetween(0, this.places.length - 3),
        weight: this.itemsWeight[i],
      });
    }
    // Create words
    this.$store.dispatch("addWord", {
      word: this.words.splice(this.randomBetween(0, this.places.length), 1),
      type: "book",
    });
    this.$store.dispatch("addWord", {
      word: this.words.splice(this.randomBetween(0, this.places.length), 1),
      type: "sorcerer",
    });
  }
  gameClick(): void {
    this.$store.dispatch("addAction", {
      action: "",
      object: {
        id: -1,
        name: "",
        type: "",
      },
      status: "cancel",
    });
  }
  executeShout(): void {
    this.$store.dispatch("triggerShoutDialog", {
      open: false,
      message: this.shout,
    });
    this.shout = "";
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
.attack,
.take,
.use,
.drop {
  cursor: crosshair !important;
}
.message {
  text-align: center;
}
.spyglass {
  border-radius: 50%;
  width: 500px;
  height: 500px;
  border: double;
  background-color: #ffe4c4;
}
.sub-message {
  text-align: center;
  padding-top: 10px;
}
::-webkit-scrollbar {
  width: 6px;
}
::-webkit-scrollbar-track {
  background: #de0505;
}
::-webkit-scrollbar-thumb {
  background: #8a0303;
}
::-webkit-scrollbar-thumb:hover {
  background: #640202;
}
</style>
