<script setup lang="ts">
const readonly = ref(false)
const string = ref('this is a string')
const text = ref('this is a text')
const toggle = ref(false)
const option = ref(1)
const date = ref(new Date().toISOString().split('T')[0])
const daterange = ref<[string, string]>([
  new Date().toISOString().split('T')[0],
  new Date().toISOString().split('T')[0],
])
const number = ref(999)
</script>

<template>
  <Card>
    <InputToggle v-model="readonly" label="Readonly" />
  </Card>
  <Card>
    <InputString v-model="string" label="Input string" :readonly />
    <InputText v-model="text" label="Input text" :readonly />
  </Card>
  <Card>
    <InputNumber v-model="number" :decimal="1" label="Input number" :readonly />
    <InputNumber v-model="number" :decimal="1" label="Input number" :readonly />
  </Card>
  <Card>
    <InputToggle v-model="toggle" label="Input toggle" :readonly />
  </Card>
  <Card>
    <InputOption v-model="option" label="Option 1" :value="1" :readonly />
    <InputOption v-model="option" label="Option 2" :value="2" :readonly />
    <InputOption v-model="option" label="Option 3" :value="3" :readonly />
  </Card>
  <Card>
    <InputDate v-model="date" label="Input date" :readonly />
    <InputDateRange v-model="daterange" label="Input daterange" :readonly />
  </Card>
</template>
