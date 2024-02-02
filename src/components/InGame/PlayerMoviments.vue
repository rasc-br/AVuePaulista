<script setup lang="ts">
import Button from "primevue/button";
import Arrow from "./AnimatedArrow.vue";
import { ref } from "vue";

const showArrow = ref([false, false, false, false]);
//TODO: Template in a loop with index (including grid-area and showarrow) and probably dynamic label on loop
</script>

<template>
  <div class="player-moviments">
    <Button class="current-position" label="Current Position: Colégio Objetivo" text rounded raised />
    <Arrow :class="['arrow', showArrow[0] ? 'show' : '']" style="grid-area: arrow1" />
    <Button
      class="possible-moviment"
      style="grid-area: mov1"
      label="Alta 9 de Julho"
      text
      rounded
      raised
      @mouseover="showArrow[0] = true"
      @mouseleave="showArrow[0] = false"
    />
    <Arrow :class="['arrow', showArrow[1] ? 'show' : '']" style="grid-area: arrow2" />
    <Button
      class="possible-moviment"
      style="grid-area: mov2"
      label="Colégio Objetivo"
      text
      rounded
      raised
      @mouseover="showArrow[1] = true"
      @mouseleave="showArrow[1] = false"
    />
    <Arrow :class="['arrow', showArrow[2] ? 'show' : '']" style="grid-area: arrow3" />
    <Button
      class="possible-moviment"
      style="grid-area: mov3"
      label="Baixa 9 de Julho"
      text
      rounded
      raised
      @mouseover="showArrow[2] = true"
      @mouseleave="showArrow[2] = false"
    />
    <Arrow :class="['arrow', showArrow[3] ? 'show' : '']" style="grid-area: arrow4" />
    <Button
      class="possible-moviment"
      style="grid-area: mov4"
      label="Alta Paulista"
      text
      rounded
      raised
      @mouseover="showArrow[3] = true"
      @mouseleave="showArrow[3] = false"
    />
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
    "arrow1 mov1 arrow2 mov2"
    "arrow3 mov3 arrow4 mov4";
  grid-gap: 8px;
}
.p-button.current-position {
  color: var(--primary-50);
  background: rgba(191, 77, 77, 0.26);
  grid-area: current;
  pointer-events: none;
}
.p-button.possible-moviment {
  color: var(--primary-50);
  background: rgba(179, 132, 132, 0.26);
}
.arrow {
  transition: all ease 1s;
  opacity: 0;
}
.arrow.show {
  opacity: 1;
}
</style>
