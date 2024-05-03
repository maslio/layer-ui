<script setup lang="ts">
import type { LayoutProvide } from './Layout.d.ts'

const { footerEl } = inject('layout') as LayoutProvide
</script>

<template>
  <Teleport v-if="footerEl" :to="footerEl">
    <slot />
  </Teleport>
</template>
