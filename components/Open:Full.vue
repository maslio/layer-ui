<script setup lang="ts">
defineOptions({
  inheritAttrs: false,
})
defineProps<{
  label?: string
  width?: number
}>()
const selected = defineModel<boolean>()
const loading = ref(true)
const error = ref<Error | null>(null)
function close() {
  selected.value = false
}
function open() {
  error.value = null
  selected.value = true
}
defineExpose({ open, close })
const modal = ref()
onClickOutside(modal, (e) => {
  e.stopPropagation()
  close()
})
onErrorCaptured((e: Error) => {
  error.value = e
  loading.value = false
  console.error(e)
  return false
})
</script>

<template>
  <Teleport to="body">
    <Transition
      enter-from-class="bg-transparent children:translate-x-100px children:opacity-0"
      enter-active-class="transition-300 children:transition-200"
      leave-active-class="transition-300 children:transition-200"
      leave-to-class="bg-transparent children:translate-x-100px children:opacity-0"
    >
      <div
        v-if="selected"
        fixed left-0 top-0 h-full w-full flex items-center justify-center
        class="bg-dark-800/50 text-light"
      >
        <div
          ref="modal"
          overflow-hidden rounded-xl
          class="left-0 top-0 h-full w-full"
          dark="ring-dark-300"
          light="ring-neutral-200"
        >
          <Layout :label :width :no-header="!label" :close>
            <Open:Error v-if="error" :error @close="close" />
            <Suspense v-else @resolve="loading = false" @pending="loading = true">
              <slot />
              <template #fallback>
                <div class="h-100px flex items-center justify-center">
                  <IconCSS name="spinner" animate-spin />
                </div>
              </template>
            </Suspense>
          </Layout>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>
