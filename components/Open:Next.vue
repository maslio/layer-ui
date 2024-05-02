<script setup lang="ts">
defineOptions({
  inheritAttrs: false,
})
const { label, width } = defineProps<{
  label?: string
  width?: number
}>()
const loading = ref(true)
const error = ref<Error | null>(null)
const { target, open, close, isOpened } = useCurrentLayout()
const selected = defineModel<boolean>()
syncRefs(isOpened, selected)
defineExpose({
  open() {
    error.value = null
    open(width)
  },
  close() {
    close()
  },
})
onErrorCaptured((e: Error) => {
  error.value = e
  loading.value = false
  console.error(e)
  return false
})
</script>

<template>
  <Teleport v-if="target" :to="target">
    <Transition
      enter-from-class="translate-x-0!"
      enter-active-class="mobile:transition-300"
      leave-active-class="mobile:transition-300 v-leave-active"
      leave-to-class="translate-x-0!"
    >
      <Layout
        v-if="isOpened" :width="width" :label
        class="mobile:translate-x--100%"
        @close="close"
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
