<script setup lang="ts">
const props = withDefaults(defineProps<{
  width?: string | number
  label?: string
  noHeader?: boolean
  close?: () => void
}>(), {
  width: 320,
})
const widthNumber = useToNumber(props.width)
const freeWidth = ref(widthNumber.value)
const rootWidth = ref(widthNumber.value)

const root = ref()
const target = ref()
const buttons = ref()
const mobile = computed(() => {
  return rootWidth.value < 640
})
const { close, hasParent, isParentMobile } = defineLayout({ target, mobile, buttons, close: props.close })

useResizeObserver(root, (entries) => {
  const entry = entries[0]
  rootWidth.value = entry.contentRect.width
  freeWidth.value = entry.contentRect.width - widthNumber.value
})

const styleRoot = computed(() => {
  if (mobile.value)
    return { width: '100%' }
  return { width: `${props.width}px` }
})
const closeIcon = computed(() => {
  if (props.close)
    return 'close'
  if (isParentMobile.value)
    return 'back'
  return 'close'
})
</script>

<template>
  <div
    ref="root"
    class="layout absolute h-full w-full flex justify-center overflow-hidden transition-none"
    color="back embeded:default"
    min-w-250px
    embeded:relative embeded:h-auto embeded:w-auto
    :class="{ mobile }"
  >
    <div class="left" h-full flex flex-col :style="styleRoot">
      <header v-if="!noHeader" class="group header h-14 flex items-center gap-2 p-2 desktop:h-14">
        <button v-if="hasParent" w-10 rounded opacity-50 hover="opacity-90" @click="close">
          <Icon :name="closeIcon" />
        </button>
        <div v-else w-2 />
        <div flex-1 truncate pr-3 text-base>
          {{ label }}
        </div>
        <div ref="buttons" h-10 flex flex-nowrap items-center pr-1 />
      </header>
      <main
        class="relative flex-1 overflow-x-hidden overflow-y-auto pb-6 pl-3 pr-2 embeded:px-0 embeded:pb-2 embeded:first:pt-2"
        embeded:scrollbar-gutter-auto
        scrollbar="~ rounded w-4px gutter-stable"
        dark:scrollbar="track-color-dark-900 thumb-color-neutral-700/50"
        light:scrollbar="track-color-light-900 thumb-color-neutral-400/50"
      >
        <slot />
      </main>
    </div>
    <div ref="target" class="next" />
  </div>
</template>

<style scoped>
.layout > .next {
  --uno: relative flex-1;
}
.layout > .left {
  --uno: transition-transform-300;
}
.embeded .layout > .left {
  --uno: transition-transform-200;
}
.mobile:has(> .next > .layout.v-leave-active) {
  > .left {
    position: relative;
  }
}
.mobile:has(> .next > .layout:not(.v-leave-active)) {
  > .left {
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
.mobile > .next > .layout {
  --uno: translate-x--100% transition-300;
}
.embeded .mobile > .next > .layout {
  --uno: translate-x--100% transition-200;
}
</style>
