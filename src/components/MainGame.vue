<script setup lang="ts">
import IntroAnimation from "./IntroAnimation.vue";
import TheGame from "./TheGame.vue";
import { storeToRefs } from "pinia";
import { useAppStatus } from "../store/useAppStatus";
import { IntroMode, GameMode } from "../../types";
import Button from "primevue/button";

const appStatusStore = useAppStatus();
const { introMode, gameMode } = storeToRefs(appStatusStore);

function skipIntro() {
  introMode.value = IntroMode.done;
  gameMode.value === GameMode.game;
}
</script>

<template>
  <div class="avue-paulista">
    <IntroAnimation v-if="gameMode === GameMode.intro" />
    <TheGame v-if="introMode === IntroMode.done" />
    <Transition name="fade">
      <Button v-if="introMode !== IntroMode.done" class="skip-button" label="Skip Intro" outlined @click="skipIntro" />
    </Transition>
  </div>
</template>

<style scoped>
.skip-button {
  color: var(--primary-800);
  position: absolute;
  top: 94%;
  right: 2%;
}
</style>
