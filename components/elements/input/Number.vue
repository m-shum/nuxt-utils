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
  <ElementsInput :id type="number">
    <template #label><slot /></template>
    <template #input="{ toggleFocus }">
      <input
        v-model="model"
        class="input-number"
        :id
        type="number"
        :name="id"
        @focus="toggleFocus(true)"
        @blur="toggleFocus(false)"
    /></template>
    <template #controls>
      <div class="input-number-controls flex">
        <button @click="incrementCount(1)"><span>+</span></button>
        <button @click="incrementCount(-1)"><span>-</span></button>
      </div>
    </template>
  </ElementsInput>
</template>
<style lang="scss">
.input-number {
  padding: calc(#{get-font-size(-1) / 2});
  width: 100%;

  &::-webkit-inner-spin-button,
  &::-webkit-outer-spin-button {
    appearance: none;
    margin: 0;
  }
}

.input-number-controls {
  border-left: 1px solid var(--outline-color);

  button {
    aspect-ratio: 1;
    flex: 1;
    flex-shrink: 0;
    height: 100%;
    outline: none;
    padding-right: 2px;

    /* width: 16px; */

    /* &:first-of-type {
      border-bottom: 1px solid var(--outline-color);
    } */

    span {
      line-height: 1;
    }
  }
}
</style>
