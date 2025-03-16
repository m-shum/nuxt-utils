export const useIsClickInsideTarget = (
  el: Ref<HTMLElement | null>,
  cb: () => void
) => {
  const handleDocumentClick = (e: any) => {
    const clickedInside = el.value?.contains(e.target)

    if (!clickedInside) cb()
  }
  onMounted(() => {
    document.addEventListener('click', handleDocumentClick)
  })
}
