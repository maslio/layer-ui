<script setup lang="ts">
withDefaults(defineProps<{
  icon?: string
  label?: string
}>(), {
  icon: 'more',
})
defineSlots<{
  default: (props: {
    close: () => void
  }) => any
}>()
const { menuEl } = useLayout()
</script>

<template>
  <Teleport v-if="menuEl" :to="menuEl">
    <Button v-slot="{ close }" mini flat :icon :open="{ target: 'dialog' }">
      <slot :close />
    </Button>
  </Teleport>
</template>
