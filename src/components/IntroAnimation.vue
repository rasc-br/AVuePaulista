<script setup lang="ts">
import cityImage from "../assets/ai-city-intro.jpg";
import backgroundImage from "../assets/gradient-intro.jpg";
import LegacyCity from "./LegacyCity.vue";
</script>

<template>
  <div class="intro">
    <div
      class="image-container"
      :style="`background-image: url('${backgroundImage}')`"
    />
    <LegacyCity />
    <!-- <img
      class="image"
      :src="backgroundImage"
      alt="game-intro-gradient"
      style="opacity: 0.8"
    /> -->
  </div>
</template>

<style scoped>
.intro {
  position: absolute;
  height: 80vh;
  width: 80vw;
  top: calc(50% - 40vh);
  right: calc(50% - 40vw);
  display: flex;
  justify-content: center;
}
.image {
  position: relative;
}
.image-container {
  width: 100%;
  background: no-repeat center center fixed;
  background-size: contain;
}
</style>
