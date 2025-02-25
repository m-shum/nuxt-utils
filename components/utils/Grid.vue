<script setup lang="ts">
const isDevMode = import.meta.dev

const breakpoint = useState('breakpoint')
const gridCols = useState('gridCols')

const showGrid = ref(false)
const toggleGrid = () => {
  if (!isDevMode) return
  showGrid.value = !showGrid.value
  showGrid.value
    ? document.body.classList.add('dev-grid')
    : document.body.classList.remove('dev-grid')
}

onMounted(() => {
  toggleGrid()
})
</script>
<template>
  <div class="dev-ui" v-if="isDevMode">
    <ElementsRidiculousButton @click="toggleGrid"
      >Toggle Grid</ElementsRidiculousButton
    >

    <div v-show="showGrid">
      <span class="dev-ui__info">breakpoint – {{ breakpoint }}</span>
      <div class="flex dev-ui__grid">
        <div v-for="col in gridCols" class="dev-ui__grid__col" />
      </div>
    </div>
  </div>
</template>
<style lang="scss">
.dev-ui {
  height: 100svh;
  left: 0;
  position: fixed;
  top: 0;
  width: 100vw;
  z-index: 50;

  button {
    bottom: var(--base-margin);
    position: fixed;
    right: var(--base-margin);
    z-index: 100;
  }

  &__grid {
    gap: var(--grid-gutter);
    height: 100%;
    margin: 0 var(--base-margin);
    pointer-events: none;

    &__col {
      background: red;
      height: 100svh;
      opacity: 0.03;
      @include get-cols(1, width);
    }
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
