<script setup lang="ts">
import type { Placement } from '@floating-ui/vue'
import delay from 'delay'

defineOptions({
  inheritAttrs: false,
})
const props = withDefaults(defineProps<{
  label?: string
  color?: 'default' | 'primary' | 'positive' | 'negative' | 'contrast'
  icon?: string
  action?: () => Promise<() => void> | Promise<void>
  actionDelay?: number
  disabled?: boolean
  mini?: boolean
  flat?: boolean
  open?: 'next' | 'modal' | 'float' | 'full'
  openLabel?: string
  openHeader?: boolean
  openPlacement?: Placement
}>(), {
  color: 'default',
  actionDelay: 500,
  open: 'float',
})
const emit = defineEmits(['click'])
const id = (process.dev ? props.label : null) ?? String(getCurrentInstance()?.uid)
const el = ref() as Ref<HTMLElement>
const open = ref<null | InstanceType<typeof import('./Open.vue').default>>(null)
const slots = useSlots()
const selected = ref(false)
const pending = ref(false)
const isDisabled = computed(() => props.disabled || pending.value)
async function onClick(e: Event) {
  if (isDisabled.value)
    return
  emit('click', e)
  e.stopPropagation()
  e.preventDefault()
  if (slots.default) {
    open.value?.open()
    return
  }

  if (props.action == null)
    return
  pending.value = true
  const result = await delay(props.actionDelay, { value: props.action() })
  pending.value = false
  if (typeof result === 'function')
    result()
}
</script>

<template>
  <div
    class="embeded:my-0"
    :class="{ 'my-3 w-full embeded:px-2': !mini }"
  >
    <button
      ref="el"
      class="min-h-11 w-full rounded-xl font-500 desktop:min-h-10"
      :color
      :disabled="isDisabled"
      :class="{ clickable: !isDisabled, mini, flat, selected }"
      @click="onClick"
    >
      <div v-if="pending">
        <Icon name="mingcute:loading-3-line" :size="mini ? '20' : '24'" animate-spin />
      </div>
      <div v-else class="flex items-center justify-center gap-2">
        <Icon v-if="icon" :name="icon" />
        <div v-if="label">
          {{ label }}
        </div>
      </div>
    </button>
    <Open
      v-if="$slots.default"
      :id
      ref="open"
      v-model="selected"
      :label="$props.label ?? $props.openLabel"
      :target="$props.open"
      :parent="el"
      :header="$props.openHeader"
      :placement="$props.openPlacement"
    >
      <slot />
    </Open>
  </div>
</template>

<style scoped>
.mini {
  --uno: w-10;
}
.flat {
  --uno: bg-transparent;
}
</style>
