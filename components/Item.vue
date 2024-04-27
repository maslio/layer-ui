<script setup lang="ts">
const { icon } = defineProps<{
  label?: string
  caption?: string | number
  icon?: string
  next?: boolean
  down?: boolean
  clickable?: boolean
}>()
const emit = defineEmits(['click'])
defineSlots<{
  default: () => any
  left: () => any
  right: () => any
  icon: () => any
  label: () => any
  caption: () => any
}>()
function onClick(e: Event) {
  emit('click', e)
}
const _icon = computed(() => {
  if (!icon)
    return null
  const [name, ..._class] = icon.split(' ')
  return { name, class: _class }
})
</script>

<template>
  <div
    class="min-h-11 overflow-hidden desktop:min-h-10"
    color="default"
    :class="{ clickable: (clickable || next) }"
    @click="onClick"
  >
    <slot v-if="$slots.default" />
    <div
      v-else
      class="min-h-11 flex items-center gap-3 px-3 py-3 desktop:min-h-10 desktop:py-2"
    >
      <slot name="left" />

      <!-- Icon -->
      <div v-if="icon || $slots.icon" class="h-6 w-6 flex items-center justify-center rounded desktop:(h-5 w-5)">
        <Icon v-if="_icon" :name="_icon.name" :class="_icon.class" rounded p-2px size="24" />
        <slot name="icon" />
      </div>

      <!-- Label -->
      <div class="flex-1 flex-basis-2xl flex-nowrap overflow-hidden text-base desktop:text-sm">
        <slot v-if="$slots.label" name="label" />
        <div v-else-if="label" class="truncate">
          {{ label }}
        </div>
      </div>

      <!-- Caption -->
      <div v-if="$slots.caption || caption" class="flex-1 truncate text-right text-sm desktop:text-xs text-faint">
        <slot v-if="$slots.caption" name="caption" />
        <span v-else>
          {{ caption }}
        </span>
      </div>

      <slot name="right" />

      <!-- Next/down -->
      <Icon
        v-if="next"
        name="fluent:chevron-right-16-filled" size="18"
        class="ml--3 mr--1 transition-color text-faint"
      />
      <Icon
        v-else-if="down"
        name="fluent:chevron-down-16-filled" size="18"
        class="ml--3 mr--1 transition-color text-faint"
      />
    </div>
  </div>
</template>
