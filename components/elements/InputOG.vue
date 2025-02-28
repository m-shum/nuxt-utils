<script setup lang="ts">
type TProps = {
  id: string
  type?: 'text' | 'number' | 'checkbox' | 'select'
  maxVal?: number
}
const props = withDefaults(defineProps<TProps>(), {
  type: 'text',
})

const isFocused = ref(false)

const model = defineModel<any>()
const setModelDefault = () => {
  switch (props.type) {
    case 'text':
      model.value = ''
      break
    case 'number':
      model.value = 0
      break
    case 'checkbox':
      model.value = false
      break
    default:
      model.value = ''
  }
}
setModelDefault()

const incrementCount = (value: number) => {
  if (value < 0 && model.value === 0) return
  if (value > 0 && model.value === props.maxVal) return
  if (value > 0) model.value++
  if (value < 0) model.value--
}
</script>
<template>
  <label
    :for="id"
    class="input"
    :class="{
      'input--focus': isFocused,
      'input--checkbox': type === 'checkbox',
    }"
  >
    <span class="input__label"><slot /></span>
    <div
      class="input__input-container"
      :class="{
        'flex justify-between': type !== 'checkbox',
        'input__input-container--checkbox inline-block w-auto':
          type === 'checkbox',
      }"
    >
      <input
        v-model="model"
        class="input__input"
        :type
        :id
        :name="id"
        @focus="isFocused = true"
        @blur="isFocused = false"
      />
      <div v-if="type === 'number'" class="input__input-controls flex flex-col">
        <button @click="incrementCount(1)"><span>+</span></button>
        <button @click="incrementCount(-1)"><span>-</span></button>
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
  /* --outline-color: hsl(315deg 3% 74%); */
  --shadow-color: 286deg 6% 65%;
  --shadow-opacity: 10%;
  --input-margin: 5px 0 0.75rem;
}

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
  border-radius: 5px;
  box-shadow: var(--input-shadow);
  margin: var(--input-margin);
  outline: 1px solid var(--outline-color);

  &--checkbox {
    margin: 0;
  }

  input {
    padding: 0.3825rem;
    width: 100%;

    &:focus {
      outline: none;
    }

    &[type='number']::-webkit-inner-spin-button,
    &[type='number']::-webkit-outer-spin-button {
      appearance: none;
      margin: 0;
    }

    &[type='checkbox'] {
      appearance: none;
      display: grid;
      padding: 0;
      place-content: center;

      &::before {
        --size: 0.75rem;

        background: none;
        border-radius: 100%;
        content: '';
        height: var(--size);
        scale: 0.35;
        transition: all 0.15s ease;
        width: var(--size);
      }

      &:checked::before {
        background: hsl(316deg 6% 34%);
        scale: 0.5;
      }
    }
  }
}

&__input-controls {
  border-left: 1px solid var(--outline-color);

  button {
    flex: 1;
    outline: none;
    width: 16px;

    &:first-of-type {
      border-bottom: 1px solid var(--outline-color);
    }

    &:hover {
      background: var(--input-color-focused);
    }

    span {
      line-height: 1;
    }
  }
}
</style>
