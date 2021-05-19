<template>
  <q-page class="bg-red-2" key="game-page">
    <div class="row map-and-clock">
      <div class="col-8 flex flex-center">map-position</div>
      <div class="col-4 flex flex-center">
        <div class="row logo-and-clock">
          <div class="col-12 flex flex-center q-pa-md">Add Logo Here</div>
          <div class="col-12 flex flex-center"><Clock /></div>
        </div>
      </div>
    </div>
    <div class="row actions-and-room">
      <div class="col-4 flex flex-center">actions</div>
      <div class="col-8 flex flex-center">room</div>
    </div>
    <div class="row inventory">
      <div class="col-12 flex flex-center">inventory</div>
    </div>
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
