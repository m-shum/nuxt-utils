<script setup lang="ts">
useBreakpoints()
const currentTab = useState('currentTab', () => 'layout')
</script>
<template>
  <ClientOnly>
    <UtilsControls />
  </ClientOnly>
  <ModulesGrid />
  <main>
    <transition>
      <ModulesSampleCopy class="container" v-if="currentTab === 'layout'" />
    </transition>
    <transition>
      <ModulesStyles v-if="currentTab === 'styles'" />
    </transition>
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
