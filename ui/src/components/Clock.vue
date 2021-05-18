<template>
  <q-chip
    outline
    square
    color="red"
    text-color="white"
    icon="alarm"
    :label="time"
  />
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";

@Component
export default class Clock extends Vue {
  private addMinutes = 0;
  get time(): string {
    return dayjs()
      .hour(process.env.VUE_APP_START_TIME)
      .startOf("hour")
      .add(this.addMinutes, "minutes")
      .format("LT");
  }
  created(): void {
    dayjs.extend(localizedFormat);
  }
  mounted(): void {
    setInterval((): void => {
      this.addMinutes = this.addMinutes + 1;
    }, 10000);
  }
}
</script>
