<script setup lang="ts">
import { onBeforeMount, ref } from "vue";

const time = ref("");

function updateTime() {
  const cd = new Date();
  time.value = zeroPadding(cd.getHours(), 2) + ":" + zeroPadding(cd.getMinutes(), 2);
}

function zeroPadding(num: number, digit: number) {
  let zero = "";
  for (let i = 0; i < digit; i++) {
    zero += "0";
  }
  return (zero + num).slice(-digit);
}

onBeforeMount(() => {
  setInterval(updateTime, 1000);
});
</script>

<template>
  <div class="game-clock">
    <div class="time">{{ time }}</div>
  </div>
</template>

<style scoped>
.game-clock {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-bottom: 50px;
  font-family: fantasy, none;
  color: var(--primary-200);
  text-align: center;
  position: relative;
  text-shadow:
    0 0 20px var(--primary-700),
    0 0 20px rgba(10, 175, 230, 0);
}
.time {
  letter-spacing: 0.05em;
  font-size: 70px;
}
</style>
