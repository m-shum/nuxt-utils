<script setup lang="ts">
const typeScaleOptions = [
  { label: 'Perfect Third', value: 1.2 },
  { label: 'Perfect Third', value: 1.2 },
  { label: 'Perfect Third', value: 1.2 },
  { label: 'Perfect Third', value: 1.2 },
  { label: 'Perfect Third', value: 1.2 },
  { label: 'Perfect Third', value: 1.2 },
]
</script>
<template>
  <div class="controls-content flex flex-col flex-gap-base">
    <div>
      <h2 id="menu-layout-heading">Layout</h2>
      <menu
        aria-labelledby="menu-layout-heading"
        class="controls-content__menu"
      >
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
      </menu>
    </div>
    <div>
      <h2 id="menu-typography-heading">Typography</h2>
      <menu
        aria-labelledby="menu-typography-heading"
        class="controls-content__menu"
      >
        <li>
          <ElementsInputSelect :options="typeScaleOptions" id="type-scale"
            >type scale</ElementsInputSelect
          >
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
  }
}
</style>
