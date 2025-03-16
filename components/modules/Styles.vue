<script setup lang="ts">
const styles = useState<TStyles>('styles')
const bem = useBem('styles')
</script>
<template>
  <div class="styles container">
    <dl :class="bem('scale')">
      <dt>Type scale:&nbsp;</dt>
      <dd>{{ styles.typeScale }}</dd>
    </dl>
    <div
      :class="bem('base-style')"
      v-for="el in ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'small']"
    >
      <component :is="el">Universal Declaration of Human Rights</component>
      <dl>
        <dt>Size:&nbsp;</dt>
        <dd>{{ el }}</dd>
        <dt>Line height:&nbsp;</dt>
        <dd>{{ styles.lineHeightBase }}</dd>
      </dl>
    </div>
  </div>
</template>
<style lang="scss">
.styles {
  margin-bottom: 8rem;
  margin-top: 8rem;

  dl {
    color: var(--controls-text-color);
    font-family: neue-haas-grotesk-display, sans-serif !important;
    font-weight: 500 !important;

    dd,
    dt {
      display: inline-block;
    }

    dd {
      margin-right: 3ch;
    }

    * {
      line-height: 1 !important;
    }
  }

  &__scale {
    font-size: var(--text-5);
    margin-bottom: var(--text-1);
  }

  &__base-style {
    margin-bottom: var(--text-3);

    dl {
      font-size: 0.85rem;
      margin-top: 0.5rem;
    }

    * {
      line-height: 1 !important;
    }
  }
}
</style>
