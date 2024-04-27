<script setup lang="ts">
import delay from 'delay'

defineOptions({
  inheritAttrs: false,
})
const props = withDefaults(defineProps<{
  label?: string
  color?: 'default' | 'primary' | 'positive' | 'negative' | 'contrast'
  icon?: string
  action?: () => Promise<() => void> | Promise<void>
  disabled?: boolean
  delay?: number
  mini?: boolean
  flat?: boolean
}>(), {
  color: 'default',
  delay: 500,
})
const emit = defineEmits(['click'])

const pending = ref(false)
const isDisabled = computed(() => props.disabled || pending.value)
async function onClick(e: Event) {
  if (isDisabled.value)
    return
  emit('click', e)
  if (props.action == null)
    return
  pending.value = true
  const result = await delay(props.delay, { value: props.action() })
  pending.value = false
  if (typeof result === 'function')
    result()
}
</script>

<template>
  <div
    class="w-full embeded:my-0 embeded:px-2"
    :class="{ 'my-3': !flat }"
  >
    <button
      class="min-h-11 w-full rounded-xl desktop:min-h-10"
      :color
      :disabled="isDisabled"
      :class="{ clickable: !isDisabled, mini, flat }"
      @click="onClick"
    >
      <div v-if="pending">
        <Icon name="mingcute:loading-3-line" :size="mini ? '20' : '24'" animate-spin />
      </div>
      <slot v-else-if="$slots.default" />
      <div v-else class="flex items-center justify-center gap-2">
        <Icon v-if="icon" :name="icon" />
        <div v-if="label">
          {{ label }}
        </div>
      </div>
    </button>
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
