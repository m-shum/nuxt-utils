<script setup lang="ts">
const styles = useState<TStyles>('styles')

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
const fontFamilyOptions = computed(() =>
  styles.value?.fontFamilies?.map((family) => {
    console.log(family)
    return {
      label: `${family}`,
      value: `${family}`,
    }
  })
)

const defaultFontFamily = computed(() => {
  styles.value?.fontFamily
})
</script>
<template>
  <div v-if="styles" class="controls-content flex flex-col flex-gap-base">
    <div>
      <menu
        aria-labelledby="menu-layout-heading"
        class="controls-content__menu"
      >
        <li>
          <ElementsInputCheckbox
            type="checkbox"
            id="dark-mode"
            v-model="styles.isDark"
            >dark mode</ElementsInputCheckbox
          >
        </li>
        <li>
          <ElementsInputCheckbox
            type="checkbox"
            id="toggle-overlay"
            v-model="styles.showOverlay"
            >show overlay</ElementsInputCheckbox
          >
        </li>
        <li>
          <ElementsInputNumber id="base-grid-cols" v-model="styles.gridCols"
            >grid columns</ElementsInputNumber
          >
        </li>
        <li>
          <ElementsInputNumber id="base-text-cols" v-model="styles.textColWidth"
            >text column width (ch)</ElementsInputNumber
          >
        </li>
        <li>
          <ElementsInputSelect
            :options="fontFamilyOptions || []"
            type="text"
            :readonly="true"
            placeholder="Enter value"
            id="font-family"
            v-model="styles.fontFamily"
          >
            <template #label>font family</template>
            <template #optLabel="{ option }">
              <span>{{ option.label }}</span>
            </template>
          </ElementsInputSelect>
        </li>
        <li>
          <ElementsInputNumber
            id="min-font-size"
            v-model="styles.minBaseFontSize"
            >min base font size</ElementsInputNumber
          >
        </li>
        <li>
          <ElementsInputNumber
            id="max-font-size"
            v-model="styles.maxBaseFontSize"
            >max base font size</ElementsInputNumber
          >
        </li>
        <li>
          <ElementsInputSelect
            :options="typeScaleOptions"
            type="number"
            placeholder="Enter value"
            id="type-scale"
            v-model="styles.typeScale"
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
          <ElementsInputNumber
            id="line-height"
            v-model="styles.lineHeightBase"
            :step="0.1"
            >line height</ElementsInputNumber
          >
        </li>
        <!-- <li>
          <ElementsInputCheckbox type="checkbox" id="baseline-align"
            >align to baseline</ElementsInputCheckbox
          >
        </li> -->
      </menu>
    </div>
  </div>
</template>
<style lang="scss">
.controls-content {
  font-size: 1rem;
  font-weight: 500;
  padding: 1.25rem 0.75rem;
  width: 100%;

  label {
    font-size: 0.85rem;
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
