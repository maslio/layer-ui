<script setup lang="ts">
const props = defineProps<{
  label: string
  components: Record<string, Record<string, any>[]>
}>()

const data = Object.entries(props.components)
  .map(([name, variants]) => ({ name, variants }))
</script>

<template>
  <Layout
    :label="`${label} Playground`"
  >
    <Card>
      <Item
        v-for="one in data" :key="one.name"
        :label="one.name"
        font-mono
      >
        <PlaygroundItem :label="one.name" :variants="one.variants" />
      </Item>
    </Card>
  </Layout>
</template>
