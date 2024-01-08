<script setup lang="ts">
import cityImage from "../assets/ai-city-intro.jpg";
</script>
<template>
  <div class="new-city">
    <div
      class="city-background"
      :style="`background-image: url('${cityImage}')`"
    />
  </div>
</template>

<style scoped>
.new-city {
  z-index: 1;
  position: absolute;
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
}
.city-background {
  position: absolute;
  background: no-repeat center center fixed;
  background-size: contain;
  height: 100%;
  width: 100%;
}
</style>
