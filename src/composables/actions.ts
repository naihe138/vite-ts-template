export function useActions<T = any>() {
  const isShowActions = ref(false)
  const currentItem = ref<T>()

  function handleOnMore(item: T) {
    currentItem.value = item
    isShowActions.value = true
  }

  return {
    isShowActions,
    currentItem,
    handleOnMore,
  }
}
