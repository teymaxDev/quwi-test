<template>
  <button
    v-ripple
    :class="[
      'btn',
      red && 'btn--red',
      sm && 'btn--sm',
      text && 'btn--text fancy-underline'
    ]"
    v-bind="$attrs"
    :disabled="disabled"
    @click="(e) => $emit('click', e)"
  >
    <LoaderIcon v-if="loading" v-bind="loaderProps" />
    <span
      v-else
      :class="[
        'btn__text',
        text && ''
      ]"
    >
      <slot>
        {{ label }}
      </slot>
    </span>
  </button>
</template>

<script lang="ts">
import Vue from 'vue'
import LoaderIcon from './LoaderIcon.vue'

export default Vue.extend({
  name: 'Btn',
  components: {
    LoaderIcon
  },
  inheritAttrs: false,
  props: {
    label: {
      type: String,
      default: ''
    },
    text: {
      type: Boolean,
      default: false
    },
    red: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    loading: {
      type: Boolean,
      default: false
    },
    sm: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    loaderProps (): { width: number; size: number } {
      return {
        width: this.text ? 2 : this.sm ? 3 : 4,
        size: this.text ? 20 : this.sm ? 22 : 30
      }
    }
  }
})
</script>

<style lang="scss">
.btn {
  background: $primary-btn;
  font-family: 'Open Sans', sans-serif;
  height: 52px;
  text-transform: none;
  text-shadow: none;
  font-size: 18px;
  border-radius: 9px;
  font-weight: 400;
  box-shadow: none;
  outline: none;
  border: none;
  cursor: pointer;
  transition: background 0.2s ease-out;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  &:hover {
    opacity: 0.9;
  }
  &--red {
    background: $primary;
    &:hover {
      background: #c44412c4;
    }
  }
  &--sm {
    height: 36px;
    font-size: 1rem;
    padding: 2px 10px;
    border-radius: 6px;
    min-width: 100px;
    font-size: 14px;
  }
  &--text {
    padding: 0px 2px;
    font-size: 1rem;
    height: auto;
    min-width: auto;
    background: transparent;
    color: $primary-text;
    line-height: 16px;
    &:hover {
      color: $link;
    }
    .btn__text {
      padding: 2px;
    }
  }
  a {
    text-decoration: none;
    color: inherit;
  }
  &:disabled {
    pointer-events: none;
    opacity: 0.7;
    cursor: not-allowed;
  }
}
</style>
