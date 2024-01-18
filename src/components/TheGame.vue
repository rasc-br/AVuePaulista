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
    width: "200vw",
    height: "200vh",
    top: "-50%",
    left: "-50%",
    duration: 3,
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
  border-radius: 50%;
  top: 50%;
  left: 50%;
  width: 0.1vw;
  height: 0.1vh;
}
</style>
