<script setup lang="ts">
import type { LayoutProvide } from './Layout.d.ts'

withDefaults(defineProps<{
  icon?: string
  label?: string
}>(), {
  icon: 'more',
})
const { menuEl } = inject('layout') as LayoutProvide
</script>

<template>
  <Teleport v-if="menuEl" :to="menuEl">
    <Button mini flat :icon :open-header="label != null" :open-label="label">
      <slot />
    </Button>
  </Teleport>
</template>
