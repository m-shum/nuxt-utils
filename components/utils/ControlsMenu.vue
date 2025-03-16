<script setup lang="ts">
type TProps = { open: boolean }
const props = withDefaults(defineProps<TProps>(), { open: false })

const bem = useBem('menu')
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

const fontFamilyOptions = computed(() => {
  if (styles.value?.fontFamilies) {
    return Object.keys(styles.value.fontFamilies)?.map((family) => ({
      label: `${family}`,
      value: `${family}`,
    }))
  } else return []
})

const fontWeightOptions = computed(() => {
  if (styles.value.fontFamily && styles.value.fontFamilies) {
    const variant = styles.value.fontFamilies[styles.value.fontFamily] as
      | TFontFamily[]
      | undefined
    return variant
      ?.map(({ weight }: TFontFamily) => Number(weight))
      .sort((a, b) => a - b)
      .map((weight) => ({
        label: `${weight}`,
        value: `${weight}`,
      }))
  } else return []
})

watch(
  () => styles.value.fontFamily,
  () => {
    const variant = styles.value.fontFamilies?.[styles.value.fontFamily] as
      | TFontFamily[]
      | undefined

    if (variant) {
      styles.value.bodyWeight = variant[0].weight as string
      styles.value.headingsWeight = variant[0].weight as string
    }
  }
)
</script>
<template>
  <div
    id="controls-menu"
    v-if="styles"
    ref="menu"
    class="menu opaque fixed"
    :class="{ open: props.open }"
  >
    <div
      ref="content"
      :class="bem('content')"
      class="flex flex-col flex-gap-base"
    >
      <div>
        <menu
          aria-labelledby="menu-layout-heading"
          class="controls-content__menu flex flex-col"
        >
          <div class="flex justify-between">
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
                >grid overlay</ElementsInputCheckbox
              >
            </li>
          </div>
          <li>
            <ElementsInputNumber
              id="base-grid-cols"
              v-model="styles.gridCols"
              name="grid columns"
              >grid columns</ElementsInputNumber
            >
          </li>
          <li>
            <ElementsInputNumber
              id="base-text-cols"
              v-model="styles.textColWidth"
              name="text column width"
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
              name="font family"
              v-model="styles.fontFamily"
            >
              <template #label>font family</template>
              <template #optLabel="{ option }">
                <span>{{ option.label }}</span>
              </template>
            </ElementsInputSelect>
          </li>
          <li>
            <ElementsInputSelect
              :options="fontWeightOptions || []"
              type="text"
              :readonly="true"
              placeholder="Enter value"
              id="heading-weight"
              name="headings weight"
              v-model="styles.headingsWeight"
            >
              <template #label>headings weight</template>
              <template #optLabel="{ option }">
                <span>{{ option.label }}</span>
              </template>
            </ElementsInputSelect>
          </li>
          <li>
            <ElementsInputSelect
              :options="fontWeightOptions || []"
              type="text"
              :readonly="true"
              placeholder="Enter value"
              id="body-copy-weight"
              name="body copy weight"
              v-model="styles.bodyWeight"
            >
              <template #label>body copy weight</template>
              <template #optLabel="{ option }">
                <span>{{ option.label }}</span>
              </template>
            </ElementsInputSelect>
          </li>
          <li>
            <ElementsInputNumber
              id="min-font-size"
              name="min base font size"
              v-model="styles.minBaseFontSize"
              >min base font size</ElementsInputNumber
            >
          </li>
          <li>
            <ElementsInputNumber
              id="max-font-size"
              name="max base font size"
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
              name="type scale"
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
              name="line height"
              v-model="styles.lineHeightBase"
              :step="0.1"
              >line height</ElementsInputNumber
            >
          </li>
          <li>
            <ElementsInputNumber
              id="letter-spacing"
              name="letter spacing"
              v-model="styles.letterSpacing"
              :step="0.01"
              >letter spacing</ElementsInputNumber
            >
          </li>
        </menu>
      </div>
    </div>
  </div>
</template>
<style lang="scss">
.menu {
  border-radius: 20px;
  box-shadow: 0 0 0 1px var(--controls-border-color) inset;
  opacity: 0;
  overflow: hidden;
  padding: 0 8px;
  right: 20px;
  top: 68px;
  transition: opacity 0.25s ease;
  width: 333px;
  z-index: 100;

  &.open {
    opacity: 1;
  }

  &__content {
    font-size: 1rem;
    font-weight: 500;
    max-height: calc(100svh - 88px);
    overflow-y: scroll;
    padding: 1.25rem 0.75rem;
    width: 100%;

    menu {
      gap: 0.25rem;

      .opt-label {
        span {
          &:first-of-type {
            font-weight: 600;
          }
        }
      }
    }
  }
}
</style>
