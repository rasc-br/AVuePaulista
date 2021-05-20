<template>
  <div class="q-pa-md inventory flex flex-center">Add inventory here</div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({
  name: "Inventory",
})
export default class Inventory extends Vue {}
</script>
<style lang="scss" scoped>
.inventory {
  border: 1px solid black;
  height: 100%;
  width: 100%;
  margin-left: 20px;
}
</style>
