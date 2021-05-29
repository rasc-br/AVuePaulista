<template>
  <div class="q-pa-md status flex flex-center">Add player status here</div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({
  name: "PlayerStatus",
})
export default class PlayerStatus extends Vue {}
</script>
<style lang="scss" scoped>
.status {
  border: 1px solid black;
  height: 100%;
  width: 100%;
  margin: 20px;
  height: 150px;
}
</style>
