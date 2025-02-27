<script setup lang="ts">
type TProps = {
  id: string
  maxVal?: number
}
const props = defineProps<TProps>()

const model = defineModel<number>({ default: 0 })

const incrementCount = (value: number) => {
  if (value < 0 && model.value === 0) return
  if (value > 0 && model.value === props.maxVal) return
  if (value > 0) model.value++
  if (value < 0) model.value--
}
</script>
<template>
  <ElementsInput :id type="number" class="input-number">
    <template #label><slot /></template>
    <template #input="{ toggleFocus }">
      <input
        v-model="model"
        class="input-number__input"
        :id
        type="number"
        :name="id"
        @focus="toggleFocus(true)"
        @blur="toggleFocus(false)"
    /></template>
    <template #controls>
      <div class="input-number__controls flex flex-col">
        <button @click="incrementCount(1)"><span>+</span></button>
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

  &__controls {
    border-left: 1px solid var(--outline-color);

    button {
      flex: 1;
      outline: none;
      padding-right: 2px;
      width: 16px;

      &:first-of-type {
        border-bottom: 1px solid var(--outline-color);
      }

      span {
        line-height: 1;
      }
    }
  }
}
</style>
