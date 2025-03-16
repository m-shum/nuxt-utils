<script setup lang="ts">
import { gsap } from 'gsap'

const bem = useBem('nav')

const $nav = useTemplateRef('navEl')
const $container = useTemplateRef('containerEl')
const { width } = useElementSize($container)

const showNav = defineModel('showNav')
const showControls = defineModel('showControls')

watch(showNav, (newVal) => {
  newVal ? tween.value.in() : tween.value.out()
})

const buttons = computed(() =>
  $container.value ? <HTMLElement[]>Array.from($container.value.children) : null
)

const handleButtonClick = (e: Event) => {
  const btn = e.currentTarget as HTMLButtonElement

  if (
    btn.getAttribute('aria-controls') !== 'controls-menu' &&
    showControls.value
  ) {
    showControls.value = false
  }
}
const addButtonListeners = () => {
  if (!isNonEmptyArray(buttons.value)) return
  buttons.value!.forEach((button) => {
    button.addEventListener('click', handleButtonClick)
  })
}
onMounted(() => {
  addButtonListeners()
})

const isHidden = ref(true)
const tween = computed(() => {
  const duration = 0.75
  const ease = 'power2.inOut'
  const staggerDuration = duration * 0.75
  const tweenIn = () => {
    isHidden.value = false
    gsap
      .timeline()
      .to($nav.value, {
        width: `${width.value + 49}px`,
        duration,
        ease,
      })
      .fromTo(
        '.nav__container button',
        { opacity: 0 },
        {
          opacity: 1,
          duration: staggerDuration,
          ease,
          stagger: { from: 'end', amount: 0.15 },
        },
        '>-0.5'
      )
  }
  const tweenOut = () => {
    gsap
      .timeline()
      .fromTo(
        '.nav__container button',
        { opacity: 1 },
        {
          opacity: 0,
          duration: staggerDuration,
          ease,
          stagger: { from: 'start', amount: 0.25 },
        }
      )
      .to(
        $nav.value,
        {
          width: '44px',
          duration,
          ease,
        },
        '>-0.6'
      )
      .then(() => {
        isHidden.value = true
      })
  }

  return { in: tweenIn, out: tweenOut }
})
</script>
<template>
  <nav class="nav flex overflow-hidden justify-end opaque" ref="navEl">
    <div
      ref="containerEl"
      :aria-hidden="!showNav"
      :class="[isHidden ? bem('container', 'hidden') : bem('container')]"
      class="flex items-center justify-center"
    >
      <button><span>Layout</span></button>
      <button><span>Styles</span></button>
      <button
        aria-controls="controls-menu"
        @click="showControls = !showControls"
      >
        <span>Controls</span>
      </button>
    </div>
    <button :class="bem('trigger')" @click="showNav = !showNav">
      <IconsGear />
    </button>
  </nav>
</template>
<style lang="scss">
.nav {
  border: var(--controls-border);
  font-weight: 500 !important;
  gap: 4px;
  padding: 2px;
  width: 44px;
  @include rounded;

  &__trigger {
    .gear {
      height: 22px;
      width: 22px;
    }

    &:hover .gear {
      opacity: 1;
      transform: rotate(180deg);
    }
  }

  button {
    border-radius: inherit;
    padding: 0.5rem;
    transition: background 0.25s ease;

    &:focus,
    &:hover {
      background: rgba(var(--text-color), var(--base-opacity));
    }
  }

  &__container {
    border-radius: inherit;
    gap: 4px;

    button {
      height: 100%;
      padding: 0.5rem 1.35rem;

      span {
        display: inline-block;
        margin-bottom: 1px;
      }
    }

    &--hidden {
      left: -9999em;
      pointer-events: none;
      position: absolute;
      visibility: hidden;
    }
  }

  &:hover {
    @include rounded;
  }
}
</style>
