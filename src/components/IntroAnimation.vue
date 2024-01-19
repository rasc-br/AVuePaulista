<script setup lang="ts">
import LegacyCity from "./LegacyCity.vue";
import { storeToRefs } from "pinia";
import { useAppStatus } from "../store/useAppStatus";
import NewCity from "./NewCity.vue";
import { IntroMode } from "../../types";
import { computed } from "vue";

const appStatusStore = useAppStatus();
const { introMode } = storeToRefs(appStatusStore);
const currentComponent = computed(() => {
  return introMode.value === IntroMode.legacy ? LegacyCity : NewCity;
});
</script>

<template>
  <div class="intro">
    <Transition name="fade">
      <component :is="currentComponent" />
    </Transition>
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

@media (min-width: 1200px) {
  .intro {
    width: 60vw;
    right: calc(50% - 30vw);
  }
}
</style>
