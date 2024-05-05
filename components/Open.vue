<script setup lang="ts">
import type { Placement } from '@floating-ui/vue'
import OpenNext from './Open:Next.vue'
import OpenFloat from './Open:Float.vue'
import OpenModal from './Open:Modal.vue'
import OpenFull from './Open:Full.vue'

export type Target = 'next' | 'float' | 'modal' | 'full'
export interface Props {
  label?: string
  width?: number
  target?: Target
  mobile?: Target
  header?: boolean
  parent?: HTMLElement
  placement?: Placement
}
const props = withDefaults(defineProps<Props>(), {
  target: 'next',
  placement: 'bottom-end',
})
defineSlots<{
  default: () => any
  target: (props: {
    close: () => void
  }) => any
}>()
const component = computed(() => {
  const target = props.mobile ?? props.target
  if (target === 'next')
    return OpenNext
  if (target === 'float')
    return OpenFloat
  if (target === 'modal')
    return OpenModal
  if (target === 'full')
    return OpenFull
  return OpenNext
})
const selected = defineModel<boolean>({ default: false })
const target = ref()
function open() {
  target.value?.open(props)
}
function close() {
  target.value?.close()
}
defineExpose({ open, close })
</script>

<template>
  <Component
    :is="component"
    ref="target"
    v-model="selected"
    v-bind="$props"
  >
    <slot />
  </Component>
</template>
