<script setup lang="ts">
defineProps<{
  placeholder?: string
  autofocus?: boolean
  readonly?: boolean
  flat?: boolean
}>()
const emit = defineEmits(['focus', 'blur'])
const input = ref() as Ref<HTMLInputElement>
const model = defineModel<string>()
const { focused } = useFocus(input)
watch(focused, (value) => {
  if (value)
    emit('focus')
  else
    emit('blur')
})
function onClick() {
  input.value.focus()
}
</script>

<template>
  <Input :focused :readonly :flat @click="onClick">
    <input
      ref="input" v-model="model" type="text" :placeholder :autofocus :readonly
      class="min-h-6 w-full flex-1 appearance-none bg-transparent outline-none"
    >
  </Input>
</template>
