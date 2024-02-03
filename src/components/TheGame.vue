<script setup lang="ts">
import { gsap } from "gsap";
import { onMounted } from "vue";
import backgroundImage from "../assets/gradient-intro.jpg";
import { GameMode } from "../../types";
import { storeToRefs } from "pinia";
import { useAppStatus } from "../store/useAppStatus";
import PlayerMoviments from "./InGame/PlayerMoviments.vue";
import SimpleLogo from "./InGame/AVLogo.vue";
import Clock from "./InGame/AVClock.vue";
import PlayerStatus from "./InGame/PlayerStatus.vue";

const appStatusStore = useAppStatus();
const { gameMode } = storeToRefs(appStatusStore);

onMounted(() => {
  const circleTImeline = gsap.timeline({
    onComplete: () => {
      gameMode.value = GameMode.game;
    },
  });
  circleTImeline
    .to(".transition-circle", {
      delay: 0.1,
      width: "150vw",
      height: "250vh",
      top: "-75%",
      left: "-25%",
      duration: 3,
    })
    .to(".transition-circle", {
      "z-index": 0,
    });
});
</script>

<template>
  <div class="main-game">
    <div class="transition-circle" :style="`background-image: url('${backgroundImage}')`" />
    <div v-if="gameMode === GameMode.game" class="grid-container full">
      <div class="cell moviments"><PlayerMoviments /></div>
      <div class="cell logo"><SimpleLogo /></div>
      <div class="cell clock"><Clock /></div>
      <div class="cell room-actions"><span>room-actions</span></div>
      <div class="cell room"><span>room</span></div>
      <div class="cell inventory"><span>inventory</span></div>
      <div class="cell inventory-actions"><span>inventory-actions</span></div>
      <div class="cell player-status"><PlayerStatus /></div>
      <div class="cell logs"><span>logs</span></div>
    </div>
  </div>
</template>

<style scoped>
.full {
  width: 100wv;
  height: 100vh;
}
.grid-container {
  display: grid;
  grid-template-columns: 10% 10% 10% 10% 10% 10% 10% 10% 10% 10%;
  grid-template-rows: 20% 60% 20%;
  grid-template-areas:
    "moviments moviments moviments moviments moviments logo logo clock clock clock"
    "room-actions room room room room inventory inventory inventory inventory inventory-actions"
    "player-status player-status player-status . . . logs logs logs logs";
  padding: 16px;
}
.transition-circle {
  position: absolute;
  border-radius: 50%;
  top: 50%;
  left: 50%;
  width: 0.1vw;
  height: 0.1vh;
  z-index: 2;
}
.cell {
  z-index: 1;
}
.moviments {
  grid-area: moviments;
}
.logo {
  grid-area: logo;
}
.clock {
  grid-area: clock;
}
.room-actions {
  grid-area: room-actions;
}
.room {
  grid-area: room;
}
.inventory {
  grid-area: inventory;
}
.inventory-actions {
  grid-area: inventory-actions;
}
.player-status {
  grid-area: player-status;
}
.logs {
  grid-area: logs;
}
</style>
