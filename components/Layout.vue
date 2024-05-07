<script setup lang="ts">
const props = withDefaults(defineProps<{
  width?: string | number
  label?: string
  noHeader?: boolean
  close?: () => void
  closeIcon?: string
}>(), {
  width: 320,
})
const widthNumber = useToNumber(props.width)
const freeWidth = ref(widthNumber.value)
const rootWidth = ref(widthNumber.value)
const itemEl = ref() as Ref<HTMLElement>
const isMini = computed(() => {
  return rootWidth.value < 640
})

useResizeObserver(itemEl, (entries) => {
  const entry = entries[0]
  rootWidth.value = entry.contentRect.width
  freeWidth.value = entry.contentRect.width - widthNumber.value
})

const styleRoot = computed(() => {
  if (isMini.value)
    return { width: '100%' }
  return { width: `${props.width}px` }
})

const pageEl = ref() as Ref<HTMLElement>
const menuEl = ref() as Ref<HTMLElement>
const nextEl = ref() as Ref<HTMLElement>
const nextId = ref()
const bottomEl = ref() as Ref<HTMLElement>
const footerEl = ref() as Ref<HTMLElement>
const id = useId()

function close() {
  props.close?.()
}

provide<LayoutProvide>('layout', { isMini, pageEl, menuEl, nextEl, nextId, footerEl, bottomEl, close, id })
</script>

<template>
  <div
    :id
    ref="itemEl"
    class="layout absolute h-full w-full flex justify-center overflow-hidden"
    color="back dialog:default"

    dialog:relative dialog:h-auto dialog:w-auto min-w-200px
    :class="{ mobile: isMini }"
  >
    <div ref="pageEl" class="page relative" h-full flex flex-col :style="styleRoot">
      <header
        v-if="!noHeader"
        class="group header dialog:h-12 dialog:p-2 h-14 flex items-center gap-2 p-3"
      >
        <Button v-if="closeIcon" flat mini :icon="closeIcon" @click="close" />
        <div v-else w-1 />
        <div flex-1 truncate pr-3 text-base>
          {{ label }}
        </div>
        <div ref="menuEl" h-10 flex flex-nowrap items-center />
      </header>
      <main
        class="dialog:px-0 dialog:pb-0 dialog:first:pt-2 relative flex-1 overflow-x-hidden overflow-y-auto pb-3 pl-3 pr-2"
        dialog:scrollbar-gutter-auto
        scrollbar="~ rounded w-4px gutter-stable"
        dark:scrollbar="track-color-dark-900 thumb-color-neutral-700/50"
        light:scrollbar="track-color-light-900 thumb-color-neutral-400/50"
      >
        <slot />
        <div ref="bottomEl" dialog:px-0 dialog:pb-2 sticky bottom-0 />
      </main>
      <footer ref="footerEl" dialog:px-0 dialog:pb-2 px-3 />
    </div>
    <div ref="nextEl" class="next" />
  </div>
</template>

<style scoped>
.layout:has(+ .layout) {
  --uno: transition-transform-300;
}
.layout:has(+ .layout:not(.v-leave-active)) {
  transform: translateX(-150px);
}
.layout > .next {
  --uno: relative flex-1;
}
.layout > .page {
  --uno: transition-transform-300;
}
.dialog .layout > .page {
  --uno: transition-transform-200;
}
.mobile:has(> .next > .layout.v-leave-active) {
  > .page {
    position: relative;
  }
}
.mobile:has(> .next > .layout:not(.v-leave-active)) {
  > .page {
    position: absolute;
    transform: translateX(-50%);
    height: 100%;
    overflow: hidden;
  }
}
.mobile > .next {
  --uno: relative left-100% top-0 h-full w-full;
}
.mobile > .next:has(> .layout.v-leave-active) {
  --uno: absolute;
}
</style>
