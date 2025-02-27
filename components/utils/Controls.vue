<script setup lang="ts">
const isDevMode = import.meta.dev

const showControls = ref(false)
const toggleControls = () => {
  if (!isDevMode) return
  showControls.value = !showControls.value
}
</script>
<template>
  <button class="controls-toggle shadow background" @click="toggleControls">
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
  <aside class="controls shadow" :class="{ 'controls--open': showControls }">
    <div class="controls__inner">
      <UtilsControlsMenu class="menu" :inert="!showControls" />
    </div>
  </aside>
</template>
<style lang="scss">
@property --shadow {
  inherits: false;
  initial-value: hsl(0deg 0% 0% / 2.5%);
  syntax: '<color>';
}
@property --shadow-secondary {
  inherits: false;
  initial-value: hsl(0deg 0% 0% / 2.5%);
  syntax: '<color>';
}
@property --button-inner-bg {
  inherits: true;
  initial-value: rgb(249 245 248);
  syntax: '<color>';
}
@property --bg-gradient-1 {
  inherits: false;
  initial-value: rgb(0 200 255 / 0%);
  syntax: '<color>';
}
@property --bg-gradient-2 {
  inherits: false;
  initial-value: rgb(175 113 255 / 0%);
  syntax: '<color>';
}
@property --bg-scale {
  inherits: false;
  initial-value: 35%;
  syntax: '<percentage>';
}
@property --bg-pos-1 {
  inherits: false;
  initial-value: 52% 0%;
  syntax: '<percentage>+';
}
@property --bg-pos-2 {
  inherits: false;
  initial-value: 55% 100%;
  syntax: '<percentage>+';
}
@property --bg-pos-3 {
  inherits: false;
  initial-value: 46% 0%;
  syntax: '<percentage>+';
}
@property --bg-pos-4 {
  inherits: false;
  initial-value: 45% 100%;
  syntax: '<percentage>+';
}

:root {
  --button-text: var(--text-color);
  --button-base-bg: rgb(38 38 39 / 10%);
  --padding: 8px;
  --button-size: 20px;
  --min-size: calc(var(--padding) * 2 + var(--button-size));
}

.background {
  background: var(--button-base-bg);
  background-image:
    radial-gradient(
      var(--bg-scale) var(--bg-scale) at var(--bg-pos-1),
      var(--bg-gradient-1) 1%,
      #0000 36%
    ),
    radial-gradient(
      var(--bg-scale) var(--bg-scale) at var(--bg-pos-2),
      var(--bg-gradient-1) 1%,
      #0000 36%
    ),
    radial-gradient(
      var(--bg-scale) var(--bg-scale) at var(--bg-pos-3),
      var(--bg-gradient-2) 0%,
      #0000 62%
    ),
    radial-gradient(
      var(--bg-scale) var(--bg-scale) at var(--bg-pos-4),
      var(--bg-gradient-2) 0%,
      #0000 61%
    );
  background-position:
    0 0,
    0 0;
  background-size: 100% 100%;

  &:hover,
  &:active,
  &:focus {
    --bg-gradient-1: rgb(255 104 227 / 75.3%);
    --bg-gradient-2: rgb(252 209 64);
    --bg-scale: 55%;
    --bg-pos-1: 12% 0%;
    --bg-pos-2: 85% 100%;
    --bg-pos-3: 22% 0%;
    --bg-pos-4: 75% 100%;
  }
}

.shadow {
  box-shadow:
    0 1px 1px var(--shadow),
    0 2px 2px var(--shadow-secondary),
    0 4px 4px var(--shadow),
    0 8px 8px var(--shadow-secondary),
    0 16px 16px var(--shadow);

  &:hover,
  &:active,
  &:focus {
    --shadow: hsl(316deg 100% 16% / 9%);
    --shadow-secondary: hsl(39deg 100% 30% / 7.5%);
  }
}

.controls-toggle {
  border-radius: 10px;
  cursor: pointer;
  display: block;
  padding: 1px;
  position: fixed;
  right: var(--base-margin);
  top: var(--base-margin);
  transition:
    --button-inner-bg 0.15s,
    --shadow 0.35s,
    --shadow 0.55s,
    --bg-gradient-1 0.55s,
    --bg-gradient-2 0.55s,
    --bg-pos-1 0.25s,
    --bg-pos-2 0.35s,
    --bg-pos-3 0.25s,
    --bg-pos-4 0.35s,
    --bg-scale 0.25s;
  z-index: 100;

  &__inner {
    background: var(--button-inner-bg);
    border-radius: 10px;
    padding: 5px;
    transition: --button-inner-bg 0.15s;
  }

  svg {
    height: var(--button-size);
    opacity: 0.6;
    transition: opacity 0.25s ease;
    width: var(--button-size);
  }

  &:hover,
  &:active,
  &:focus {
    --button-inner-bg: var(--bg-color);

    outline: none;

    svg {
      opacity: 1;
    }
  }
}

.controls {
  background: hsl(316deg 100% 16% / 12%);
  border-radius: 10px;
  opacity: 0;
  padding: 1px;
  position: fixed;
  right: var(--base-margin);
  top: calc(var(--base-margin) + 35px);
  transition: opacity 0.25s ease;
  transition:
    --shadow 0.35s,
    --shadow 0.55s;
  z-index: 100;

  &__inner {
    background: var(--bg-color);
    border-radius: 9px;
    color: var(--text-color);
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
