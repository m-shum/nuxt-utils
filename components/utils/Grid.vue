<script setup lang="ts">
const isDevMode = import.meta.dev
const breakpoint = useState('breakpoint')
const gridCols = useState('gridCols')
</script>
<template>
  <div v-if="isDevMode" class="flex grid">
    <div class="grid__info">
      <span>breakpoint – {{ breakpoint }}</span>
    </div>
    <div v-for="col in gridCols" class="grid__col" />
  </div>
</template>
<style lang="scss">
.grid {
  background-image: linear-gradient(to bottom, #0ff 0, transparent 1px);
  background-repeat: repeat-y;
  background-size: 100% var(--base-line-height);
  gap: var(--grid-gutter);
  margin: 0 var(--base-margin);
  left: 0;
  position: fixed;
  pointer-events: none;
  top: 0;

  &__col {
    background: red;
    opacity: 0.03;
    height: 100svh;

    @include get-cols(1, width);
  }

  &__info {
    bottom: var(--base-margin);
    font-size: #{get-font-size(-1)};
    font-weight: 600;
    left: var(--base-margin);
    position: fixed;
  }
}
</style>
