<script setup lang="ts"></script>
<template>
  <UtilsGrid />
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
