<script setup lang="ts">
import cityImage from "../assets/ai-city-intro.jpg";
import backgroundImage from "../assets/gradient-intro.jpg";
import LegacyCity from "./LegacyCity.vue";
</script>

<template>
  <div class="intro">
    <div
      class="image-container"
      :style="`background-image: url('${cityImage}')`"
    >
      <LegacyCity />
    </div>
    <!-- <div
      class="image-container"
      :style="`background-image: url('${backgroundImage}')`"
    /> -->
  </div>
</template>

<style scoped>
.image-container {
  height: 100vh;
  max-width: 993px;
  margin: auto;
  background: no-repeat center center fixed;
  background-size: contain;
}
</style>
