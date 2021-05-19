<template>
  <q-page class="bg-red-2" key="game-page">
    <div class="row movements-logo-clock">
      <div class="col-6 flex"><Movements /></div>
      <div class="col-2 flex">
        <div class="col-12 flex flex-center q-pa-md avlogo">Add Logo Here</div>
      </div>
      <div class="col-4 flex flex-center">
        <div><Clock /></div>
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
import Movements from "@/components/Movements.vue";

@Component({
  name: "Game",
  components: {
    Clock,
    Movements,
  },
})
export default class Game extends Vue {}
</script>
<style lang="scss" scoped>
.avlogo {
  border: 1px solid black;
}
</style>
