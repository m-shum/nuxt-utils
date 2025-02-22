<script setup lang="ts">
useBreakpoints()
const breakpoint = useState('breakpoint')
const isTouchscreen = useState('isTouchscreen')
const gridCols = useState('gridCols')
</script>
<template>
  <div class="flex grid">
    <div class="grid__info">
      <span>breakpoint – {{ breakpoint }}</span>
    </div>
    <div v-for="(col, idx) in gridCols" :key="idx" class="grid__col"></div>
  </div>
</template>
<style lang="scss">
.grid {
  gap: var(--grid-gutter);
  margin: 0 var(--base-margin);
  position: fixed;
  pointer-events: none;
  top: 0;
  left: 0;

  &__col {
    background: red;
    opacity: 0.05;
    height: 100svh;

    @include get-cols(1);
  }

  &__info {
    position: fixed;
    bottom: var(--base-margin);
    left: var(--base-margin);
  }
}
</style>
