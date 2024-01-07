<script setup lang="ts">
import cityImage from "../assets/ai-city-intro.jpg";
import backgroundImage from "../assets/gradient-intro.jpg";
import LegacyCity from "./LegacyCity.vue";
</script>

<template>
  <div class="intro">
    <div
      class="background-image"
      :style="`background-image: url('${cityImage}')`"
    />
    <div
      class="background-image"
      :style="`background-image: url('${backgroundImage}'); opacity: 0.8;`"
    >
      <LegacyCity />
    </div>
  </div>
</template>

<style scoped>
.background-image {
  background: no-repeat center center fixed;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: contain;
  width: 100vw;
  height: 100vh;
  position: absolute;
}
</style>
