<script setup lang="ts">
defineProps<{
  label?: string
  caption?: string
}>()
defineSlots<{
  default: () => any
  label: () => any
}>()
</script>

<template>
  <div class="my-3 embeded:my-0 first:mt-none">
    <div v-if="$slots.label" class="label">
      <slot name="label" />
    </div>
    <div v-else-if="label" class="label">
      {{ label }}
    </div>
    <div class="card overflow-hidden rounded-xl embeded:rounded-none" color="default">
      <slot />
    </div>
    <div v-if="caption" mb-3 mt-1 pl-3 text-sm font-300 text-faint>
      {{ caption }}
    </div>
  </div>
</template>

<style>
.label {
  --uno: mb-1 truncate px-3 text-base font-300 first: mt-0 text-faint;
}
.card + .card {
  --uno: mt-4;
}
/* .card > *:not(.card):last-child hr {
  display: none;
} */
.card > .card {
  --uno: rounded-none;
}
.card {
  --unp: relative;
}
</style>
