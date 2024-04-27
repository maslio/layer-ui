<script setup lang="ts">
const colorMode = useColorMode()
const isDark = computed({
  get() {
    return colorMode.value === 'dark'
  },
  set(value) {
    colorMode.value = value ? 'dark' : 'light'
  },
})
</script>

<template>
  <InputToggle v-model="isDark" label="Dark mode" />
</template>
