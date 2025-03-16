<script setup lang="ts">
type TProps = {
  id: string
  type?: 'text' | 'number' | 'checkbox' | 'select'
  maxVal?: number
}
withDefaults(defineProps<TProps>(), {
  type: 'text',
})

const styles = useState<TStyles>('styles')

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
    :style="{
      '--input-border-lightness': styles.isDark ? '24%' : '84%',
      '--input-border-lightness-focus': styles.isDark ? '43%' : '71%',
    }"
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
    </div>
  </label>
</template>
<style lang="scss">
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
  --input-margin: 5px 0 0.75rem;
  --input-border-radius: 5px;
  --input-border-color: hsl(0deg 0% var(--input-border-lightness));

  font-size: 0.85rem;

  &--checkbox {
    align-items: center;
    display: flex;
    flex-direction: row-reverse;
    gap: 5px;
    justify-content: start;
    margin: var(--input-margin);
  }

  &--focus * {
    --shadow-opacity: 30%;
    --input-border-color: hsl(0deg 0% var(--input-border-lightness-focus));
  }

  &__input-container {
    --input-shadow:
      0px 0.3px 0.3px hsl(var(--shadow-color) / var(--shadow-opacity)),
      0px 0.6px 0.6px -0.7px hsl(var(--shadow-color) / var(--shadow-opacity)),
      0px 1.3px 1.4px -1.4px hsl(var(--shadow-color) / var(--shadow-opacity)),
      0px 2.6px 2.8px -2.1px hsl(var(--shadow-color) / var(--shadow-opacity)),
      0.1px 5.2px 5.6px -2.8px hsl(var(--shadow-color) / var(--shadow-opacity));

    background: rbg(var(--bg-color));
    border-radius: var(--input-border-radius);
    box-shadow: var(--input-shadow);
    margin: var(--input-margin);
    outline: 1px solid var(--input-border-color);

    input,
    select {
      padding: calc(0.75rem / 2);
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

  button {
    transition: background 0.25s ease;

    &:hover,
    &:active,
    &:focus {
      background: rgba(var(--text-color), var(--base-opacity));
    }
  }
}
</style>
