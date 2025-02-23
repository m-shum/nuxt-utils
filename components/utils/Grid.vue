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
  gap: var(--grid-gutter);
  margin: 0 var(--base-margin);
  position: fixed;
  pointer-events: none;
  top: 0;
  left: 0;

  &__col {
    background: red;
    opacity: 0.03;
    height: 100svh;

    @include get-cols(1);
  }

  &__info {
    bottom: var(--base-margin);
    font-weight: 600;
    left: var(--base-margin);
    position: fixed;

    @include font-size(-1);
  }
}
</style>
