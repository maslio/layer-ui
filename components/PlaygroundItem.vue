<script setup lang="ts">
const props = defineProps<{
  label: string
  variants: Record<string, any>[]
}>()

function propsToString(props: Record<string, any>) {
  const string = JSON.stringify(props, null, 2)
  return string.replace(/\"/g, '')
    .substring(4, string.length - 6)
}

const variants = props.variants.map((props, index) => {
  return {
    index,
    props,
    label: propsToString(props),
  }
})

const selected = ref(0)
const component = resolveComponent(props.label)
const bind = ref(variants[0].props)
const error = ref<Error | null>(null)

watch(selected, async (index) => {
  const props = variants[index].props
  error.value = null
  bind.value = null
  await nextTick()
  bind.value = props
})

onErrorCaptured((e: Error) => {
  error.value = e
  console.error(e)
  return false
})
</script>

<template>
  <Card>
    <InputOption
      v-for="variant in variants" :key="variant.index"
      v-model="selected"
      :value="variant.index"
      :label="variant.label"
      font-mono
    />
  </Card>
  <template v-if="bind">
    <div v-if="error" class="h-full flex flex-col items-center">
      <Icon name="tabler:face-id-error" size="100" />
      <div w-full p-3 text-faint>
        {{ error }}
      </div>
    </div>

    <Component :is="component" v-else v-bind="bind" />
  </template>
</template>
