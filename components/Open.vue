<script setup lang="ts">
import type { Placement } from '@floating-ui/vue'
import OpenNext from './Open:Next.vue'
import OpenFloat from './Open:Float.vue'
import OpenModal from './Open:Modal.vue'

type Target = 'next' | 'float' | 'modal'
const props = withDefaults(defineProps<{
  label?: string
  width?: string | number
  target?: Target
  mobile?: Target
  placement?: Placement
}>(), {
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
  return OpenNext
})
const target = ref()
const decorator = ref()
function open() {
  if (decorator.value.querySelector('.clickable') == null)
    return
  target.value?.open()
}
function close() {
  target.value?.close()
}
defineExpose({ open, close })
const selected = ref(false)
</script>

<template>
  <Component
    :is="component"
    v-if="decorator" ref="target"
    v-model="selected"
    :label
    :placement
    :decorator
  >
    <slot name="target" :close />
  </Component>
  <div
    ref="decorator"
    class="decorator"
    :class="{ selected }"
    @click="open"
  >
    <slot />
  </div>
</template>
