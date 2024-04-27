<script setup lang="ts">
defineProps<{
  active?: boolean
}>()
</script>

<template>
  <div
    class="h-3 w-3 rounded-full"
    dark="bg-neutral-700 p-0.5"
    light="bg-neutral-200 p-0.5"
  >
    <Transition
      enter-active-class="transition duration-100 ease-out"
      enter-from-class="scale-0"
    >
      <div
        v-if="active"
        h-2 w-2 rounded-full
        dark="bg-green-500"
        light="bg-green-400"
      />
    </Transition>
  </div>
</template>
