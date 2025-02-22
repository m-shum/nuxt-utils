<template>
  <div class="test">foo</div>
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
  /* @include get-cols(4); */

  &::after {
    background: gray;
    content: '';
    height: 100svh;

    @include get-cols(1);
  }
}
</style>
