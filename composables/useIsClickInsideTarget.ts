export const useIsClickInsideTarget = (
  el: Ref<HTMLElement | null>,
  cb: () => void
) => {
  const handleDocumentClick = (e: any) => {
    const clickedInside = el.value?.contains(e.target)
    console.log('clicked inside', clickedInside)
    if (!clickedInside) cb()
  }
  onMounted(() => {
    document.addEventListener('click', handleDocumentClick)
  })
}
