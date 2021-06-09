<template>
  <q-card class="room bg-deep-orange-3 status" ref="statusContainer">
    <q-list>
      <div v-for="(entry, index) in logs" :key="`${index}${entry}`">
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
  get statusContainer(): Element | undefined {
    return (this.$refs.statusContainer as Partial<Vue>).$el;
  }

  scrollToBottom(): void {
    this.$nextTick(() => {
      if (this.statusContainer)
        this.statusContainer.scrollTop = this.statusContainer.scrollHeight;
    });
  }

  updated(): void {
    this.scrollToBottom();
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
</style>
