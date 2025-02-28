export type TStyles = {
  gridCols: number
  isDark: boolean
  showOverlay: boolean
  textCols: number
  textColWidth: number
  lineHeightBase: number
  typeScale: number
  fontFamily: string
  minBaseFontSize: number
  maxBaseFontSize: number
  alignToBaseline: boolean
  fontFamilies: null | string[]
}

export type TVars = {
  fontFamily: string
  textBaseMin: number
  textBaseMax: number
  textColWidth: number
  lineHeightBase: number
  fluidTypeStart: number
  fluidTypeStop: number
  gridCols: number
  [key: string]: string | number
}
