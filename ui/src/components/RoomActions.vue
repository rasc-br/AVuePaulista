<template>
  <div class="q-pa-md room-actions">
    <div class="row icon-row flex flex-center top-icon">
      <q-btn
        class="icon-actions"
        round
        push
        color="red-10"
        text-color="white"
        icon="sports_mma"
        @click.stop="action('attack')"
      >
        <q-tooltip
          transition-show="flip-right"
          transition-hide="flip-left"
          content-class="bg-red-10"
          content-style="font-size: 16px"
          anchor="top middle"
          self="bottom middle"
          :offset="[10, 10]"
          :delay="1000"
        >
          Attack
        </q-tooltip>
      </q-btn>
    </div>
    <div class="row icon-row flex flex-center middle-icon">
      <q-btn
        class="icon-actions"
        round
        push
        color="blue-9"
        text-color="white"
        icon="announcement"
        @click.stop="action('shout')"
      >
        <q-tooltip
          transition-show="flip-right"
          transition-hide="flip-left"
          content-class="bg-blue-9"
          content-style="font-size: 16px"
          anchor="center left"
          self="center right"
          :offset="[10, 10]"
          :delay="1000"
        >
          Shout
        </q-tooltip>
      </q-btn>
    </div>
    <div class="row icon-row flex flex-center bottom-icon">
      <q-btn
        class="icon-actions"
        round
        push
        color="green-9"
        text-color="white"
        icon="back_hand"
        @click.stop="action('take')"
      >
        <q-tooltip
          transition-show="flip-right"
          transition-hide="flip-left"
          content-class="bg-green-9"
          content-style="font-size: 16px"
          anchor="bottom middle"
          self="top middle"
          :offset="[10, 10]"
          :delay="1000"
        >
          Take
        </q-tooltip>
      </q-btn>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({
  name: "RoomActions",
})
export default class RoomActions extends Vue {
  action(type: string): void {
    this.$store.dispatch("addAction", {
      action: type,
      object: {
        id: -1,
        name: "",
        type: "",
      },
      status: "start",
    });
  }
}
</script>
<style lang="scss" scoped>
.room-actions {
  width: 100%;
}
.icon-actions {
  font-size: 1.5em;
}
.icon-row {
  margin: 10px;
}
.top-icon,
.bottom-icon {
  padding-right: 50px;
}
.middle-icon {
  padding-left: 50px;
}
</style>
