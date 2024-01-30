<script setup lang="ts">
import Button from "primevue/button";
</script>

<template>
  <div class="player-moviments">
    <Button class="current-position" label="Current Position: Colégio Objetivo" text rounded raised />
    <Button class="possible-moviment" style="grid-area: mov1" label="Alta 9 de Julho" text rounded raised />
    <Button class="possible-moviment" style="grid-area: mov2" label="Colégio Objetivo" text rounded raised />
    <Button class="possible-moviment" style="grid-area: mov3" label="Baixa 9 de Julho" text rounded raised />
    <Button class="possible-moviment" style="grid-area: mov4" label="Alta Paulista" text rounded raised />
  </div>
</template>

<style scoped>
.player-moviments {
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: 5% 40% 5% 40%;
  grid-template-rows: 25% 20% 20%;
  grid-template-areas:
    "current current current current"
    ". mov1 . mov2"
    ". mov3 . mov4";
  grid-gap: 8px;
}
.p-button.current-position {
  color: var(--primary-50);
  background: rgba(191, 77, 77, 0.26);
  grid-area: current;
}
.p-button.possible-moviment {
  /* margin-left: 55px; */
  color: var(--primary-50);
  background: rgba(179, 132, 132, 0.26);
}
</style>
