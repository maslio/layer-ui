<script setup lang="ts">
import type { ComponentInternalInstance } from 'vue'
import type { LayoutProvide } from './Layout.vue'

defineOptions({
  inheritAttrs: false,
})
const { label, width, id } = defineProps<{
  label?: string
  width?: number
  id: string
}>()
const loading = ref(true)
const error = ref<Error | null>(null)
const { nextId, nextEl, isMini } = inject('layout') as LayoutProvide
const selected = defineModel<boolean>()
const isOpened = computed(() => {
  return nextId.value === id
})
syncRefs(isOpened, selected)
function open() {
  error.value = null
  nextId.value = id
}
function close() {
  nextId.value = null
}
defineExpose({ open, close })
onErrorCaptured((e: Error) => {
  error.value = e
  loading.value = false
  console.error(e)
  return false
})
</script>

<template>
  <Teleport v-if="nextEl" :to="nextEl">
    <Transition
      enter-from-class="translate-x-0!"
      enter-active-class="mobile:transition-300"
      leave-active-class="mobile:transition-250 v-leave-active"
      leave-to-class="translate-x-0!"
    >
      <Layout
        v-if="isOpened" :width="width" :label
        class="mobile:translate-x--100%"
        :close
        :close-icon="isMini ? 'back' : 'close'"
      >
        <Open:Error v-if="error" :error @close="close" />
        <Suspense v-else @resolve="loading = false" @pending="loading = true">
          <slot />
          <template #fallback>
            <Open:Loading />
          </template>
        </Suspense>
      </Layout>
    </Transition>
  </Teleport>
</template>
