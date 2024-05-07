<script setup lang="ts">
const { layout } = defineProps<{
  layout: Ref<any>
}>()
const { isFullscreen, toggle } = useFullscreen(layout)
</script>

<template>
  <InputToggle
    :model-value="isFullscreen"
    label="Fullscreen"
    @update:model-value="toggle"
  />
</template>
