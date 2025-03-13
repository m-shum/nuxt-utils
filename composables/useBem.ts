/*
base: 'base'
basic class: 'base__el'
modifier: 'base__el base__el--modifier'
conditional modifier: 'base__el base__el--modifier'
multiple modifiers: 'base__el base__el--modifier1 base__el--modifier2'

const bem = useBem('base') --> output: fn bem()
basic class = bem('element') --> bem is fed 1 arg, the element
basic modifier = bem('element', 'modifier') --> output = 'base__element base__element--modifier'
multiple modifiers = bem('element', ['modifier1', modifier2']) --> output = 'base__element base__element--modifier1 base__element--modifier2'
conditional modifier = bem('element', 'modifier' && condition)
multipple conditional modifiers = bem('element', ['modifier1' && condition, 'modifier2' && condition])
*/

export const useBem = (base: string) => {
  const constructClasses = (...args: any) => {
    const [el, modifiers] = args

    const baseClass = `${base}__${el}`

    if (!modifiers) return baseClass
    if (isNonEmptyString(modifiers))
      return `${baseClass} ${baseClass}--${modifiers}`

    return modifiers.reduce(
      (className: string, modifier: string, idx: number) => {
        className = `${className} ${baseClass}--${modifier}`
        return className
      },
      baseClass
    )
  }

  return constructClasses
}
