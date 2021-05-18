<template>
  <q-page class="flex flex-center">
    <Clock />
  </q-page>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Clock from "@/components/Clock.vue";

@Component({
  name: "Game",
  components: {
    Clock,
  },
})
export default class Game extends Vue {}
</script>
