<script setup lang="ts">
import cityImage from "../assets/ai-city-intro.jpg";
import vueLogo from "../assets/Vue3D.png";
import { onMounted, onBeforeUnmount } from "vue";
import { gsap } from "gsap";
import { storeToRefs } from "pinia";
import { useAppStatus } from "../store/useAppStatus";
import { IntroMode } from "../../types";

const appStatusStore = useAppStatus();
const { introMode } = storeToRefs(appStatusStore);
const newCityTimeline = gsap.timeline({
  onComplete: () => {
    introMode.value = IntroMode.done;
  },
});

onMounted(() => {
  newCityTimeline
    .to(".letter-A", {
      left: "80%",
      opacity: 0,
      duration: 1.5,
      delay: 4,
    })
    .to(".vue-logo", {
      top: "80%",
      opacity: 0,
      duration: 1.5,
    })
    .to([".letter-P", ".letter-a", ".letter-u", ".letter-l", ".letter-i", ".letter-s", ".letter-t", ".letter-a2"], {
      color: "#d63e3e",
      duration: 0.5,
      stagger: 0.3,
      "text-shadow":
        "1px 1px 1px #5e1b1b, 1px 2px 1px #5e1b1b, 1px 3px 1px #5e1b1b, 1px 4px 1px #5e1b1b, 1px 5px 1px #5e1b1b, 1px 6px 1px #5e1b1b, 1px 7px 1px #5e1b1b, 1px 8px 1px #5e1b1b, 1px 9px 1px #5e1b1b, 1px 10px 1px #5e1b1b",
    })
    .to("new-city", {
      delay: 1,
    });
});

onBeforeUnmount(() => {
  newCityTimeline.kill();
});
</script>
<template>
  <div class="new-city">
    <div class="city-background" :style="`background-image: url('${cityImage}')`" />
    <div class="planet-font text-3d letter-A">A</div>
    <img class="vue-logo" :src="vueLogo" />
    <div class="planet-font text-3d letter-P">P</div>
    <div class="planet-font text-3d letter-a">a</div>
    <div class="planet-font text-3d letter-u">u</div>
    <div class="planet-font text-3d letter-l">l</div>
    <div class="planet-font text-3d letter-i">i</div>
    <div class="planet-font text-3d letter-s">s</div>
    <div class="planet-font text-3d letter-t">t</div>
    <div class="planet-font text-3d letter-a2">a</div>
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
  transition: all ease 5s;
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
  top: 28.5%;
  left: 35%;
}
.letter-A {
  left: 31%;
  top: 26%;
}
.letter-P {
  left: 31%;
  top: 39%;
}
.letter-a {
  left: 36%;
  top: 41%;
}
.letter-u {
  left: 41%;
  top: 44%;
}
.letter-l {
  left: 46%;
  top: 47%;
}
.letter-i {
  left: 51%;
  top: 50%;
}
.letter-s {
  left: 54%;
  top: 53%;
}
.letter-t {
  left: 59%;
  top: 56%;
}
.letter-a2 {
  left: 63%;
  top: 58%;
}
</style>
