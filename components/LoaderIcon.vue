<template>
  <div class="loader-icon" :style="styles" />
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'LoaderIcon',
  props: {
    size: {
      type: Number,
      default: 30
    },
    width: {
      type: Number,
      default: 4
    }
  },
  computed: {
    styles (): string {
      return `
        --size: ${this.size}px;
        border: ${this.width}px solid currentColor;
        border-bottom-color: transparent;
      `
    }
  }
})
</script>

<style lang="scss">
.loader-icon {
  width: var(--size);
  aspect-ratio: 1/1;
  border-radius: 50%;
  display: inline-block;
  box-sizing: border-box;
  animation: rotation 1s linear infinite;
}

@keyframes rotation {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
