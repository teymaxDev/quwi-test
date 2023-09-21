<template>
  <div class="popup" :data-open="!!open" @click="clickOutside">
    <div class="dialog">
      <div class="dialog__header">
        <span class="header-text">
          <slot name="header" />
        </span>
        <Btn text sm @click="close">
          close
        </Btn>
      </div>
      <div class="dialog__body">
        <slot name="body" />
      </div>
      <div class="dialog__actions">
        <slot name="actions" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Btn from './Btn.vue'

export default Vue.extend({
  name: 'Dialog',
  components: {
    Btn
  },
  inheritAttrs: false,
  model: {
    prop: 'value',
    event: 'input'
  },
  props: {
    value: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    open: {
      get (): boolean {
        return this.value
      },
      set (v: boolean) {
        this.$emit('input', v)
      }
    }
  },
  methods: {
    clickOutside (e: Event): void {
      const isWrapper = (e.target as HTMLElement).classList.contains('popup')
      if (isWrapper) {
        this.open = false
      }
    },
    close () {
      this.open = false
    }
  }
})
</script>

<style lang="scss">
.popup {
  position: fixed;
  inset: 0;
  background: rgba(0 0 0 / 0.15);
  align-items: center;
  justify-content: center;
  z-index: 9999;
  display: none;
  animation: fade 0.2s ease-in-out;
  &[data-open="true"] {
    display: flex;
  }
  .dialog {
    width: 500px;
    padding: 24px;
    background: white;
    box-shadow: 0 0 15px 4px rgba(0, 0, 0, 0.2);
    border-radius: 6px;
    border: thin solid lightgray;
    display: flex;
    flex-direction: column;
    gap: 24px;
    animation: popup 0.2s ease-in-out;
    &__header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      .header-text {
        font-weight: 500;
      }
    }
    &__actions {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      gap: 24px;
    }
  }
  @keyframes fade {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @keyframes popup {
    from {
      opacity: 0;
      transform: scale(0)
    }
    to {
      opacity: 1;
      transform: scale(1)
    }
  }
}
</style>
