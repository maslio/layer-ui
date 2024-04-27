<script setup lang="ts">
const { buttons } = useCurrentLayout()
</script>

<template>
  <Teleport v-if="buttons" :to="buttons">
    <slot />
  </Teleport>
</template>
