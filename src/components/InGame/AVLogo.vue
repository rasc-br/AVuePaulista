<script setup lang="ts">
import vueLogo from "../../assets/Vue3D.png";
</script>

<template>
  <div class="game-logo">
    <div class="planet-font text-3d letter-A">A</div>
    <img class="vue-logo" :src="vueLogo" />
  </div>
</template>

<style scoped>
.game-logo {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
}
.text-3d {
  z-index: 1;
  font-size: 6em;
  font-weight: 700;
  color: #ac5050;
  text-shadow:
    1px 1px 1px #5e1b1b,
    1px 2px 1px #5e1b1b,
    1px 3px 1px #5e1b1b,
    1px 4px 1px #5e1b1b,
    1px 5px 1px #5e1b1b,
    1px 6px 1px #5e1b1b,
    1px 7px 1px #5e1b1b,
    1px 8px 1px #5e1b1b,
    1px 9px 1px #5e1b1b,
    1px 10px 1px #5e1b1b,
    1px 18px 6px rgba(16, 16, 16, 0.4),
    1px 22px 10px rgba(16, 16, 16, 0.2),
    1px 25px 35px rgba(16, 16, 16, 0.2),
    1px 30px 60px rgba(16, 16, 16, 0.4);
}
.vue-logo {
  width: 100px;
  height: 100px;
}
.letter-A {
  position: relative;
  top: -5px;
  right: -15px;
}
</style>
