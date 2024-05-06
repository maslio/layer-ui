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
    <Button mini flat :icon :open-header="label != null" :open-label="label">
      <slot />
    </Button>
  </Teleport>
</template>
