import debounce from 'lodash.debounce'

export const useBreakpoints = () => {
  const breakpoint = useState('breakpoint')
  const isTouchscreen = useState('isTouchscreen')
  const gridCols = useState('gridCols')

  const getBreakpoint = (computedStyle: CSSStyleDeclaration) => {
    const propertyValue = computedStyle.getPropertyValue('--breakpoint')
    breakpoint.value = propertyValue.trim().replace(/"/g, '')
  }
  function getHasTouch() {
    const hasTouch = window.matchMedia('(any-hover: none)').matches
    if (hasTouch !== isTouchscreen.value) isTouchscreen.value = hasTouch
  }
  function getGridCols(computedStyle: CSSStyleDeclaration) {
    gridCols.value = Number(computedStyle.getPropertyValue('--grid-cols'))
  }

  const getViewportProperties = () => {
    const computedStyle = window.getComputedStyle(document.documentElement)
    getBreakpoint(computedStyle)
    getHasTouch()
    getGridCols(computedStyle)
  }

  const handleResize = debounce(getViewportProperties, 30)

  const cleanUpObserver = ref<null | (() => void)>(null)
  onMounted(() => {
    getViewportProperties()
    cleanUpObserver.value = useEventListener(window, 'resize', handleResize)
  })
  onUnmounted(() => {
    if (cleanUpObserver.value) cleanUpObserver.value()
  })
}
