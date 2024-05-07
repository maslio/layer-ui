<script setup lang="ts">
import Content from './OpenContent.vue'

const loading = ref(false)
const error = ref(false)
const header = ref(false)
const dialogPlacements = [
  'bottom-end',
  'bottom-start',
  'top-end',
  'top-start',
] as const
const modalPlacements = [
  'center',
  'page-center',
  'page-bottom',
  'page-top',
] as const
const dialogPlacement = ref<typeof dialogPlacements[number]>(dialogPlacements[0])
const modalPlacement = ref<typeof modalPlacements[number]>(modalPlacements[0])
</script>

<template>
  <Card>
    <InputToggle v-model="loading" label="Loading" />
    <InputToggle v-model="error" label="Error" />
    <InputToggle v-model="header" label="Header" />
    <Item label="Dialog placement" open="dialog">
      <InputOption
        v-for="p in dialogPlacements" :key="p"
        v-model="dialogPlacement"
        :value="p"
        :label="p"
      />
    </Item>
    <Item label="Modal placement" open="dialog">
      <InputOption
        v-for="p in modalPlacements" :key="p"
        v-model="modalPlacement"
        :value="p"
        :label="p"
      />
    </Item>
  </Card>
  <Card>
    <Item label="Next">
      <Content :loading :error />
    </Item>
    <Item :open="{ target: 'modal', header, placement: modalPlacement }" label="Modal">
      <Content :loading :error />
    </Item>
    <Item :open="{ target: 'dialog', header, placement: dialogPlacement }" label="Dialog">
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
  <Card>
    <Item label="Dialogs">
      <Button
        v-for="i in 20" :key="i"
        label="Dialog"
        :open="{ target: 'dialog', component: Content, props: { error, loading } }"
      />
    </Item>
  </Card>
</template>
