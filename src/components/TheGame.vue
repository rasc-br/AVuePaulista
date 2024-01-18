<script setup lang="ts">
import { gsap } from "gsap";
import { onMounted } from "vue";
import backgroundImage from "../assets/gradient-intro.jpg";
import { GameMode } from "../../types";
import { storeToRefs } from "pinia";
import { useAppStatus } from "../store/useAppStatus";

const appStatusStore = useAppStatus();
const { gameMode } = storeToRefs(appStatusStore);

onMounted(() => {
  const circleTImeline = gsap.timeline({
    onComplete: () => {
      gameMode.value = GameMode.game;
    },
  });
  circleTImeline.to(".transition-circle", {
    scale: 1,
  });
});
</script>

<template>
  <div class="main-game">
    <div class="transition-circle" :style="`background-image: url('${backgroundImage}')`"></div>
  </div>
</template>

<style scoped>
.transition-circle {
  position: absolute;
  background-color: #d63e3e;
  border-radius: 50%;
  top: -50%;
  left: -50%;
  width: 200vw;
  height: 200vh;
  scale: 0.001;
}
</style>
