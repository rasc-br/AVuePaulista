<template>
  <q-layout view="hHh lpR fFf">
    <q-page-container>
      <Game />
    </q-page-container>
    <Footer />
  </q-layout>
</template>

<script>
import { Component, Vue } from "vue-property-decorator";
import Game from "@/components/Game.vue";
import Footer from "@/components/Footer.vue";

@Component({
  name: "App",
  components: {
    Game,
    Footer,
  },
})
export default class App extends Vue {}
</script>

<style></style>
