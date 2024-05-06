<script setup lang="ts">
import Content from './OpenContent.vue'

const loading = ref(false)
const error = ref(false)
const header = ref(false)
const placements = [
  'bottom-end',
  'bottom-start',
  'top-end',
  'top-start',
] as const
const placement = ref<typeof placements[number]>(placements[0])
</script>

<template>
  <Card>
    <InputToggle v-model="loading" label="Loading" />
    <InputToggle v-model="error" label="Error" />
    <InputToggle v-model="header" label="Header" />
    <Item label="Float placement" open="float">
      <InputOption
        v-for="p in placements" :key="p"
        v-model="placement"
        :value="p"
        :label="p"
      />
    </Item>
  </Card>
  <Card>
    <Item label="Next">
      <Content :loading :error />
    </Item>
    <Item :open="{ target: 'modal', header }" label="Modal">
      <Content :loading :error />
    </Item>
    <Item :open="{ target: 'float', header, placement }" label="Float">
      <Content :loading :error />
    </Item>
    <Item open="full" label="Full">
      <Content :loading :error />
    </Item>
  </Card>
  <Card>
    <Item
      label="Component"
      :open="{ component: Content, props: { error, loading } }"
    />
  </Card>
</template>
