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
    <button @click="toggleGrid">Toggle Grid</button>

    <div v-show="showGrid">
      <span class="dev-ui__info">breakpoint – {{ breakpoint }}</span>
      <div class="flex dev-ui__grid">
        <div v-for="col in gridCols" class="dev-ui__grid__col" />
      </div>
    </div>
  </div>
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

.dev-ui {
  height: 100svh;
  left: 0;
  position: fixed;
  top: 0;
  width: 100vw;

  button {
    --button-text: var(--text-color);
    --button-base-bg: rgb(38 38 39 / 10%);

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
    border-radius: 50px;
    bottom: var(--base-margin);
    box-shadow:
      0 1px 1px var(--shadow),
      0 2px 2px var(--shadow-secondary),
      0 4px 4px var(--shadow),
      0 8px 8px var(--shadow-secondary),
      0 16px 16px var(--shadow);
    color: var(--button-text);
    font-size: #{get-font-size(-1)};
    font-weight: 600;
    padding: 0.75rem var(--base-line-height);
    position: fixed;
    right: var(--base-margin);
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

    &:hover {
      --button-inner-bg: var(--bg-color);
      --bg-gradient-1: rgb(196 143 186 / 75.3%);
      --bg-gradient-2: rgb(189 182 160);
      --bg-scale: 55%;
      --bg-pos-1: 12% 0%;
      --bg-pos-2: 85% 100%;
      --bg-pos-3: 22% 0%;
      --bg-pos-4: 75% 100%;
      --shadow: hsl(316deg 100% 16% / 9%);
      --shadow-secondary: hsl(39deg 100% 30% / 7.5%);

      /* --shadow: hsl(316deg 100% 24% / 7%);
      --shadow-secondary: hsl(45deg 100% 33% / 6.5%); */
    }

    &::after {
      --inner-size: calc(100% - 2px);

      background: var(--button-inner-bg);
      border-radius: 50px;
      content: '';
      height: var(--inner-size);
      left: 1px;
      position: absolute;
      top: 1px;
      transition: all 0.25s ease;
      width: var(--inner-size);
      z-index: -1;
    }
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
