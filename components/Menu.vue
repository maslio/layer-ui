<script setup lang="ts">
withDefaults(defineProps<{
  icon?: string
  label?: string
}>(), {
  icon: 'more',
})
const { menuEl } = useLayout()
</script>

<template>
  <Teleport v-if="menuEl" :to="menuEl">
    <Button mini flat :icon :open="{ target: 'dialog', placement: 'bottom-end' }">
      <slot />
    </Button>
  </Teleport>
</template>
