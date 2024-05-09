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
</script>

<template>
  <Card>
    <InputSelect v-model="model" label="Select 1" :options input />
    <InputSelect v-model="model" label="Select 2" :options />
  </Card>
</template>
