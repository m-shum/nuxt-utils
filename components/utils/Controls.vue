<script setup lang="ts">
useStyles()
const styles = useState<TStyles>('styles')

const bem = useBem('controls')

const showControls = ref(false)
const showNav = ref(false)

watch(showNav, (newVal) => {
  if (!newVal && showControls) showControls.value = false
})

const $root = useTemplateRef('root')
const hideMenu = () => {
  showNav.value = false
}
useIsClickInsideTarget($root, hideMenu)
</script>
<template>
  <aside
    ref="root"
    class="controls fixed"
    :style="{
      '--controls-text-color': styles.isDark
        ? 'hsl(0deg 0% 74%)'
        : 'hsl(0deg 0% 34%)',
      '--controls-border-color': styles.isDark
        ? 'hsl(0deg 0% 44%)'
        : 'hsl(0deg 0% 64%)',
    }"
  >
    <Nav v-model:showNav="showNav" v-model:showControls="showControls" />
    <UtilsControlsMenu ref="menu" :inert="!showControls" :open="showControls" />
  </aside>
</template>
<style lang="scss">
.controls {
  --controls-border: 1px solid var(--controls-border-color);

  color: var(--controls-text-color);
  font-family: neue-haas-grotesk-display, sans-serif !important;
  right: 20px;
  top: 20px;
}
</style>
