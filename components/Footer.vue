<script setup lang="ts">
import type { LayoutProvide } from './Layout.vue'

const { footerEl } = inject('layout') as LayoutProvide
</script>

<template>
  <Teleport v-if="footerEl" :to="footerEl">
    <slot />
  </Teleport>
</template>
