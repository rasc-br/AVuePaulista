<template>
  <q-card class="room bg-deep-orange-3 status">
    <q-list>
      <div v-for="(entry, index) in logs" :key="index">
        <q-item clickable>
          <q-item-section>
            <q-item-label>{{ entry }}</q-item-label>
          </q-item-section>
        </q-item>
      </div>
    </q-list>
  </q-card>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({
  name: "Status",
})
export default class Status extends Vue {
  get logs(): number {
    return this.$store.state.status.log;
  }
}
</script>
<style lang="scss" scoped>
.status {
  border: 1px solid black;
  height: 100%;
  width: 100%;
  margin: 20px;
  height: 150px;
  overflow: auto;
}
::-webkit-scrollbar {
  width: 6px;
}
::-webkit-scrollbar-track {
  background: #de0505;
}
::-webkit-scrollbar-thumb {
  background: #8a0303;
}
::-webkit-scrollbar-thumb:hover {
  background: #640202;
}
</style>
