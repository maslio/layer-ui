<script setup lang="ts">
import type { LayoutProvide } from './Layout.d.ts'

const { menuEl } = inject('layout') as LayoutProvide
</script>

<template>
  <Teleport v-if="menuEl" :to="menuEl">
    <slot />
  </Teleport>
</template>
