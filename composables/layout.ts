import type { ComponentInternalInstance } from 'vue'

const defaultWidth = 340

interface DefineLayout {
  target: Ref
  buttons: Ref
  mobile: ComputedRef
  embeded: boolean
  emit: Function
}
interface LayoutState {
  target: Ref
  buttons: Ref
  parent: LayoutState | null
  mobile: ComputedRef
  next: Ref<null | {
    uid: number
    width: number
  }>
}

export function defineLayout({ target, mobile, embeded, buttons, emit }: DefineLayout) {
  const state = <LayoutState>({
    target,
    buttons,
    mobile,
    parent: inject<LayoutState | null>('pane:state', null),
    next: ref(),
  })
  provide('pane:state', state)
  function close() {
    if (embeded)
      emit('close')
    else if (state.parent)
      state.parent.next.value = null
  }
  const hasParent = computed(() => state.parent != null)
  const isParentMobile = computed(() => state.parent?.mobile.value)
  return {
    close,
    next: state.next,
    hasParent,
    isParentMobile,
  }
}

export function useCurrentLayout() {
  const state = inject<LayoutState>('pane:state') as LayoutState
  const instance = getCurrentInstance() as ComponentInternalInstance
  function open(width: number = defaultWidth) {
    state.next.value = {
      uid: instance.uid,
      width,
    }
  }
  function close() {
    state.next.value = null
  }
  const isOpened = computed(() => {
    return state.next.value?.uid === instance.uid
  })
  return {
    target: state.target,
    buttons: state.buttons,
    open,
    close,
    isOpened,
  }
}
