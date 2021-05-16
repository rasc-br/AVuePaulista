<template>
  <q-page class="flex flex-center">
    <q-chip
      outline
      square
      color="red"
      text-color="white"
      icon="alarm"
      :label="time"
    />
  </q-page>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
@Component
export default class Clock extends Vue {
  get time(): string {
    return process.env.VUE_APP_START_TIME;
  }
}
</script>
