<script setup lang="ts">
useBreakpoints()
useStyles()
</script>
<template>
  <UtilsGrid />
  <UtilsControls />
  <main class="container">
    <SampleCopy />
  </main>
</template>
<style lang="scss">
.test {
  color: red;

  /* background: black; */
  display: flex;
  gap: var(--gutter);

  @include use-mq('min-xl') {
    color: black;
  }
}
</style>
