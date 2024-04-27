<script setup lang="ts">
const { readonly } = defineProps<{
  label: string
  readonly?: boolean
}>()
const model = defineModel<boolean>()
function toggle() {
  if (readonly)
    return
  model.value = !model.value
}
</script>

<template>
  <Item :clickable="!readonly" :label @click="toggle">
    <template #right>
      <ClientOnly>
        <div
          h-26px w-42px rounded-full p-3px transition duration-200 ease-in-out
          :class="model ? 'bg-green-500' : 'dark:bg-neutral-600 light:bg-neutral-300'"
        >
          <div
            h-5 w-5 translate-x-0 transform rounded-full bg-white transition duration-200 ease-in-out
            :class="{ 'translate-x-4': model }"
          />
        </div>
      </ClientOnly>
    </template>
  </Item>
</template>
