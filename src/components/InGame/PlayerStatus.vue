<script setup lang="ts">
import { ref } from "vue";
import MeterGroup from "primevue/metergroup";

const healthMeter = ref([{ label: "", color: "#239EF0", value: 100, icon: "" }]);
</script>

<template>
  <div class="player-info">
    <MeterGroup :value="healthMeter" :max="100" />
  </div>
</template>

<style scoped>
:deep(.p-metergroup-label-list-item) {
  display: none;
}
</style>
