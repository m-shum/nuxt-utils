<script setup lang="ts"></script>
<template>
  <div class="controls-content">
    <div>
      <h2 id="menu-layout-heading">Layout</h2>
      <menu aria-labelledby="menu-layout-heading">
        <li>
          <label for="base-grid-cols">
            <input type="number" id="base-grid-cols" name="base-grid-cols" />
            grid columns
          </label>
        </li>
        <li>
          <label for="base-text-cols">
            <input type="number" id="base-text-cols" name="base-text-cols" />
            text columns
          </label>
        </li>
      </menu>
    </div>
    <div>
      <h2 id="menu-typography-heading">Typography</h2>
      <menu aria-labelledby="menu-typography-heading">
        <li>
          <label for="type-scale">
            <input type="number" id="type-scale" name="type-scale" />
            type scale
          </label>
        </li>
        <li>
          <label for="line-height">
            <input type="number" id="line-height" name="line-height" />
            line height
          </label>
        </li>
        <li>
          <label for="baline-align">
            <input type="checkbox" id="baline-align" name="baline-align" />
            align to baseline
          </label>
        </li>
      </menu>
    </div>
  </div>
</template>
<style lang="scss">
.controls-content {
  padding: var(--base-line-height);
  width: 100%;
}
</style>
