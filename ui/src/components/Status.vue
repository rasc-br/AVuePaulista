<template>
  <div class="q-pa-md status flex flex-center">Add status here</div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({
  name: "Status",
})
export default class Status extends Vue {}
</script>
<style lang="scss" scoped>
.status {
  border: 1px solid black;
  height: 100%;
  width: 100%;
  margin: 20px;
}
</style>
