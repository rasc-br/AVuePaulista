<template>
  <div class="q-pa-md moviments">
    <q-input
      readonly
      rounded
      standout
      class="current-position"
      label="Current Position:"
    >
      <template v-slot:prepend>
        <q-icon name="place" />
      </template>
    </q-input>
    <div class="options flex justify-around">
      <div v-for="place in placeOptions" :key="place">
        <q-btn align="between" rounded class="to-go-place">
          <q-icon class="explore" left size="2em" name="explore" />
          <div>{{ place }}</div>
        </q-btn>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({
  name: "Movements",
})
export default class Movements extends Vue {
  get placeOptions(): string[] {
    return [
      "Rua Augusta",
      "Alta Paulista",
      "Baixa Paulista",
      "Algum outro lugar",
    ];
  }
}
</script>

<style lang="scss" scoped>
::v-deep .q-field--standout.q-field--readonly .q-field__control::before {
  border: 1px solid rgba(0, 0, 0, 0.24);
}
.q-btn {
  text-transform: none;
}
.moviments {
  width: 100%;
}
.current-position {
  max-width: 600px;
  padding-bottom: 20px;
}
.to-go-place {
  background: rgba(0, 0, 0, 0.05);
  margin-bottom: 20px;
  // min-width: 250px;
}
.explore {
  color: rgba(0, 0, 0, 0.5);
}
.options {
  max-width: 600px;
}
</style>
