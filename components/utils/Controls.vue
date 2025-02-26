<script setup lang="ts">
const isDevMode = import.meta.dev

const showControls = ref(false)
const toggleControls = () => {
  if (!isDevMode) return
  showControls.value = !showControls.value
}
</script>
<template>
  <aside class="controls background shadow position transition">
    <div
      class="controls__inner"
      :class="{ 'controls__inner--open': showControls }"
    >
      <button class="controls__toggle" @click="toggleControls">
        <svg
          width="58"
          height="58"
          viewBox="0 0 58 58"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M50.57 22.789C50.0817 21.1093 49.4372 19.5429 48.6559 18.1249C48.527 17.8866 48.527 17.6014 48.6598 17.3631L52.0348 11.3904L46.5934 5.96853L40.6442 9.34743C40.4059 9.48415 40.113 9.48415 39.8786 9.35134C38.4724 8.56228 36.8981 7.91384 35.1989 7.41384C34.9411 7.33571 34.738 7.13259 34.6637 6.87087L32.8434 0.257568H25.1598L23.3317 6.87087C23.2575 7.13259 23.0544 7.33962 22.7966 7.41384C21.0818 7.90993 19.5114 8.55834 18.1208 9.34744C17.8825 9.48416 17.5895 9.48416 17.3512 9.34744L11.4059 5.96854L5.96455 11.3904L9.34345 17.3631C9.47626 17.5975 9.47626 17.8866 9.34735 18.1249C8.53094 19.6015 7.88645 21.1679 7.43325 22.7772C7.35904 23.0389 7.152 23.2459 6.89028 23.3201L0.280884 25.1482V32.8318L6.89418 34.6756C7.1559 34.7498 7.36293 34.953 7.43715 35.2147C7.89027 36.828 8.53485 38.3905 9.35125 39.8709C9.48406 40.1092 9.48016 40.3982 9.34735 40.6365L5.96845 46.6053L11.4137 52.0272L17.359 48.6483C17.5973 48.5155 17.8864 48.5116 18.1247 48.6444C19.5935 49.4569 21.1677 50.1092 22.8083 50.5858C23.07 50.66 23.2692 50.8671 23.3434 51.1288L25.1676 57.7382H32.8512L34.6715 51.1288C34.7418 50.8671 34.945 50.6639 35.2028 50.5858C36.8239 50.1092 38.402 49.4569 39.8942 48.6444C40.1325 48.5155 40.4176 48.5194 40.6559 48.6522L46.6051 52.0311L52.0465 46.6092L48.6715 40.6404C48.5387 40.406 48.5348 40.117 48.6676 39.8787C49.4488 38.4607 50.0934 36.8943 50.5817 35.2146C50.6559 34.9568 50.8629 34.7537 51.1208 34.6794L57.7341 32.8356L57.7262 25.1481L51.1168 23.3239C50.8512 23.2497 50.6481 23.0507 50.57 22.789ZM29 44.441C20.4844 44.441 13.555 37.5152 13.555 29C13.555 20.4883 20.4847 13.559 29 13.559C37.5117 13.559 44.441 20.4848 44.441 29C44.441 37.5117 37.5113 44.441 29 44.441Z"
            fill="black"
          />
        </svg>
      </button>
      <UtilsControlsMenu />
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

.controls {
  --button-text: var(--text-color);
  --button-base-bg: rgb(38 38 39 / 10%);

  &.background {
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
  }

  &.shadow {
    box-shadow:
      0 1px 1px var(--shadow),
      0 2px 2px var(--shadow-secondary),
      0 4px 4px var(--shadow),
      0 8px 8px var(--shadow-secondary),
      0 16px 16px var(--shadow);
  }

  &.position {
    position: fixed;
    right: var(--base-margin);
    top: var(--base-margin);
  }

  &.transition {
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
  }

  border-radius: 10px;
  padding: 1px;
  z-index: 100;

  &:hover {
    --button-inner-bg: var(--bg-color);
    --bg-gradient-1: rgb(255 104 227 / 75.3%);
    --bg-gradient-2: rgb(252 209 64);
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

  &__inner {
    --padding: 8px;
    --button-size: 20px;
    --min-size: calc(var(--padding) * 2 + var(--button-size));

    background: var(--button-inner-bg);
    border-radius: 9px;
    color: var(--text-color);
    height: var(--min-size);
    padding: var(--padding);
    position: relative;
    transition:
      width 0.25s ease,
      height 0.25s ease;
    width: var(--min-size);

    &--open {
      height: 500px;
      width: 250px;
    }
  }

  &__toggle {
    border-radius: 100px;
    position: absolute;
    right: var(--padding);
    top: var(--padding);

    svg {
      height: var(--button-size);
      width: var(--button-size);
    }
  }
}
</style>
