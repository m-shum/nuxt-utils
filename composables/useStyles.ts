const getVars = (computedStyle: CSSStyleDeclaration) => {
  const fontFamily = computedStyle.getPropertyValue('--font-family')
  const bodyWeight = computedStyle.getPropertyValue('--body-weight')
  const headingsWeight = computedStyle.getPropertyValue('--headings-weight')
  const textBaseMin = computedStyle.getPropertyValue('--text-base-min')
  const textBaseMax = computedStyle.getPropertyValue('--text-base-max')
  const textColWidth = computedStyle.getPropertyValue('--text-col-width')
  const lineHeightBase = computedStyle.getPropertyValue('--line-height-base')
  const letterSpacingBase = computedStyle.getPropertyValue('--letter-spacing')
  const fluidTypeStart = computedStyle.getPropertyValue('--fluid-type-start')
  const fluidTypeStop = computedStyle.getPropertyValue('--fluid-type-stop')
  const gridCols = computedStyle.getPropertyValue('--grid-cols')

  const vars = {
    fontFamily,
    bodyWeight,
    headingsWeight,
    textBaseMin,
    textBaseMax,
    textColWidth,
    lineHeightBase,
    letterSpacingBase,
    fluidTypeStart,
    fluidTypeStop,
    gridCols,
  }

  return Object.entries(vars).reduce<TVars | Record<string, string | number>>(
    (obj, [key, val]) => {
      if (key === 'fontFamily') {
        obj[key] = val
        return obj
      }
      const unit = val.replace(/[^a-z]+/gm, '')
      let value = Number(val.replace(/[a-z]+/gm, ''))
      if (unit === 'rem') value = value * 16 // turn everything into pixel values for font size calculations
      obj[key] = value

      return obj
    },
    {}
  )
}

const getLoadedFontsize = (value: number, magnitude: number, vars: TVars) => {
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
      getLoadedFontsize(variation, variation, vars)
    )
  })
  document.documentElement.style.setProperty(
    '--text-p',
    getLoadedFontsize(0, 0, vars)
  )
  document.documentElement.style.setProperty(
    '--text-small',
    getLoadedFontsize(-1, 1, vars)
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

const setLetterSpacing = () => {
  const styles = useState<TStyles>('styles')
  document.documentElement.style.setProperty(
    '--letter-spacing',
    `${styles.value.letterSpacing}ch`
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
  document.documentElement.style.setProperty(
    '--base-opacity',
    styles.value.isDark
      ? 'var(--base-opacity-dark)'
      : 'var(--base-opacity-light)'
  )
}

const getLoadedFonts = () => {
  const fonts = Array.from(document.fonts).map<TFontFamily>(
    ({ family, weight }) => ({
      family,
      weight,
    })
  )
  const fontFamilies = Object.groupBy(
    fonts,
    ({ family }: TFontFamily) => family
  ) as TFontFamilies
  return fontFamilies
}

const setFont = () => {
  const styles = useState<TStyles>('styles')
  document.documentElement.style.setProperty(
    '--font-family',
    styles.value.fontFamily
  )
}

const setBodyFontWeight = () => {
  const styles = useState<TStyles>('styles')
  document.documentElement.style.setProperty(
    '--body-weight',
    styles.value.bodyWeight
  )
}
const setHeadingsFontWeight = () => {
  const styles = useState<TStyles>('styles')
  document.documentElement.style.setProperty(
    '--headings-weight',
    styles.value.headingsWeight
  )
}

export const useStyles = () => {
  const vars = ref<TVars | null>(null)

  const styles = useState<TStyles>('styles', () => ({
    gridCols: 1,
    isDark: false,
    showOverlay: false,
    textCols: 1,
    textColWidth: 64,
    lineHeightBase: 1.4,
    letterSpacing: 0,
    typeScale: 1.25,
    minBaseFontSize: 16,
    maxBaseFontSize: 20,
    alignToBaseline: false,
    fontFamily: 'Arial, sans-serif',
    fontFamilies: null,
    headingsWeight: '400',
    bodyWeight: '400',
  }))

  onMounted(() => {
    const computedStyle = window.getComputedStyle(document.documentElement)
    vars.value = getVars(computedStyle) as TVars
    styles.value.minBaseFontSize = vars.value.textBaseMin as number
    styles.value.maxBaseFontSize = vars.value.textBaseMax as number
    styles.value.textColWidth = vars.value.textColWidth as number
    styles.value.lineHeightBase = vars.value.lineHeightBase as number
    styles.value.letterSpacing = vars.value.letterSpacingBase as number
    styles.value.gridCols = vars.value.gridCols as number
    styles.value.fontFamily = vars.value.fontFamily as string
    styles.value.fontFamilies = getLoadedFonts()
    styles.value.bodyWeight = vars.value.bodyWeight as string
    styles.value.headingsWeight = vars.value.headingsWeight as string

    setFontSizes(vars.value)
    setTextColWidth(vars.value)
  })

  watch(
    styles,
    () => {
      if (vars.value) {
        setFontSizes(vars.value)
        setTextColWidth(vars.value)
      }
      setLineHeightBase()
      setLetterSpacing()
      setGridCols()
      setDarkMode()
      setFont()
      setBodyFontWeight()
      setHeadingsFontWeight()
    },
    { deep: true }
  )
}
