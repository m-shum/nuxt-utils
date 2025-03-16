<script setup lang="ts">
const showGradient = ref(false)
const toggleGradient = () => (showGradient.value = !showGradient.value)
</script>
<template>
  <nav :class="{ gradient: showGradient }">
    <div class="flex nav-container">
      <button @mouseenter="toggleGradient" @mouseleave="toggleGradient">
        Layout
      </button>
      <button @mouseenter="toggleGradient" @mouseleave="toggleGradient">
        Variations
      </button>
    </div>
  </nav>
</template>
<style lang="scss">
nav {
  --shadow-color: 20deg 77% 32%;
  --shadow-color-2: 275deg 63% 23%;

  background: white;
  border-radius: 100px;
  box-shadow:
    0 1px 1px hsl(var(--shadow-color) / 7%),
    0 1px 2px 1px hsl(var(--shadow-color) / 10%),
    0 5px 4px -4px hsl(var(--shadow-color) / 7%),
    0 9px 8px -8px hsl(var(--shadow-color-2) / 7%),
    0 18px 18px -16px hsl(var(--shadow-color-2) / 15%);
  color: var(--controls-text-color);
  display: inline-block;
  left: 50%;
  padding: 2px;
  position: sticky;
  top: var(--base-margin);
  transform: translateX(-50%);
  transform-origin: center center;
  transition: scale 0.25s ease;

  &::before {
    background-image: radial-gradient(
      farthest-corner at 0 10px,
      hsl(20deg 100% 71% / 12%),
      hsl(275deg 100% 82% / 7%)
    );
    border-radius: 100px;
    box-shadow:
      0 5px 4px -4px hsl(var(--shadow-color) / 7%),
      0 11px 8px -10px hsl(var(--shadow-color-2) / 7%),
      0 20px 18px -18px hsl(var(--shadow-color-2) / 7%),
      0 25px 22px -25px hsl(var(--shadow-color-2) / 25%);
    color: var(--controls-text-color);
    content: '';
    height: 100%;
    left: 0;
    opacity: 0;
    pointer-events: none;
    position: absolute;
    top: 0;
    transition: opacity 0.25s ease;
    width: 100%;
    z-index: -1;
  }

  &.gradient {
    scale: 1.007;

    &::before {
      opacity: 1;
    }
  }

  .nav-container {
    border-radius: 100px;
    display: inline-flex;
    gap: var(--text-small);
  }

  button {
    border-radius: 100px;
    padding: 1rem 3rem;
    transition: background 0.25s ease;

    &:hover {
      background: white;
      box-shadow:
        0 1px 2px 1px hsl(var(--shadow-color) / 10%),
        0 5px 4px -4px hsl(var(--shadow-color) / 7%),
        0 9px 8px -8px hsl(var(--shadow-color-2) / 7%);
    }
  }
}

/* nav.gradient::before {
  opacity: 0.3;
} */
</style>
