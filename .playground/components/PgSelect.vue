<script setup lang="ts">
export interface User {
  id: number
  name: string
}
const users = await $fetch<User[]>('https://jsonplaceholder.typicode.com/users')
const options = users.map(u => ({
  label: u.name,
  value: u.id,
}))
const model = ref()
const modelMulti = ref([])
</script>

<template>
  <Card>
    <InputSelect v-model="model" label="Select 1" :options input />
    <InputSelect v-model="model" label="Select 2" :options />
  </Card>
  <Card>
    <InputSelectMulti v-model="modelMulti" label="Select 3" :options input />
    <InputSelectMulti v-model="modelMulti" label="Select 4" :options />
  </Card>
</template>
