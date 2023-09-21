<template>
  <div class="text-field" :data-error="!!error">
    <label class="text-field__label" :for="localId" :hidden="!inputValue">
      <slot name="label">
        {{ error || placeholder }}
      </slot>
    </label>
    <input
      :id="localId"
      v-model="inputValue"
      :placeholder="placeholder"
      :type="type"
      autofocus
      v-bind="$attrs"
      class="text-field__input"
    >
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'
// @ts-ignore
import { cuid } from '~/utils/helpers'

export default Vue.extend({
  model: {
    prop: 'value',
    event: 'input'
  },
  props: {
    value: {
      type: String,
      required: true
    },
    id: {
      type: String as PropType<string | null>,
      default: cuid()
    },
    type: {
      type: String as PropType<'text' | 'password' | 'email'>,
      default: 'text'
    },
    placeholder: {
      type: String,
      default: ''
    },
    error: {
      type: String,
      default: ''
    }
  },
  data: () => ({
    localId: cuid()
  }),
  computed: {
    inputValue: {
      get () {
        return this.value
      },
      set (v: string) {
        this.$emit('input', v)
        !!this.error && this.$emit('clear-error')
      }
    }
  }
})
</script>

<style lang="scss">
.text-field {
  position: relative;
  max-width: 100%;
  display: flex;
  font-size: 1rem;
  border: thin solid $gray--light;
  transition: border 0.2s ease-out;
  border-radius: 5px;
  padding: 1px;
  &__input {
    padding: 14px;
    flex-grow: 1;
    border: none;
    outline: none;
    border-radius: inherit;
    font-size: inherit;
  }
  input:-webkit-autofill,
  input:-webkit-autofill:hover,
  input:-webkit-autofill:focus,
  input:-webkit-autofill:active {
    -webkit-text-fill-color: var($primary-text);
    -webkit-box-shadow: 0 0 0px 1000px white inset;
    transition: background-color 9999s ease-in-out 0s;
  }
  &__label {
    margin: 0 10px;
    max-width: calc(100% - 20px);
    position: absolute;
    top: -0.7em;
    background: white;
    display: block;
    float: left;
    padding: 0 3px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    color: $link;
    &[hidden] {
      display: none;
    }
  }
  &:hover {
    border: thin solid $primary-text;
  }
  &:focus-within {
    border: thin solid $link;
    box-shadow: 0 0 0 1px $link inset;
  }
  &[data-error="true"] {
    .text-field__label {
      color: $error;
      display: block;
    }
    border: thin solid $error;
    box-shadow: 0 0 0 1px $error inset;
  }
}
</style>
