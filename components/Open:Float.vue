<script setup lang="ts">
import { type Placement, flip, offset, shift, useFloating } from '@floating-ui/vue'

defineOptions({
  inheritAttrs: false,
})
const { label, width = 250, placement, decorator } = defineProps<{
  label?: string
  width?: number
  header?: boolean
  placement: Placement
  decorator: HTMLElement
}>()

const _decorator = toRef(() => decorator)
const selected = defineModel<boolean>()
const loading = ref(true)
const error = ref<Error | null>(null)
const target = ref()
onClickOutside(target, (e) => {
  e.stopPropagation()
  close()
})
const { floatingStyles, update } = useFloating(_decorator, target, {
  placement,
  middleware: [offset(2), flip(), shift({ padding: 2 })],
})
function close() {
  selected.value = false
}
function open() {
  error.value = null
  selected.value = true
}
defineExpose({ open, close })
onErrorCaptured((e: Error) => {
  error.value = e
  loading.value = false
  console.error(e)
  setTimeout(update)
  return false
})
</script>

<template>
  <div
    v-if="selected"
    ref="target"
    :style="floatingStyles"
    class="embeded z-10 w-250px overflow-hidden rounded-xl ring-2"
    dark="ring-dark-300"
    light="ring-neutral-200"
  >
    <Layout :label :width embeded :no-header="!header" :close>
      <Open:Error v-if="error" :error @close="close" />
      <Suspense v-else @resolve="loading = false; update()" @pending="loading = true">
        <slot />
        <template #fallback>
          <div class="h-100px flex items-center justify-center">
            <IconCSS name="spinner" animate-spin />
          </div>
        </template>
      </Suspense>
    </Layout>
  </div>
</template>
