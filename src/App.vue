<script setup lang="ts">
import MainGame from "./components/MainGame.vue";
</script>

<template>
  <MainGame />
</template>

<style>
body {
  overflow: hidden;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
