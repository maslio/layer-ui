<script setup lang="ts">
defineProps<{
  placeholder?: string
  autofocus?: boolean
  readonly?: boolean
}>()
const emit = defineEmits(['focus', 'blur'])
const model = defineModel<string>()
const input = ref()
const { focused } = useFocus(input)
watch(focused, (value) => {
  if (value)
    emit('focus')
  else
    emit('blur')
})
function resize() {
  const target = input.value
  target.style.height = '28px'
  target.style.height = `${target.scrollHeight}px`
}
onMounted(() => resize())
</script>

<template>
  <Input :focused :readonly>
    <textarea
      ref="input" v-model="model" :placeholder :autofocus :readonly
      class="h-7 w-full resize-none appearance-none bg-transparent outline-none"
      @input="resize"
    />
  </Input>
</template>
