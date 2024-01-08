<script setup lang="ts">
import cityImage from "../assets/ai-city-intro.jpg";
import LegacyCity from "./LegacyCity.vue";
import { storeToRefs } from "pinia";
import { useAppStatus } from "../store/useAppStatus";

const appStatusStore = useAppStatus();
const { introCompleted } = storeToRefs(appStatusStore);
</script>

<template>
  <div class="intro">
    <LegacyCity :class="['legacy-component', introCompleted ? 'gone' : '']" />
    <div
      :class="['city-background', introCompleted ? '' : 'gone']"
      :style="`background-image: url('${cityImage}')`"
    />
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
.gradient-background {
  width: 100%;
  background: no-repeat center center fixed;
  background-size: cover;
}
.gone {
  transition: all 5s;
  opacity: 0;
}
.city-background {
  position: absolute;
  background: no-repeat center center fixed;
  background-size: contain;
  height: 100%;
  width: 100%;
}
</style>
