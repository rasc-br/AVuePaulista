<script setup lang="ts">
import IntroAnimation from "./IntroAnimation.vue";
import TheGame from "./TheGame.vue";
import { storeToRefs } from "pinia";
import { useAppStatus } from "../store/useAppStatus";
import { IntroMode, GameMode } from "../../types";

const appStatusStore = useAppStatus();
const { introMode, gameMode } = storeToRefs(appStatusStore);
</script>

<template>
  <div class="avue-paulista">
    <IntroAnimation v-if="gameMode === GameMode.intro" />
    <TheGame v-if="introMode === IntroMode.done" />
  </div>
</template>

<style scoped></style>
