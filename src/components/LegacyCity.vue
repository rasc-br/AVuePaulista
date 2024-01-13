<script setup lang="ts">
import { onMounted } from "vue";
import { gsap } from "gsap";
import { storeToRefs } from "pinia";
import { useAppStatus } from "../store/useAppStatus";
import backgroundImage from "../assets/gradient-intro.jpg";
import { IntroMode } from "../../types";

const appStatusStore = useAppStatus();
const { introMode } = storeToRefs(appStatusStore);

onMounted(() => {
  const cityTimeline = gsap.timeline({
    onComplete: () => {
      introMode.value = IntroMode.new;
    },
  });
  cityTimeline
    .from(
      ".building",
      {
        opacity: 0,
        y: "random(-50, 50)",
        duration: 1,
        height: 0,
        stagger: 0.15,
      },
      "+=1",
    )
    .from(".moon", {
      opacity: 0,
      height: 0,
    })
    .from(".letter-A", {
      opacity: 0,
      left: "100%",
      duration: 1.5,
      delay: 2,
    })
    .from(".letter-V", {
      opacity: 0,
      left: "25%",
      duration: 1.5,
    })
    .from(".letter-P", {
      opacity: 0,
      left: "71%",
      duration: 3.5,
    })
    .from(
      ".letter-a",
      {
        opacity: 0,
        left: "66%",
        duration: 3.5,
      },
      "<",
    )
    .from(
      ".letter-u",
      {
        opacity: 0,
        left: "61%",
        duration: 3.5,
      },
      "<",
    )
    .from(
      ".letter-l",
      {
        opacity: 0,
        left: "57%",
        duration: 3.5,
      },
      "<",
    )
    .from(
      ".letter-i",
      {
        opacity: 0,
        left: "54%",
        duration: 3.5,
      },
      "<",
    )
    .from(
      ".letter-s",
      {
        opacity: 0,
        left: "49%",
        duration: 3.5,
      },
      "<",
    )
    .from(
      ".letter-t",
      {
        opacity: 0,
        left: "44%",
        duration: 3.5,
      },
      "<",
    )
    .from(
      ".letter-a2",
      {
        opacity: 0,
        left: "40%",
        duration: 3.5,
      },
      "<",
    )
    .to("legacy-city", {
      delay: 3,
    });
});
</script>

<template>
  <div class="legacy-city">
    <div class="gradient-background" :style="`background-image: url('${backgroundImage}')`" />
    <!-- The buildings -->
    <div class="building floor" />
    <div class="building one" />
    <div class="building two" />
    <div class="building three" />
    <div class="building four" />
    <div class="building five" />
    <div class="building six" />
    <div class="moon" />
    <!-- The text -->
    <div class="planet-font logo-text letter-A">A</div>
    <div class="planet-font logo-text letter-V">V.</div>
    <div class="planet-font logo-text letter-P">P</div>
    <div class="planet-font logo-text letter-a">a</div>
    <div class="planet-font logo-text letter-u">u</div>
    <div class="planet-font logo-text letter-l">l</div>
    <div class="planet-font logo-text letter-i">i</div>
    <div class="planet-font logo-text letter-s">s</div>
    <div class="planet-font logo-text letter-t">t</div>
    <div class="planet-font logo-text letter-a2">a</div>
  </div>
</template>

<style scoped>
.legacy-city {
  z-index: 1;
  position: absolute;
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
}
.building {
  position: absolute;
  border: 1px solid black;
  background: black;
}
.building.floor {
  height: 10%;
  width: 80%;
  display: flex;
  align-self: flex-end;
  margin-bottom: 20px;
}
.building.one {
  height: 96%;
  width: 17%;
  display: flex;
  align-self: flex-end;
  margin-bottom: 20px;
  left: 10%;
}
.building.two {
  height: 33%;
  width: 36%;
  display: flex;
  align-self: flex-end;
  margin-bottom: 20px;
  left: 28%;
}
.building.three {
  height: 51%;
  width: 13%;
  display: flex;
  align-self: flex-end;
  margin-bottom: 20px;
  left: 34%;
}
.building.four {
  height: 87%;
  width: 15%;
  display: flex;
  align-self: flex-end;
  margin-bottom: 20px;
  left: 49%;
}
.building.five {
  height: 66%;
  width: 11%;
  display: flex;
  align-self: flex-end;
  margin-bottom: 20px;
  left: 66%;
}
.building.six {
  height: 50%;
  width: 11%;
  display: flex;
  align-self: flex-end;
  margin-bottom: 20px;
  left: 79%;
}
.moon {
  position: absolute;
  box-shadow: inset -31px 14px 0 7px white;
  height: 15%;
  width: 13%;
  display: flex;
  left: 71%;
  top: 5%;
  border-radius: 65%;
}
.logo-text {
  font-size: 100px;
  z-index: 3;
  position: absolute;
}
.letter-A {
  left: 31%;
  top: 26%;
}
.letter-V {
  left: 35%;
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

.gradient-background {
  width: 100%;
  background: no-repeat center center fixed;
  background-size: cover;
}
</style>
