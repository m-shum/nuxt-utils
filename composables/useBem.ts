/*

USAGE

bem('element') -> `baseClass__element`
bem('element', 'modifier') -> `baseClass__element baseClass__element--modifier`
bem('element', ['modifier1', 'modifier2']) -> `baseClass__element baseClass__element--modifier1 baseClass__element--modifier2`
bem('element', 'modifier' && booleanCondition) -> if condition = true: `baseClass__element baseClass__element--modifier` else `baseClass__element`
bem('element', ['modifier1' && booleanCondition, 'modifier2']) -> if condition = true: `baseClass__element baseClass__element--modifier1 baseClass__element--modifier2` else `baseClass__element baseClass__element--modifier2`
.... so on
*/

type TMod = boolean | undefined | null | string

type TArgs = [string, TMod | TMod[]] | [string]

export const useBem = (base: string) => {
  const mkCl = (...args: TArgs) => {
    const [el, mod] = args

    const cl = `${base}__${el}`

    if (!mod) return cl
    if (isNonEmptyString(mod)) return `${cl} ${cl}--${mod}`

    return (mod as TMod[]).reduce((acc: string, mod: TMod) => {
      if (isNonEmptyString(mod)) {
        acc = `${acc} ${acc}--${mod}`
      }
      return acc
    }, cl)
  }

  return mkCl
}
