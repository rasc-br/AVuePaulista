<script setup lang="ts"></script>

<template>
  <div class="legacy-city">
    <div class="building floor" />
    <div class="building one" />
    <div class="building two" />
    <div class="building three" />
    <div class="building four" />
    <div class="building five" />
    <div class="building six" />
    <div class="moon" />
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
  border: 1px solid black !important;
  background: black;
}
.building.floor {
  border: 1px solid green;
  height: 10%;
  width: 80%;
  display: flex;
  align-self: flex-end;
  margin-bottom: 20px;
}
.building.one {
  border: 1px solid yellow;
  height: 96%;
  width: 17%;
  display: flex;
  align-self: flex-end;
  margin-bottom: 20px;
  left: 10%;
}
.building.two {
  border: 1px solid orange;
  height: 33%;
  width: 36%;
  display: flex;
  align-self: flex-end;
  margin-bottom: 20px;
  left: 28%;
}
.building.three {
  border: 1px solid teal;
  height: 51%;
  width: 13%;
  display: flex;
  align-self: flex-end;
  margin-bottom: 20px;
  left: 34%;
}
.building.four {
  border: 1px solid blue;
  height: 87%;
  width: 15%;
  display: flex;
  align-self: flex-end;
  margin-bottom: 20px;
  left: 49%;
}
.building.five {
  border: 1px solid violet;
  height: 66%;
  width: 11%;
  display: flex;
  align-self: flex-end;
  margin-bottom: 20px;
  left: 66%;
}
.building.six {
  border: 1px solid green;
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
  top: 0%;
  border-radius: 65%;
}
</style>
