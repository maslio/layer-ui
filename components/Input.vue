<script setup lang="ts">
const { focused, readonly } = defineProps<{
  label?: string
  type?: string
  icon?: string
  focused?: boolean
  readonly?: boolean
}>()
const isLabelBright = computed(() => focused && !readonly)
</script>

<template>
  <Item>
    <div class="w-full flex items-center">
      <div v-if="icon" ml-3>
        <Icon :name="icon" />
      </div>
      <div flex flex-1 flex-col px-3 py-2>
        <label
          v-if="label"
          class="block select-none text-sm transition-color-100"
          :class="isLabelBright ? 'text-bright' : 'text-faint'"
        >{{ label }}</label>
        <slot />
      </div>
    </div>
  </Item>
</template>
