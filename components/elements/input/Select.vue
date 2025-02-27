<script setup lang="ts">
type TOption = {
  label: string
  value: any
}
type TProps = {
  id: string
  options: TOption[] | []
  placeholder?: string
}
const props = defineProps<TProps>()

const model = defineModel<number>()

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
  console.log('e', e.key)
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

const handleFocus = () => {
  toggleInputFocus(true)
  isDropdownOpen.value = true
}

const handleDocumentClick = (e: any) => {
  if (!isDropdownOpen.value) return
  const clickedInside = $inputContainer.value?.contains(e.target)
  if (!clickedInside) hideDropdown()
}

onMounted(() => {
  document.addEventListener('click', handleDocumentClick)
})
</script>
<template>
  <div ref="inputContainer">
    <ElementsInput :id type="select" class="autocomplete">
      <template #label><slot name="label" /></template>
      <template #input="{ toggleFocus }">
        <div @keydown="handleKeydown">
          <input
            autocapitalize="none"
            autocomplete="off"
            aria-autocomplete="list"
            role="combobox"
            aria-owns="listbox"
            aria-haspopup="listbox"
            ref="input"
            :id
            :name="id"
            v-model="model"
            :placeholder
            type="number"
            class="autocomplete__input"
            @focus="toggleFocus(true)"
            @blur="toggleFocus(false)"
            @click="showDropdown"
          />
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
        </div>
      </template>
      <template #controls>
        <button
          @click="toggleDropdown"
          :aria-expanded="isDropdownOpen"
          aria-controls="listbox"
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
      </template>
    </ElementsInput>
  </div>
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

        &:focus {
          outline: none;
        }
      }
    }
  }

  &__controls {
    border-bottom: none !important;
    border-bottom-right-radius: inherit;
    border-left: 1px solid var(--outline-color);
    border-top-right-radius: inherit;
    display: flex;
    flex: 1;
    outline: none;
    width: 16px;

    &:first-of-type {
      border-bottom: 1px solid var(--outline-color);
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
