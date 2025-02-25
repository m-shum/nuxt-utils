<script setup lang="ts">
useBreakpoints()
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
