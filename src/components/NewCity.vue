<script setup lang="ts">
import cityImage from "../assets/ai-city-intro.jpg";
import vueLogo from "../assets/vue.svg";
</script>
<template>
  <div class="new-city">
    <div
      class="city-background"
      :style="`background-image: url('${cityImage}')`"
    />
    <div class="planet-font text-3d letter-A">A</div>
    <img class="vue-logo" :src="vueLogo" />
    <div class="planet-font text-3d letter-ue">ue</div>
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
.text-3d {
  z-index: 1;
  position: absolute;
  font-size: 6em;
  font-weight: 700;
  color: #f5f5f5;
  text-shadow:
    1px 1px 1px #919191,
    1px 2px 1px #919191,
    1px 3px 1px #919191,
    1px 4px 1px #919191,
    1px 5px 1px #919191,
    1px 6px 1px #919191,
    1px 7px 1px #919191,
    1px 8px 1px #919191,
    1px 9px 1px #919191,
    1px 10px 1px #919191,
    1px 18px 6px rgba(16, 16, 16, 0.4),
    1px 22px 10px rgba(16, 16, 16, 0.2),
    1px 25px 35px rgba(16, 16, 16, 0.2),
    1px 30px 60px rgba(16, 16, 16, 0.4);
}
.vue-logo {
  z-index: 3;
  height: 100px;
  width: 100px;
  position: absolute;
  top: 28%;
  left: 38%;
}
.letter-A {
  left: 31%;
  top: 26%;
}
.letter-ue {
  left: 47%;
  top: 26%;
}
</style>
