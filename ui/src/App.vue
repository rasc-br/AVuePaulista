<template>
  <q-layout view="lHh Lpr lFf">
    <q-page-container>
      <Game />
    </q-page-container>
  </q-layout>
</template>

<script>
import { Component, Vue } from "vue-property-decorator";
import Game from "@/components/Game.vue";

@Component({
  name: "App",
  components: {
    Game,
  },
})
export default class App extends Vue {}
</script>

<style></style>
