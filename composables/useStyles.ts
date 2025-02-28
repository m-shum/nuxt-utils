type TStyles = {
  gridCols: number
  isDark: boolean
  showOverlay: boolean
  textCols: number
  lineHeight: number
  typeScale: number
  baseFontSize: number
  alignToBaseline: boolean
}

type TVars = Record<string, number>

const defaults: TStyles = {
  gridCols: 1,
  isDark: false,
  showOverlay: true,
  textCols: 1,
  lineHeight: 1.4,
  typeScale: 1.25,
  baseFontSize: 16,
  alignToBaseline: false,
}

const setFontSizes = () => {}
const setLineHeight = () => {}
const setGridValues = () => {}
const setDarkMode = () => {}

const getVars = (computedStyle: CSSStyleDeclaration) => {
  const textBaseMin = computedStyle.getPropertyValue('--text-base-min')
  const textBaseMax = computedStyle.getPropertyValue('--text-base-max')
  const lineHeight = computedStyle.getPropertyValue('--line-height')
  const fluidTypeStart = computedStyle.getPropertyValue('--fluid-type-start')
  const fluidTypeStop = computedStyle.getPropertyValue('--fluid-type-stop')

  const vars = {
    textBaseMin,
    textBaseMax,
    lineHeight,
    fluidTypeStart,
    fluidTypeStop,
  }

  return Object.entries(vars).reduce<Record<string, number>>(
    (obj, [key, val]) => {
      const unit = val.replace(/\d+/gm, '')
      let value = Number(val.replace(/\D+/gm, ''))
      if (unit === 'rem') value = value * 16 // turn everything into pixel values
      obj[key] = value

      return obj
    },
    {}
  )
}

const getFontSize = (value: number, magnitude: number, vars: TVars) => {
  const styles = useState<TStyles>('styles')
  const { textBaseMin, textBaseMax, fluidTypeStart, fluidTypeStop } = vars

  let minFontSize = textBaseMin
  let maxFontSize = textBaseMax

  for (let i = 1; i < magnitude; i++) {
    if (value === -1) {
      minFontSize = minFontSize / styles.value.typeScale
      maxFontSize = maxFontSize / styles.value.typeScale
    }
    if (value > 1) {
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

const generateFontSizes = (vars: TVars) => {
  const styles = useState<TStyles>('styles')
  const variations = 6 // where 0 is the base
  const fontsizes = Array(variations)
    .fill(null)
    .reduce((obj, variation) => {
      obj[`--text-${variation}`] = getFontSize(variation, variation, vars)
    }, {})
  fontsizes['--text-small'] = getFontSize(-1, 1, vars)
}
export const useStyles = () => {
  const computedStyle = window.getComputedStyle(document.documentElement)
  const vars = getVars(computedStyle)
  const styles = useState('styles', () => defaults)
}
