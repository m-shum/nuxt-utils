<script setup lang="ts">
const isDevMode = import.meta.dev

const showControls = ref(false)
const toggleControls = () => {
  if (!isDevMode) return
  showControls.value = !showControls.value
}

const $target = useTemplateRef('target')
const $button = useTemplateRef('button')

watch(showControls, (newVal) => {
  if (!newVal) $button.value?.blur()
})

const handleDocumentClick = (e: any) => {
  if (!showControls.value) return
  const clickedInside =
    $target.value?.contains(e.target) || $button.value?.contains(e.target)
  if (!clickedInside) showControls.value = false
}

onMounted(() => {
  document.addEventListener('click', handleDocumentClick)
})
</script>
<template>
  <button
    class="controls-toggle shadow background"
    @click="toggleControls"
    ref="button"
  >
    <div class="controls-toggle__inner">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="lucide lucide-settings h-4 w-4"
      >
        <path
          d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"
        ></path>
        <circle cx="12" cy="12" r="3"></circle>
      </svg>
    </div>
  </button>
  <aside
    class="controls shadow"
    :class="{ 'controls--open': showControls }"
    ref="target"
  >
    <div class="controls__inner">
      <UtilsControlsMenu class="menu" :inert="!showControls" />
    </div>
  </aside>
</template>
<style lang="scss">
:root {
  --button-text: var(--text-color);
  --button-base-bg: rgb(38 38 39 / 10%);
  --padding: 8px;
  --button-size: 20px;
  --min-size: calc(var(--padding) * 2 + var(--button-size));
  --shadow-color: 23deg 43% 45%;
  --shadow-color-2: 286deg 47% 29%;
  --controls-text-color: #412f45;
  --controls-bg-color: #fffcfa;
}

.controls-toggle {
  border: 1px solid hsl(300deg 6% 88%);
  border-radius: 10px;
  box-shadow:
    0 0.4px 0.5px hsl(var(--shadow-color-2) / 13%),
    0.1px 1.2px 1.4px -0.8px hsl(var(--shadow-color-2) / 14%),
    0.2px 1.7px 3.1px -1.5px hsl(var(--shadow-color-2) / 15%),
    0.4px 5.4px 7.4px -2.3px hsl(var(--shadow-color) / 20%);
  color: var(--controls-text-color);
  cursor: pointer;
  display: block;
  overflow: hidden;
  position: fixed;
  right: var(--base-margin);
  scale: 1;
  top: var(--base-margin);
  transition-duration: 0.25s;
  transition-property: box-shadow, border, scale;
  transition-timing-function: ease;
  z-index: 100;

  &__inner {
    background: var(--controls-bg-color);
    padding: 5px;
    transition: background 0.25s ease;
  }

  svg {
    height: var(--button-size);
    opacity: 0.6;
    transform: rotate(0deg);
    transition:
      opacity 0.25s ease,
      transform 0.35s ease-in-out;
    width: var(--button-size);
  }

  &:hover,
  &:focus {
    border: 1px solid hsl(300deg 9% 79%);
    box-shadow:
      0 0.4px 0.5px hsl(var(--shadow-color-2) / 10%),
      0.1px 1.6px 1.4px -0.8px hsl(var(--shadow-color-2) / 11%),
      0.2px 3.3px 4.1px -1.5px hsl(var(--shadow-color-2) / 12%),
      0.4px 8.8px 7.4px -2.3px hsl(var(--shadow-color) / 17%);
    outline: none;
    scale: 1.05;

    svg {
      opacity: 1;
      transform: rotate(180deg);
    }

    /* stylelint-disable-next-line */
    .controls-toggle__inner {
      background: var(--controls-bg-color);
    }
  }
}

.controls {
  background: hsl(316deg 100% 16% / 12%);
  border-radius: 10px;
  box-shadow:
    0 0.4px 0.5px hsl(var(--shadow-color-2) / 10%),
    0.1px 1.6px 1.4px -0.8px hsl(var(--shadow-color-2) / 11%),
    0.2px 3.3px 4.1px -1.5px hsl(var(--shadow-color-2) / 12%),
    0.4px 10.8px 7.4px -2.3px hsl(var(--shadow-color) / 15%);
  font-family: neue-haas-grotesk-display, sans-serif !important;
  opacity: 0;
  padding: 1px;
  position: fixed;
  right: var(--base-margin);
  top: calc(var(--base-margin) + 35px);
  transition: opacity 0.25s ease;
  z-index: 100;

  &__inner {
    background: var(--controls-bg-color);
    border-radius: 9px;
    color: var(--controls-text-color);
    padding: var(--padding);
    width: calc(250px + (var(--padding) * 2));

    .menu {
      opacity: 0;
      transition: none;
      visibility: hidden;
      width: 250px;
    }
  }

  .menu {
    opacity: 0;
    transition: none;
    visibility: hidden;
    width: 250px;
  }

  &--open {
    opacity: 1;

    .menu {
      opacity: 1;
      transition: opacity 0.25s;
      visibility: visible;
    }
  }
}
</style>
