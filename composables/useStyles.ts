const getVars = (computedStyle: CSSStyleDeclaration) => {
  const textBaseMin = computedStyle.getPropertyValue('--text-base-min')
  const textBaseMax = computedStyle.getPropertyValue('--text-base-max')
  const textColWidth = computedStyle.getPropertyValue('--text-col-width')
  const lineHeightBase = computedStyle.getPropertyValue('--line-height-base')
  const fluidTypeStart = computedStyle.getPropertyValue('--fluid-type-start')
  const fluidTypeStop = computedStyle.getPropertyValue('--fluid-type-stop')
  const gridCols = computedStyle.getPropertyValue('--grid-cols')

  const vars = {
    textBaseMin,
    textBaseMax,
    textColWidth,
    lineHeightBase,
    fluidTypeStart,
    fluidTypeStop,
    gridCols,
  }

  return Object.entries(vars).reduce<Record<string, number>>(
    (obj, [key, val]) => {
      const unit = val.replace(/[^a-z]+/gm, '')
      let value = Number(val.replace(/[a-z]+/gm, ''))
      if (unit === 'rem') value = value * 16 // turn everything into pixel values for font size calculations
      obj[key] = value

      return obj
    },
    {}
  )
}

const getFontSize = (value: number, magnitude: number, vars: TVars) => {
  const styles = useState<TStyles>('styles')
  const { minBaseFontSize, maxBaseFontSize } = styles.value
  const { fluidTypeStart, fluidTypeStop } = vars

  let minFontSize = minBaseFontSize
  let maxFontSize = maxBaseFontSize

  for (let i = 0; i < magnitude; i++) {
    if (value < 0) {
      minFontSize = minFontSize / styles.value.typeScale
      maxFontSize = maxFontSize / styles.value.typeScale
    } else {
      minFontSize = minFontSize * styles.value.typeScale
      maxFontSize = maxFontSize * styles.value.typeScale
    }
  }

  const relativeVw =
    100 * ((maxFontSize - minFontSize) / (fluidTypeStop - fluidTypeStart))

  const relativeFontSize =
    (fluidTypeStart * maxFontSize - fluidTypeStop * minFontSize) /
    (fluidTypeStart - fluidTypeStop)

  return `clamp(${minFontSize / 16}rem, ${relativeVw}vw + ${relativeFontSize / 16}rem, ${maxFontSize / 16}rem)`
}

const setFontSizes = (vars: TVars) => {
  const variations = 6 // where 0 is the base

  Array.from(Array(variations).keys()).forEach((variation) => {
    document.documentElement.style.setProperty(
      `--text-${variations - variation}`,
      getFontSize(variation, variation, vars)
    )
  })
  document.documentElement.style.setProperty(
    '--text-p',
    getFontSize(0, 0, vars)
  )
  document.documentElement.style.setProperty(
    '--text-small',
    getFontSize(-1, 1, vars)
  )
}

const setTextColWidth = (vars: TVars) => {
  const styles = useState<TStyles>('styles')
  document.documentElement.style.setProperty(
    '--text-col-width',
    `${styles.value.textColWidth}ch`
  )
}

const setLineHeightBase = () => {
  const styles = useState<TStyles>('styles')
  document.documentElement.style.setProperty(
    '--line-height-base',
    `${styles.value.lineHeightBase}`
  )
}

const setGridCols = () => {
  const styles = useState<TStyles>('styles')
  document.documentElement.style.setProperty(
    '--grid-cols',
    `${styles.value.gridCols}`
  )
}

const setDarkMode = () => {
  const styles = useState<TStyles>('styles')
  document.documentElement.style.setProperty(
    '--bg-color',
    styles.value.isDark ? 'var(--bg-color-dark)' : 'var(--bg-color-light)'
  )
  document.documentElement.style.setProperty(
    '--text-color',
    styles.value.isDark ? 'var(--text-color-dark)' : 'var(--text-color-light)'
  )
}

export const useStyles = () => {
  const vars = ref<TVars | null>(null)

  const styles = useState('styles', () => ({
    gridCols: 1,
    isDark: false,
    showOverlay: true,
    textCols: 1,
    textColWidth: 64,
    lineHeightBase: 1.4,
    typeScale: 1.25,
    minBaseFontSize: 16,
    maxBaseFontSize: 20,
    alignToBaseline: false,
  }))

  onMounted(() => {
    const computedStyle = window.getComputedStyle(document.documentElement)
    vars.value = getVars(computedStyle)

    styles.value.minBaseFontSize = vars.value.textBaseMin
    styles.value.maxBaseFontSize = vars.value.textBaseMax
    styles.value.textColWidth = vars.value.textColWidth
    styles.value.gridCols = vars.value.gridCols

    setFontSizes(vars.value)
    setTextColWidth(vars.value)
  })

  watch(
    styles,
    () => {
      if (vars.value) {
        setFontSizes(vars.value)
        setTextColWidth(vars.value)
        setLineHeightBase()
        setGridCols()
        setDarkMode()
      }
    },
    { deep: true }
  )
}
