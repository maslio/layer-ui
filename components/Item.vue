<script setup lang="ts">
import type { Placement } from '@floating-ui/vue'

const props = withDefaults(defineProps<{
  icon?: string
  label?: string
  caption?: string | number
  value?: string | number
  clickable?: boolean
  open?: 'next' | 'modal' | 'float' | 'full'
  href?: string
  noTruncate?: boolean
  openWidth?: string | number
  openLabel?: string
  openHeader?: boolean
  openPlacement?: Placement
}>(), {

})
const emit = defineEmits(['click'])
defineSlots<{
  default: (props: {
    close: () => void
  }) => any
  left: () => any
  main: () => any
  right: () => any
}>()

const id = (process.dev ? props.label : null) ?? String(getCurrentInstance()?.uid)
const el = ref() as Ref<HTMLElement>
const slots = useSlots()
const open = ref<null | InstanceType<typeof import('./Open.vue').default>>(null)
const selected = ref(false)
function onClick(e: Event) {
  emit('click', e)
  if (slots.default)
    open.value?.open()
}
const icon = computed(() => {
  if (!props.icon)
    return null
  const [name, ..._class] = props.icon.split(' ')
  return { name, class: _class }
})
function close() {
  open.value?.close()
}
const tag = props.href ? 'a' : slots.default ? 'button' : 'div'
</script>

<template>
  <component
    :is="tag"
    class="block min-h-11 w-full overflow-hidden text-left desktop:min-h-10"
    color="default"
    :class="{ clickable: (clickable || href || slots.default), selected }"
    :href="href"
    v-bind="$attrs"
    @click="onClick"
  >
    <div
      ref="el"
      class="relative min-h-11 flex items-center gap-3 px-3 py-3 desktop:min-h-10 desktop:py-2"
    >
      <slot v-if="$slots.left" name="left" />
      <div v-else-if="$props.icon" class="h-6 w-6 flex items-center justify-center rounded desktop:(h-5 w-5)">
        <Icon v-if="icon" :name="icon.name" :class="icon.class" rounded p-2px size="24" />
      </div>
      <div v-if="$slots.main" class="flex-1">
        <slot v-if="$slots.main" name="main" />
      </div>
      <div v-else class="flex-1 flex-basis-2xl flex-nowrap overflow-hidden">
        <div v-if="$props.label" class="text-sm" :class="{ truncate: !noTruncate }">
          {{ label }}
        </div>
        <div v-if="$props.caption" class="text-xs text-faint" :class="{ truncate: !noTruncate }">
          {{ caption }}
        </div>
      </div>

      <slot v-if="$slots.right" name="right" />
      <div v-else-if="$props.value" class="max-w-50% truncate text-right text-sm text-faint">
        {{ value }}
      </div>

      <Icon
        v-if="href"
        name="material-symbols-light:open-in-new-rounded" size="18"
        class="ml--3 mr--1 transition-color text-faint"
      />
      <Icon
        v-else-if="$slots.default"
        name="fluent:chevron-right-16-filled" size="18"
        class="ml--3 mr--1 transition-color text-faint"
      />
    </div>
  </component>
  <Open
    v-if="$slots.default && el"
    :id
    ref="open"
    v-model="selected"
    :label="$props.label ?? $props.openLabel"
    :width="$props.openWidth"
    :target="$props.open"
    :header="$props.openHeader"
    :parent="el"
    :placement="$props.openPlacement"
  >
    <slot :close />
  </Open>
</template>
