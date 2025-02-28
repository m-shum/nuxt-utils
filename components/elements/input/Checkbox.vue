<script setup lang="ts">
type TProps = {
  id: string
}
defineProps<TProps>()
const model = defineModel<boolean>()
</script>
<template>
  <ElementsInput :id type="checkbox">
    <template #label><slot /></template>
    <template #input="{ toggleFocus }">
      <input
        v-model="model"
        class="input-checkbox"
        :id
        type="checkbox"
        :name="id"
        @focus="toggleFocus(true)"
        @blur="toggleFocus(false)"
    /></template>
  </ElementsInput>
</template>
<style lang="scss">
.input-checkbox {
  appearance: none;
  display: grid;
  padding: 0;
  place-content: center;
  width: 100%;

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
</style>
