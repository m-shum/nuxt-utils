<script setup lang="ts">
type TProps = {
  id: string
  type?: 'text' | 'number' | 'checkbox' | 'select'
  maxVal?: number
}
withDefaults(defineProps<TProps>(), {
  type: 'text',
})

const isFocused = ref(false)
const toggleFocus = (value: boolean) => {
  isFocused.value = value
}
</script>
<template>
  <label
    :for="id"
    class="input"
    :class="[isFocused && 'input--focus', `input--${type}`]"
  >
    <span class="input__label"><slot name="label" /></span>
    <div
      class="input__input-container"
      :class="[
        type !== 'checkbox' && 'flex justify-between',
        `input__input-container--${type}`,
      ]"
    >
      <slot name="input" :toggle-focus="toggleFocus" />
      <div v-if="$slots.controls" class="input__controls-container">
        <slot name="controls" />
      </div>
    </div>
  </label>
</template>
<style lang="scss">
@property --outline-color {
  inherits: false;
  initial-value: hsl(320deg 5% 88%);
  syntax: '<color>';
}
@property --input-color {
  inherits: false;
  initial-value: hsl(0deg 8% 97%);
  syntax: '<color>';
}
@property --input-color-focused {
  inherits: false;
  initial-value: hsl(312deg 9% 90%);
  syntax: '<color>';
}

@property --shadow-color {
  inherits: false;
  initial-value: 286deg 6% 65%;
  syntax: '<angle> <percentage> <percentage>';
}

@property --shadow-opacity {
  inherits: false;
  initial-value: 10%;
  syntax: '<percentage>';
}

.input {
  --shadow-color: 286deg 6% 65%;
  --shadow-opacity: 10%;
  --input-margin: 5px 0 #{get-font-size(-1)};
  --input-border-radius: 5px;

  &--checkbox {
    align-items: center;
    display: flex;
    flex-direction: row-reverse;
    gap: 5px;
    justify-content: start;
    margin: var(--input-margin);
  }

  &--focus * {
    --outline-color: hsl(315deg 11% 78%);
    --shadow-opacity: 20%;
  }

  &__input-container {
    --input-shadow:
      0px 0.3px 0.3px hsl(var(--shadow-color) / var(--shadow-opacity)),
      0px 0.6px 0.6px -0.7px hsl(var(--shadow-color) / var(--shadow-opacity)),
      0px 1.3px 1.4px -1.4px hsl(var(--shadow-color) / var(--shadow-opacity)),
      0px 2.6px 2.8px -2.1px hsl(var(--shadow-color) / var(--shadow-opacity)),
      0.1px 5.2px 5.6px -2.8px hsl(var(--shadow-color) / var(--shadow-opacity));

    background: var(--input-color);
    border-radius: var(--input-border-radius);
    box-shadow: var(--input-shadow);
    margin: var(--input-margin);
    outline: 1px solid var(--outline-color);

    input,
    select {
      padding: calc(#{get-font-size(-1) / 2});
      width: 100%;

      &:focus {
        outline: none;
      }
    }

    &--checkbox {
      display: inline-block;
      margin: 0;
      width: auto;
      /* stylelint-disable-next-line */
      input {
        padding: 0;
      }
    }

    &--select {
      position: relative;
    }
  }

  &__controls-container {
    align-items: stretch;
    border-bottom-right-radius: var(--input-border-radius);
    border-left: var(--outline-color);
    border-top-right-radius: var(--input-border-radius);
    display: flex;
    flex-shrink: 0;
    overflow: hidden;

    button {
      transition: background 0.25s ease;

      &:hover,
      &:active,
      &:focus {
        background: var(--input-color-focused);
      }
    }
  }
}
</style>
