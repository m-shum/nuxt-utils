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

const isDropdownOpen = ref(false)
const toggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value
}
const handleSelect = (value: any) => {
  model.value = value
}
</script>
<template>
  <ElementsInput :id type="select">
    <template #label><slot /></template>
    <template #input="{ toggleFocus }">
      <!-- <select
        v-model="model"
        class="input-select"
        :id
        type="select"
        :name="id"
        @focus="toggleFocus(true)"
        @blur="toggleFocus(false)"
      >
        <option v-for="option in options" :value="option.value">
          <span>{{ option.label }}</span>
        </option>
      </select> -->
      <input
        type="number"
        class="input-select"
        :value="search"
        :id
        :name="id"
        @focus="toggleFocus(true)"
        @blur="toggleFocus(false)"
        @click="toggleDropdown"
      />
      <div class="select-dropdown">
        <ul>
          <li v-for="option in options" @click="handleSelect(option.value)">
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
.input-select {
  padding: calc(#{get-font-size(-1) / 2});
  width: 100%;

  &::-webkit-inner-spin-button,
  &::-webkit-outer-spin-button {
    appearance: none;
    margin: 0;
  }
}

.select-dropdown {
  bottom: -2px;
  height: fit-content;
  position: absolute;
  transform: translateY(100%);
  width: 100%;
}
</style>
