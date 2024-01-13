<script setup lang="ts">
import LegacyCity from "./LegacyCity.vue";
import { storeToRefs } from "pinia";
import { useAppStatus } from "../store/useAppStatus";
import NewCity from "./NewCity.vue";
import { IntroMode } from "../../types";

const appStatusStore = useAppStatus();
const { introMode } = storeToRefs(appStatusStore);
</script>

<template>
  <div class="intro">
    <LegacyCity :class="['legacy-component', introMode === IntroMode.new ? 'gone' : '']" />
    <NewCity :class="['newcity-component', introMode === IntroMode.legacy ? 'gone' : '']" />
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
.gone {
  transition: all 5s;
  opacity: 0;
}
.newcity-component {
  transition: all 5s;
}
@media (min-width: 1200px) {
  .intro {
    width: 60vw;
    right: calc(50% - 30vw);
  }
}
</style>
