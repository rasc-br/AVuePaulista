<template>
  <div class="q-pa-md room flex flex-center">Add room here</div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({
  name: "Room",
})
export default class Room extends Vue {}
</script>
<style lang="scss" scoped>
.room {
  border: 1px solid black;
  height: 100%;
  width: 100%;
}
</style>
