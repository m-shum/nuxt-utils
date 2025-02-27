<script setup lang="ts">
const typeScaleOptions = [
  { label: 'Minor Second', value: 1.067 },
  { label: 'Major Second', value: 1.125 },
  { label: 'Minor Third', value: 1.2 },
  { label: 'Major Third', value: 1.25 },
  { label: 'Perfect Fourth', value: 1.333 },
  { label: 'Augmented Fourth', value: 1.414 },
  { label: 'Perfect Fifth', value: 1.5 },
  { label: 'Golden Ratio', value: 1.618 },
]
</script>
<template>
  <div class="controls-content flex flex-col flex-gap-base">
    <div>
      <menu
        aria-labelledby="menu-layout-heading"
        class="controls-content__menu"
      >
        <li>
          <ElementsInputCheckbox type="checkbox" id="dark-mode"
            >dark mode</ElementsInputCheckbox
          >
        </li>
        <li>
          <ElementsInputCheckbox type="checkbox" id="toggle-overlay"
            >show overlay</ElementsInputCheckbox
          >
        </li>
        <li>
          <ElementsInputNumber id="base-grid-cols"
            >grid columns</ElementsInputNumber
          >
        </li>
        <li>
          <ElementsInputNumber id="base-text-cols"
            >text columns</ElementsInputNumber
          >
        </li>
        <li>
          <ElementsInputNumber id="font-size"
            >base font size</ElementsInputNumber
          >
        </li>
        <li>
          <ElementsInputSelect
            :options="typeScaleOptions"
            placeholder="Enter value"
            id="type-scale"
          >
            <template #label>type scale</template>
            <template #optLabel="{ option }">
              <div class="opt-label">
                <span>{{ option.value }}</span>
                <span>:&nbsp;</span>
                <span>{{ option.label }}</span>
              </div>
            </template>
          </ElementsInputSelect>
        </li>
        <li>
          <ElementsInputNumber id="line-height"
            >line height</ElementsInputNumber
          >
        </li>
        <li>
          <ElementsInputCheckbox type="checkbox" id="baseline-align"
            >align to baseline</ElementsInputCheckbox
          >
        </li>
      </menu>
    </div>
  </div>
</template>
<style lang="scss">
.controls-content {
  font-size: #{get-font-size(1)};
  font-weight: 500;
  padding: var(--base-line-height);
  width: 100%;

  label {
    font-size: #{get-font-size(-1)};
  }

  &__menu {
    display: flex;
    flex-direction: column;

    .opt-label {
      span {
        &:first-of-type {
          font-weight: 600;
        }
      }
    }
  }
}
</style>
