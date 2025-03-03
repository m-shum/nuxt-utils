<script setup lang="ts">
type TProps = {
  id: string
  maxVal?: number
  step?: number
}
const props = withDefaults(defineProps<TProps>(), { step: 1 })

const model = defineModel<number>({ default: 0 })

const incrementCount = (value: number) => {
  if (value < 0 && model.value === 0) return
  if (value > 0 && model.value === props.maxVal) return
  if (value > 0) model.value = model.value + 1 * props.step
  if (value < 0) model.value = model.value - 1 * props.step
}
</script>
<template>
  <ElementsInput :id type="number" class="input-number">
    <template #label><slot /></template>
    <template #input="{ toggleFocus }">
      <div class="flex justify-between w-full">
        <button @click="incrementCount(1)"><span>+</span></button>
        <input
          v-model="model"
          class="input-number__input"
          :id
          :step
          type="number"
          :name="id"
          @focus="toggleFocus(true)"
          @blur="toggleFocus(false)"
        />
        <button @click="incrementCount(-1)"><span>-</span></button>
      </div>
    </template>
  </ElementsInput>
</template>
<style lang="scss">
.input-number {
  &__input {
    &::-webkit-inner-spin-button,
    &::-webkit-outer-spin-button {
      appearance: none;
      margin: 0;
    }
  }

  button {
    aspect-ratio: 1;
    flex-shrink: 0;
    height: 100%;
    outline: none;
    padding-right: 2px;

    &:first-of-type {
      border-bottom-left-radius: var(--input-border-radius);
      border-right: 1px solid var(--outline-color);
      border-top-left-radius: var(--input-border-radius);
    }

    &:last-of-type {
      border-bottom-right-radius: var(--input-border-radius);
      border-left: 1px solid var(--outline-color);
      border-top-right-radius: var(--input-border-radius);
    }

    span {
      line-height: 1;
    }
  }
}
</style>
