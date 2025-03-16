<script setup lang="ts">
type TOption = {
  label: string
  value: any
}
type TProps = {
  id: string
  options: TOption[] | []
  placeholder?: string
  readonly?: boolean
  type: string
  name: string
}
const props = withDefaults(defineProps<TProps>(), { readonly: false })

const model = defineModel<number | string>()

const isDropdownOpen = ref(false)
const $list = useTemplateRef('list')
const $input = useTemplateRef('input')
const $inputContainer = useTemplateRef('inputContainer')

const toggleInputFocus = (val: boolean) => {
  if (!$input.value) return
  val ? $input.value.focus() : $input.value.blur()
}

const currentOptionIdx = ref<number | null>(null)

const handleArrowDown = () => {
  isDropdownOpen.value = true
  currentOptionIdx.value === null
    ? (currentOptionIdx.value = 0)
    : currentOptionIdx.value! < props.options.length - 1
      ? currentOptionIdx.value!++
      : (currentOptionIdx.value = 0)
}
const handleArrowUp = () => {
  if (isDropdownOpen.value) {
    currentOptionIdx.value =
      currentOptionIdx.value === 0
        ? props.options.length - 1
        : (currentOptionIdx.value! -= 1)
  }
}
const focusOption = () => {
  if (!$list.value || currentOptionIdx.value === null) return
  const optionEl = $list.value.children[currentOptionIdx.value] as HTMLElement
  optionEl.focus()
}

const setCurrentOptionIdx = (key: string) => {
  if (key === 'ArrowDown') handleArrowDown()
  if (key === 'ArrowUp') handleArrowUp()
  nextTick(() => {
    focusOption()
  })
}

const hideDropdown = () => {
  isDropdownOpen.value = false
  currentOptionIdx.value = null
  toggleInputFocus(false)
}

const showDropdown = () => {
  if (isDropdownOpen.value) return
  isDropdownOpen.value = true
}

const toggleDropdown = () => {
  isDropdownOpen.value ? hideDropdown() : showDropdown()
}

const handleKeydown = (e: any) => {
  const { key } = e

  const exitKeys = ['Tab', 'Escape']
  if (exitKeys.includes(key) && isDropdownOpen.value) hideDropdown()

  if (key === 'Enter') toggleDropdown()

  const actionKeys = ['ArrowDown', 'ArrowUp']
  if (actionKeys.includes(key)) {
    e.preventDefault()
    setCurrentOptionIdx(key)
  }
}

const handleSelect = (value: any) => {
  model.value = value
  isDropdownOpen.value = false
  toggleInputFocus(true)
}

useIsClickInsideTarget($inputContainer, hideDropdown)
</script>
<template>
  <div ref="inputContainer">
    <ElementsInput
      :id
      type="select"
      class="autocomplete"
      :class="{ 'input--focus': isDropdownOpen }"
    >
      <template #label><slot name="label" /></template>
      <template #input="{ toggleFocus }">
        <div class="flex w-full justify-between">
          <div @keydown="handleKeydown" :style="{ flex: '1' }">
            <input
              autocapitalize="none"
              autocomplete="off"
              aria-autocomplete="list"
              role="combobox"
              aria-owns="listbox"
              aria-haspopup="listbox"
              ref="input"
              :id
              :readonly
              :name="id"
              v-model="model"
              :placeholder
              :type
              class="autocomplete__input"
              @focus="toggleFocus(true)"
              @blur="toggleFocus(false)"
              @click="showDropdown"
            />
          </div>
          <div v-show="isDropdownOpen" class="autocomplete__dropdown-container">
            <ul role="list" id="listbox" ref="list">
              <li
                :aria-curent="idx === currentOptionIdx"
                v-for="(option, idx) in options"
                role="option"
                tabindex="-1"
                @click.prevent="handleSelect(option.value)"
                @keydown.enter.stop="handleSelect(option.value)"
              >
                <slot name="optLabel" :option />
              </li>
            </ul>
          </div>
          <button
            @click="toggleDropdown"
            :aria-expanded="isDropdownOpen"
            aria-controls="listbox"
            :title="
              isDropdownOpen ? `Hide ${name} options` : `Show ${name} options`
            "
            class="autocomplete__controls flex flex-col justify-center items-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="lucide lucide-chevron-up"
              aria-hidden="true"
            >
              <path d="m18 15-6-6-6 6"></path>
            </svg>
          </button>
        </div>
      </template>
    </ElementsInput>
  </div>
</template>
<style lang="scss">
.autocomplete {
  &__input {
    padding: calc(0.75rem / 2);
    width: 100%;

    &::-webkit-inner-spin-button,
    &::-webkit-outer-spin-button {
      appearance: none;
      margin: 0;
    }
  }

  &__dropdown-container {
    background: rgba(var(--bg-color), 1);
    border-radius: var(--input-border-radius);
    bottom: -3px;
    box-shadow: var(--input-shadow);
    height: fit-content;
    outline: 1px solid var(--input-border-color);
    position: absolute;
    transform: translateY(100%);
    width: 100%;
    z-index: 1;

    ul {
      li {
        padding: calc(0.75rem / 1.5);

        &:not(:last-of-type) {
          border-bottom: 1px solid
            hsla(0deg 0% var(--input-border-lightness) / 90%);
        }

        &:focus,
        &:hover {
          background: rgba(var(--text-color), var(--base-opacity));
        }

        &:focus {
          outline: none;
        }
      }
    }
  }

  button {
    aspect-ratio: 1;
    border-bottom-right-radius: var(--input-border-radius);
    border-top-right-radius: var(--input-border-radius);
    flex-shrink: 0;
    height: 100%;
    outline: none;
    padding-right: 2px;

    &:last-of-type {
      border-left: 1px solid var(--input-border-color);
    }

    svg {
      transform: rotate(180deg);
      transition: transform 0.25s ease;
    }

    &[aria-expanded='true'] {
      svg {
        transform: rotate(0deg);
      }
    }
  }
}
</style>
