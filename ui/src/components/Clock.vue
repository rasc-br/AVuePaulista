<template>
  <div>
    <div class="row flex-center">
      <q-icon
        :name="nightTime ? 'bedtime' : 'brightness_7'"
        style="font-size: 3em"
      />
    </div>
    <div class="row">
      <q-chip
        outline
        square
        color="red"
        text-color="white"
        icon="alarm"
        :label="time"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";

@Component
export default class Clock extends Vue {
  get addMinutes(): number {
    return this.$store.state.status.addMinutes;
  }
  get time(): string {
    return dayjs()
      .hour(process.env.VUE_APP_START_TIME)
      .startOf("hour")
      .add(this.addMinutes, "minutes")
      .format("LT");
  }
  get nightTime(): boolean {
    return (
      dayjs()
        .hour(process.env.VUE_APP_START_TIME)
        .startOf("hour")
        .add(this.addMinutes, "minutes")
        .hour() > 20
    );
  }
  created(): void {
    dayjs.extend(localizedFormat);
  }
  mounted(): void {
    setInterval((): void => {
      this.$store.dispatch("addMinutes", 1);
    }, 10000);
  }
}
</script>
