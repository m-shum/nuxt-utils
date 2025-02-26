<script setup lang="ts">
type TOption = {
  label: string
  value: any
}
type TProps = {
  id: string
  options: TOption[] | []
}
const props = defineProps<TProps>()

const model = defineModel<number>()
const search = ref<string | null>(null)
const $list = useTemplateRef('list')

const isDropdownOpen = ref(false)
const toggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value
}
const handleSelect = (value: any) => {
  model.value = value
}
const handleKeydown = (e: any) => {
  console.log('e', e.key)
  if (e.key === 'ArrowDown') {
    e.preventDefault()
  }
}
</script>
<template>
  <ElementsInput :id type="select" class="autocomplete">
    <template #label><slot /></template>
    <template #input="{ toggleFocus }">
      <input
        autocapitalize="none"
        autocomplete="off"
        aria-autocomplete="list"
        role="combobox"
        aria-owns="listbox"
        :id
        :name="id"
        :value="search"
        type="number"
        class="autocomplete__input"
        @focus="toggleFocus(true)"
        @blur="toggleFocus(false)"
        @click="toggleDropdown"
        @keydown="handleKeydown"
      />
      <div v-show="isDropdownOpen" class="autocomplete__dropdown-container">
        <ul role="list" id="listbox" ref="list">
          <li
            role="option"
            tabindex="-1"
            v-for="option in options"
            @click="handleSelect(option.value)"
          >
            {{ option.label }}
          </li>
        </ul>
      </div>
    </template>
    <template #controls>
      <div class="input-select-controls flex flex-col"></div>
    </template>
  </ElementsInput>
</template>
<style lang="scss">
.autocomplete {
  &__input {
    padding: calc(#{get-font-size(-1) / 2});
    width: 100%;

    &::-webkit-inner-spin-button,
    &::-webkit-outer-spin-button {
      appearance: none;
      margin: 0;
    }
  }

  &__dropdown-container {
    background: var(--bg-color);
    border-radius: var(--input-border-radius);
    bottom: -3px;
    box-shadow: var(--input-shadow);
    height: fit-content;
    outline: 1px solid var(--outline-color);
    position: absolute;
    transform: translateY(100%);
    width: 100%;

    ul {
      li {
        padding: calc(#{get-font-size(-1) / 1.5});

        &:not(:last-of-type) {
          border-bottom: 1px solid hsl(320deg 5% 88%);
        }

        &:focus,
        &:hover {
          background: var(--input-color);
        }
      }

      &:focus {
        background: red;
      }
    }
  }
}
</style>
